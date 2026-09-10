const WHATSAPP_MESSAGE =
  'Hola Nenúfar, me gustaría consultar sobre un pedido personalizado.';

export function createWhatsAppUrl(number: string | null | undefined) {
  const normalizedNumber = number?.replace(/\D/g, '');

  return normalizedNumber
    ? `https://wa.me/${normalizedNumber}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`
    : null;
}
