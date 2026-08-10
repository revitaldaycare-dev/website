// Cloudflare Pages Function — handles tour request form submissions
// Sends email via Cloudflare Email Sending to revitaldaycare@gmail.com

export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const formData = await request.formData();

    // Honeypot check — if filled, silently return success (bot)
    if (formData.get("botcheck")) {
      return new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    const parentName = formData.get("parent_name") || "";
    const phone = formData.get("phone") || "";
    const email = formData.get("email") || "";
    const childAge = formData.get("child_age") || "";
    const startDate = formData.get("desired_start_date") || "";
    const message = formData.get("message") || "";

    // Validate required fields
    if (!parentName || !phone || !email || !childAge || !startDate) {
      return new Response(JSON.stringify({ ok: false, error: "Missing required fields" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const ageLabel = { "3": "3 years old", "4": "4 years old", "5": "5 years old" }[childAge] || childAge;

    const htmlBody = `
      <h2>New Tour Request — Revital Daycare</h2>
      <table style="border-collapse:collapse;font-family:sans-serif;">
        <tr><td style="padding:4px 12px;font-weight:bold;">Parent Name</td><td style="padding:4px 12px;">${parentName}</td></tr>
        <tr><td style="padding:4px 12px;font-weight:bold;">Phone</td><td style="padding:4px 12px;">${phone}</td></tr>
        <tr><td style="padding:4px 12px;font-weight:bold;">Email</td><td style="padding:4px 12px;">${email}</td></tr>
        <tr><td style="padding:4px 12px;font-weight:bold;">Child's Age</td><td style="padding:4px 12px;">${ageLabel}</td></tr>
        <tr><td style="padding:4px 12px;font-weight:bold;">Desired Start Date</td><td style="padding:4px 12px;">${startDate}</td></tr>
        ${message ? `<tr><td style="padding:4px 12px;font-weight:bold;">Message</td><td style="padding:4px 12px;">${message}</td></tr>` : ""}
      </table>
    `;

    const textBody = [
      "New Tour Request — Revital Daycare",
      `Parent Name: ${parentName}`,
      `Phone: ${phone}`,
      `Email: ${email}`,
      `Child's Age: ${ageLabel}`,
      `Desired Start Date: ${startDate}`,
      message ? `Message: ${message}` : "",
    ].filter(Boolean).join("\n");

    // Send email via Cloudflare Email Sending binding
    const result = await env.EMAIL.send({
      to: "revitaldaycare@gmail.com",
      from: { email: "noreply@revitaldaycare.com", name: "Revital Daycare Website" },
      replyTo: email,
      subject: `New Tour Request from ${parentName} — Revital Daycare`,
      html: htmlBody,
      text: textBody,
    });

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Form submission error:", err);
    return new Response(JSON.stringify({ ok: false, error: "Internal error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

// Handle non-POST methods
export async function onRequest() {
  return new Response("Method not allowed", { status: 405 });
}
