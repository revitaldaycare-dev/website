// Cloudflare Worker for Lighthouse testing
// This worker serves the site with performance optimizations for Lighthouse audits

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    // Handle www redirect
    if (url.hostname === "www.revitaldaycare.com") {
      url.hostname = "revitaldaycare.com";
      return Response.redirect(url.toString(), 301);
    }
    
    // Handle contact form API
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
    
    // Fetch the original response
    const response = await env.ASSETS.fetch(request);
    const headers = new Headers(response.headers);
    
    // Security headers
    headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
    headers.set("X-Content-Type-Options", "nosniff");
    headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
    headers.set("X-Frame-Options", "DENY");
    
    // Performance headers
    headers.set("X-Content-Type-Options", "nosniff");
    headers.set("X-Frame-Options", "DENY");
    headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
    headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
    
    // Cache control with performance optimizations
    if (/\.(webp|jpg|jpeg|png|gif|svg|ico)$/i.test(url.pathname)) {
      // Images - long cache, immutable
      headers.set("Cache-Control", "public, max-age=31536000, immutable");
      headers.set("Vary", "Accept");
      
      // Add preload hints for critical images
      if (url.pathname.includes("staff-children") || url.pathname.includes("og-image")) {
        headers.set("Link", `<${url.origin}${url.pathname}>; rel=preload; as=image`);
      }
    } else if (/\.(css|js)$/i.test(url.pathname)) {
      // CSS/JS - long cache
      headers.set("Cache-Control", "public, max-age=31536000, immutable");
    } else if (url.pathname.endsWith('.html') || url.pathname === '/') {
      // HTML - short cache with revalidation
      headers.set("Cache-Control", "public, max-age=3600, must-revalidate");
      
      // Add resource hints for critical resources
      const resourceHints = [
        `<${url.origin}/styles.css>; rel=preload; as=style`,
        `<${url.origin}/script.js>; rel=preload; as=script`,
        `<${url.origin}/images/staff-children.webp>; rel=preload; as=image; type=image/webp`,
        `<${url.origin}/images/og-image.webp>; rel=preload; as=image; type=image/webp`
      ].join(', ');
      
      headers.set("Link", resourceHints);
    } else {
      // Other resources
      headers.set("Cache-Control", "public, max-age=3600, must-revalidate");
    }
    
    // Add CORS headers for Lighthouse
    headers.set("Access-Control-Allow-Origin", "*");
    headers.set("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS");
    headers.set("Access-Control-Allow-Headers", "Range");
    
    // Handle range requests for images
    if (request.method === 'HEAD' || request.headers.get('Range')) {
      const rangeHeader = request.headers.get('Range');
      if (rangeHeader) {
        // For range requests, we'll let the asset handler deal with it
        return response;
      }
    }
    
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  },
};
