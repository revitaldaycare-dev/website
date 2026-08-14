export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.hostname === "www.revitaldaycare.com") {
      url.hostname = "revitaldaycare.com";
      return Response.redirect(url.toString(), 301);
    }

    const response = await env.ASSETS.fetch(request);
    const headers = new Headers(response.headers);

    // Security headers
    headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
    headers.set("X-Content-Type-Options", "nosniff");
    headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
    headers.set("X-Frame-Options", "DENY");

    // Cache assets (images/webp/jpg) longer; HTML revalidates
    if (/\.(webp|jpg|jpeg|png|gif|svg|ico|css|js|woff2?)$/i.test(url.pathname)) {
      headers.set("Cache-Control", "public, max-age=31536000, immutable");
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
