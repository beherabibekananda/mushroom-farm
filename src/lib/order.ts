import { SITE } from "./site";
import type { CartItem } from "./cart";

export interface Address {
  name: string;
  phone: string;
  pincode: string;
  city: string;
  state: string;
  addressLine: string;
  landmark?: string;
}

function formatUnit(item: CartItem) {
  return `${item.quantity} ${item.unit.toUpperCase()}`;
}

function pad(n: number) {
  return String(n).padStart(4, "0");
}

export function generateOrderRef() {
  const now = new Date();
  const datePart = `${now.getFullYear().toString().slice(2)}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}`;
  const rand = pad(Math.floor(Math.random() * 9999));
  return `SA-${datePart}-${rand}`;
}

export function buildWhatsAppMessage(
  orderRef: string,
  items: CartItem[],
  address: Address,
): string {
  const now = new Date();
  const dateStr = now.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const itemLines = items
    .map((item) => {
      const qty = formatUnit(item);
      const priceNote = item.priceRange ? ` (${item.priceRange})` : " (Price TBD)";
      return `  • ${item.name}\n    Qty: ${qty}${priceNote}`;
    })
    .join("\n");

  const msg = [
    `🧾 *PROVISIONAL ORDER REQUEST*`,
    `━━━━━━━━━━━━━━━━━━━━━━━`,
    `*${SITE.name}*`,
    `${SITE.address}`,
    ``,
    `📋 *Order Reference:* ${orderRef}`,
    `📅 *Date:* ${dateStr}`,
    ``,
    `━━━━━━━━━━━━━━━━━━━━━━━`,
    `🛒 *ORDER ITEMS*`,
    `━━━━━━━━━━━━━━━━━━━━━━━`,
    itemLines,
    ``,
    `━━━━━━━━━━━━━━━━━━━━━━━`,
    `📦 *DELIVERY ADDRESS*`,
    `━━━━━━━━━━━━━━━━━━━━━━━`,
    `👤 Name: ${address.name}`,
    `📞 Phone: ${address.phone}`,
    `🏠 Address: ${address.addressLine}`,
    address.landmark ? `🏷️ Landmark: ${address.landmark}` : null,
    `📮 PIN: ${address.pincode}`,
    `🏙️ City: ${address.city}`,
    `🗺️ State: ${address.state}`,
    ``,
    `━━━━━━━━━━━━━━━━━━━━━━━`,
    `⚠️ *IMPORTANT NOTICE*`,
    `This is a quotation request / provisional`,
    `order. Final pricing and availability will`,
    `be confirmed by ${SITE.name}.`,
    `━━━━━━━━━━━━━━━━━━━━━━━`,
    ``,
    `Thank you for choosing ${SITE.name}! 🌿`,
  ]
    .filter((l) => l !== null)
    .join("\n");

  return msg;
}

export function waOrderLink(message: string) {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;
}
