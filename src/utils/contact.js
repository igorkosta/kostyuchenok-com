const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

export async function sendEnquiry(data) {
  if (!ACCESS_KEY) {
    throw new Error("Contact form is not configured.");
  }

  const response = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      access_key: ACCESS_KEY,
      subject: `Consulting enquiry — ${data.company || data.name}`,
      from_name: data.name,
      email: data.email,
      company: data.company || "",
      role: data.role || "",
      message: data.decision,
    }),
  });

  const result = await response.json().catch(() => ({}));

  if (!response.ok || !result.success) {
    throw new Error(result.message || "Failed to send enquiry.");
  }

  return "email";
}
