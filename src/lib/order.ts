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
    `*PROVISIONAL ORDER REQUEST / QUOTATION*`,
    `========================================`,
    `*${SITE.name.toUpperCase()}*`,
    `Fresh & Dry Oyster Mushroom Cultivation & Supply`,
    `${SITE.address}`,
    `Phone / WhatsApp: ${SITE.phone}`,
    `Email: ${SITE.email}`,
    `========================================`,
    ``,
    `*ORDER REFERENCE:* ${orderRef}`,
    `*DATE:* ${dateStr}`,
    ``,
    `----------------------------------------`,
    `*ORDERED ITEMS*`,
    `----------------------------------------`,
    itemLines,
    ``,
    `----------------------------------------`,
    `*DELIVERY DETAILS*`,
    `----------------------------------------`,
    `Customer Name : ${address.name}`,
    `Mobile Number : +91 ${address.phone}`,
    `Address       : ${address.addressLine}`,
    address.landmark ? `Landmark      : ${address.landmark}` : null,
    `City          : ${address.city}`,
    `State         : ${address.state}`,
    `PIN Code      : ${address.pincode}`,
    ``,
    `----------------------------------------`,
    `*IMPORTANT NOTICE*`,
    `This document is a quotation request / provisional order.`,
    `Final pricing, stock availability, and dispatch schedule`,
    `will be confirmed directly by ${SITE.name}.`,
    `========================================`,
    ``,
    `Thank you for choosing ${SITE.name}.`,
  ]
    .filter((l) => l !== null)
    .join("\n");

  return msg;
}

export function waOrderLink(message: string) {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;
}
