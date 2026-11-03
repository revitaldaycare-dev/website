const MAX_CONTACT_BODY_BYTES = 16 * 1024;
const MAX_FIELD_LENGTHS = {
  name: 100,
  email: 254,
  phone: 40,
  program: 100,
  message: 5000,
};

function withSecurityHeaders(response) {
  const headers = new Headers(response.headers);

  headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
  headers.set("X-Content-Type-Options", "nosniff");
  headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  headers.set("X-Frame-Options", "DENY");
  headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=(), payment=(), usb=()");
  headers.set(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self' https://static.cloudflareinsights.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://www.google-analytics.com https://cloudflareinsights.com; object-src 'none'; frame-ancestors 'none'; base-uri 'self'; form-action 'self' mailto:; upgrade-insecure-requests;"
  );

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

function contactResponse(payload, status, extraHeaders = {}) {
  return withSecurityHeaders(new Response(JSON.stringify(payload), {
    status,
    headers: {
      "Cache-Control": "no-store",
      "Content-Type": "application/json; charset=utf-8",
      ...extraHeaders,
    },
  }));
}

async function readLimitedBody(request) {
  if (!request.body) return new Uint8Array();

  const reader = request.body.getReader();
  const chunks = [];
  let totalBytes = 0;

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      totalBytes += value.byteLength;
      if (totalBytes > MAX_CONTACT_BODY_BYTES) {
        await reader.cancel();
        return null;
      }

      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }

  const body = new Uint8Array(totalBytes);
  let offset = 0;
  for (const chunk of chunks) {
    body.set(chunk, offset);
    offset += chunk.byteLength;
  }

  return body;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.hostname === "www.revitaldaycare.com") {
      url.hostname = "revitaldaycare.com";
      return withSecurityHeaders(Response.redirect(url.toString(), 301));
    }

    if (url.pathname === "/api/contact") {
      if (request.method !== "POST") {
        return contactResponse(
          { success: false, error: "Method not allowed" },
          405,
          { Allow: "POST" }
        );
      }

      const origin = request.headers.get("Origin");
      if (origin && origin !== url.origin) {
        return contactResponse({ success: false, error: "Request origin not allowed" }, 403);
      }

      const contentType = request.headers.get("content-type") || "";
      const mediaType = contentType.split(";", 1)[0].trim().toLowerCase();
      if (mediaType !== "application/json" && mediaType !== "multipart/form-data") {
        return contactResponse({ success: false, error: "Unsupported content type" }, 415);
      }

      const declaredLength = Number(request.headers.get("content-length"));
      if (Number.isFinite(declaredLength) && declaredLength > MAX_CONTACT_BODY_BYTES) {
        return contactResponse({ success: false, error: "Request body too large" }, 413);
      }

      let bodyBytes;
      try {
        bodyBytes = await readLimitedBody(request);
      } catch {
        return contactResponse({ success: false, error: "Unable to read request body" }, 400);
      }
      if (!bodyBytes) {
        return contactResponse({ success: false, error: "Request body too large" }, 413);
      }

      const bodyHeaders = new Headers(request.headers);
      bodyHeaders.delete("content-length");
      const boundedRequest = new Request(request.url, {
        method: "POST",
        headers: bodyHeaders,
        body: bodyBytes,
      });

      let formData;
      try {
        formData = mediaType === "multipart/form-data"
          ? await boundedRequest.formData()
          : await boundedRequest.json();
      } catch {
        return contactResponse({ success: false, error: "Invalid request body" }, 400);
      }

      if (!formData || typeof formData !== "object" || Array.isArray(formData)) {
        return contactResponse({ success: false, error: "Invalid request body" }, 400);
      }

      const getField = (field) => {
        const value = mediaType === "multipart/form-data"
          ? formData.get(field)
          : formData[field];
        return typeof value === "string" ? value.trim() : "";
      };

      const fields = {
        name: getField("name"),
        email: getField("email"),
        phone: getField("phone"),
        program: getField("program"),
        message: getField("message"),
      };
      const consented = mediaType === "multipart/form-data"
        ? formData.get("consent") === "true"
        : formData.consent === true;

      const errors = [];
      for (const [field, maxLength] of Object.entries(MAX_FIELD_LENGTHS)) {
        if (fields[field].length > maxLength) errors.push(field);
      }
      if (!fields.name) errors.push("name");
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) errors.push("email");
      if (!fields.message) errors.push("message");
      if (!consented) errors.push("consent");
      if (/[\u0000-\u001f\u007f]/.test(fields.name + fields.phone + fields.program)) {
        errors.push("invalid characters");
      }

      if (errors.length > 0) {
        return contactResponse({
          success: false,
          error: "Missing or invalid fields: " + [...new Set(errors)].join(", "),
        }, 400);
      }

      const emailBody =
        "Name: " + fields.name + "\n" +
        "Email: " + fields.email + "\n" +
        "Phone: " + fields.phone + "\n" +
        "Program: " + fields.program + "\n\n" +
        "Message:\n" + fields.message;

      if (env.CONTACT_WEBHOOK) {
        try {
          const webhookResponse = await fetch(env.CONTACT_WEBHOOK, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              to: "revitaldaycare@gmail.com",
              subject: "Tour Request - Revital Daycare",
              text: emailBody,
            }),
            redirect: "error",
          });
          if (!webhookResponse.ok) {
            console.error(JSON.stringify({
              message: "Contact webhook delivery failed",
              status: webhookResponse.status,
            }));
            return contactResponse({
              success: false,
              error: "Unable to send your message. Please email us directly.",
            }, 502);
          }
        } catch {
          console.error(JSON.stringify({ message: "Contact webhook delivery failed" }));
          return contactResponse({
            success: false,
            error: "Unable to send your message. Please email us directly.",
          }, 502);
        }
      }

      return contactResponse({
        success: true,
        message: "Thank you! Your message was sent. We'll respond within 24 business hours.",
      }, 200);
    }

    const response = await env.ASSETS.fetch(request);
    const headers = new Headers(response.headers);

    if (/\.(webp|jpg|jpeg|png|gif|svg|ico)$/i.test(url.pathname)) {
      headers.set("Cache-Control", "public, max-age=31536000, immutable");
      headers.set("Vary", "Accept");
    } else if (/\.(css|js)$/i.test(url.pathname)) {
      headers.set("Cache-Control", "public, max-age=31536000, immutable");
    } else if (url.pathname.endsWith(".html") || url.pathname === "/") {
      headers.set("Cache-Control", "public, max-age=3600, must-revalidate");
      headers.set("Link", `<${url.origin}/styles.css>; rel=preload; as=style`);
    } else {
      headers.set("Cache-Control", "public, max-age=3600, must-revalidate");
    }

    return withSecurityHeaders(new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    }));
  },
};
