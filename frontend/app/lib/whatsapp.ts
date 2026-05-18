/** Build WhatsApp deep link from public env vars (same as TopBar / home hero). */
export function getWhatsAppHref(overrideMessage?: string) {
  const number = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "").replace(/[^\d]/g, "");
  const text =
    overrideMessage ??
    process.env.NEXT_PUBLIC_WHATSAPP_PREFILL ??
    "Hello, I'd like help from Aalgorix World Academy.";

  return number
    ? `https://api.whatsapp.com/send?phone=${number}&text=${encodeURIComponent(text)}`
    : `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
}
