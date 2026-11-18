const EMAIL = "igor@kostyuchenok.com";

function composeMailto(data) {
  const subject = `Consulting enquiry — ${data.company || data.name}`;
  const body = [
    `Name: ${data.name}`,
    `Work email: ${data.email}`,
    data.company ? `Company: ${data.company}` : null,
    data.role ? `Role: ${data.role}` : null,
    data.timeline ? `Timeline: ${data.timeline}` : null,
    data.budget ? `Budget: ${data.budget}` : null,
    "",
    "What are you deciding?",
    data.decision,
  ]
    .filter(Boolean)
    .join("\n");

  return `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
    body
  )}`;
}

export async function sendEnquiry(data) {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  if (serviceId && templateId && publicKey) {
    try {
      const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_id: serviceId,
          template_id: templateId,
          user_id: publicKey,
          template_params: {
            from_name: data.name,
            from_email: data.email,
            reply_to: data.email,
            company: data.company,
            role: data.role,
            message: data.decision,
            timeline: data.timeline,
            budget: data.budget,
            to_email: EMAIL,
            subject: `Consulting enquiry — ${data.company || data.name}`,
          },
        }),
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      return "email";
    } catch (error) {
      console.error("EmailJS failed, falling back to mailto:", error);
    }
  }

  window.location.href = composeMailto(data);
  return "mailto";
}
