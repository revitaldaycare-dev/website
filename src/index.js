export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.hostname === "www.revitaldaycare.com") {
      url.hostname = "revitaldaycare.com";
      return Response.redirect(url.toString(), 301);
    }

    if (url.pathname === "/api/contact" && request.method === "POST") {
      const contentType = request.headers.get("content-type") || "";

      let name = "", email = "", phone = "", program = "", message = "";

      if (contentType.includes("multipart/form-data")) {
        const formData = await request.formData();
        name    = formData.get("name")    || "";
        email   = formData.get("email")   || "";
        phone   = formData.get("phone")   || "";
        program = formData.get("program") || "";
        message = formData.get("message") || "";
      } else if (contentType.includes("application/json")) {
        const body = await request.json();
        name    = body.name    || "";
        email   = body.email   || "";
        phone   = body.phone   || "";
        program = body.program || "";
        message = body.message || "";
      }

      const errors = [];
      if (!name.trim())  errors.push("name");
      if (!email.trim() || !email.includes("@")) errors.push("email");
      if (!message.trim()) errors.push("message");

      if (errors.length > 0) {
        return new Response(JSON.stringify({
          success: false,
          error: "Missing or invalid fields: " + errors.join(", ")
        }), {
          status: 400,
          headers: { "Content-Type": 'application/json' }
        });
      }

      const emailBody =
        "Name: " + name + "\n" +
        "Email: " + email + "\n" +
        "Phone: " + phone + "\n" +
        "Program: " + program + "\n\n" +
        "Message:\n" + message;

      if (env.CONTACT_WEBHOOK) {
        try {
          await fetch(env.CONTACT_WEBHOOK, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              to: "revitaldaycare@gmail.com",
              subject: "Tour Request from " + name + " — Revital Daycare",
              text: emailBody
            })
          });
        } catch (e) {
          console.error("Webhook delivery failed:", e.message);
        }
      }

      return new Response(JSON.stringify({
        success: true,
        message: "Thank you! Your message was sent. We'll respond within 24 business hours."
      }), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    }

    const response = await env.ASSETS.fetch(request);
    const headers = new Headers(response.headers);

    headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
    headers.set("X-Content-Type-Options", "nosniff");
    headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
    headers.set("X-Frame-Options", "DENY");
    headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
    headers.set("Content-Security-Policy", "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://www.google-analytics.com https://cloudflareinsights.com; frame-ancestors 'none'; base-uri 'self'; form-action 'self' mailto:;");

    if (/\.(webp|jpg|jpeg|png|gif|svg|ico)$/i.test(url.pathname)) {
      headers.set("Cache-Control", "public, max-age=31536000, immutable");
      headers.set("Vary", "Accept");
    } else if (/\.(css|js)$/i.test(url.pathname)) {
      headers.set("Cache-Control", "public, max-age=31536000, immutable");
    } else if (url.pathname.endsWith('.html') || url.pathname === '/') {
      headers.set("Cache-Control", "public, max-age=3600, must-revalidate");
      const linkHeader = [
        `<${url.origin}/styles.css>; rel=preload; as=style`,
        `<${url.origin}/images/staff-children.webp>; rel=preload; as=image; type=image/webp`
      ].join(', ');
      headers.set("Link", linkHeader);
    } else {
      headers.set("Cache-Control", "public, max-age=3600, must-revalidate");
    }

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  },
};
