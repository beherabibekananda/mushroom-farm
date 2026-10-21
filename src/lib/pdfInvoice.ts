import { SITE } from "./site";
import type { CartItem } from "./cart";
import type { Address } from "./order";
import logoImg from "@/assets/logo.webp";

export function generateInvoicePdf(orderRef: string, items: CartItem[], address: Address) {
  const dateStr = new Date().toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const printWindow = window.open("", "_blank", "width=850,height=1000");
  if (!printWindow) {
    alert("Please allow pop-ups in your browser to download/print the invoice PDF.");
    return;
  }

  const itemsHtml = items
    .map((item, idx) => {
      const priceText = item.priceRange || "Price on Request";
      return `
        <tr style="border-bottom: 1px solid #e5e7eb;">
          <td style="padding: 12px 14px; text-align: center; color: #6b7280; font-size: 13px;">${idx + 1}</td>
          <td style="padding: 12px 14px;">
            <div style="font-weight: 600; font-size: 14px; color: #111827;">${item.name}</div>
            <div style="font-size: 12px; color: #6b7280; margin-top: 2px;">Fresh farm harvest, sorted and graded</div>
          </td>
          <td style="padding: 12px 14px; text-align: center; font-weight: 600; font-size: 13px; color: #111827;">
            ${item.quantity} ${item.unit.toUpperCase()}
          </td>
          <td style="padding: 12px 14px; text-align: right; font-weight: 600; font-size: 13px; color: #15803d;">
            ${priceText}
          </td>
        </tr>
      `;
    })
    .join("");

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Invoice_${orderRef}</title>
  <style>
    @page {
      size: A4 portrait;
      margin: 15mm;
    }
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      color: #1f2937;
      background: #ffffff;
      padding: 24px;
      line-height: 1.5;
      font-size: 13px;
    }
    .invoice-card {
      max-width: 800px;
      margin: 0 auto;
      border: 1px solid #e5e7eb;
      border-radius: 12px;
      padding: 32px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.03);
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      border-bottom: 2px solid #0d1c12;
      padding-bottom: 24px;
      margin-bottom: 24px;
    }
    .brand-section {
      display: flex;
      align-items: center;
      gap: 16px;
    }
    .brand-logo {
      width: 64px;
      height: 64px;
      border-radius: 50%;
      border: 2px solid #d4a34b;
      object-fit: cover;
    }
    .brand-title {
      font-size: 24px;
      font-weight: 700;
      color: #0d1c12;
      letter-spacing: -0.02em;
    }
    .brand-subtitle {
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.15em;
      color: #b45309;
      font-weight: 700;
      margin-top: 2px;
    }
    .brand-meta {
      font-size: 11px;
      color: #4b5563;
      margin-top: 4px;
      line-height: 1.4;
    }
    .invoice-badge-box {
      text-align: right;
    }
    .invoice-badge {
      display: inline-block;
      background: #0d1c12;
      color: #ffffff;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      padding: 6px 12px;
      border-radius: 6px;
    }
    .ref-no {
      font-family: monospace;
      font-size: 14px;
      font-weight: 700;
      color: #111827;
      margin-top: 8px;
    }
    .date-str {
      font-size: 12px;
      color: #6b7280;
      margin-top: 2px;
    }
    .grid-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
      background: #f9fafb;
      border: 1px solid #f3f4f6;
      border-radius: 8px;
      padding: 18px 20px;
      margin-bottom: 24px;
    }
    .section-label {
      font-size: 10px;
      text-transform: uppercase;
      letter-spacing: 0.15em;
      font-weight: 700;
      color: #6b7280;
      margin-bottom: 6px;
    }
    .info-val {
      font-size: 13px;
      color: #111827;
      font-weight: 600;
    }
    .info-sub {
      font-size: 12px;
      color: #4b5563;
      margin-top: 2px;
      line-height: 1.4;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 24px;
    }
    th {
      background: #0d1c12;
      color: #ffffff;
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      padding: 10px 14px;
      font-weight: 600;
    }
    .notice-box {
      background: #fffbeb;
      border: 1px solid #fef3c7;
      border-left: 4px solid #f59e0b;
      padding: 14px 16px;
      border-radius: 6px;
      margin-bottom: 28px;
      font-size: 12px;
      color: #92400e;
      line-height: 1.5;
    }
    .footer {
      border-top: 1px solid #e5e7eb;
      padding-top: 18px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 11px;
      color: #6b7280;
    }
    .print-actions {
      text-align: center;
      margin-bottom: 20px;
    }
    .btn-print {
      background: #15803d;
      color: #ffffff;
      border: none;
      padding: 10px 24px;
      border-radius: 9999px;
      font-weight: 600;
      font-size: 14px;
      cursor: pointer;
      box-shadow: 0 4px 12px rgba(21, 128, 61, 0.25);
    }
    .btn-print:hover {
      background: #166534;
    }
    @media print {
      .print-actions {
        display: none !important;
      }
      body {
        padding: 0;
      }
      .invoice-card {
        border: none;
        box-shadow: none;
        padding: 0;
      }
    }
  </style>
</head>
<body>
  <div class="print-actions">
    <button class="btn-print" onclick="window.print()">Download / Save as PDF</button>
  </div>

  <div class="invoice-card">
    <div class="header">
      <div class="brand-section">
        <img src="${logoImg}" alt="${SITE.name}" class="brand-logo" />
        <div>
          <div class="brand-title">${SITE.name}</div>
          <div class="brand-subtitle">Fresh & Dry Oyster Mushroom Cultivation</div>
          <div class="brand-meta">
            ${SITE.address}<br>
            Phone / WhatsApp: ${SITE.phone} &nbsp;|&nbsp; Email: ${SITE.email}
          </div>
        </div>
      </div>
      <div class="invoice-badge-box">
        <span class="invoice-badge">Provisional Invoice</span>
        <div class="ref-no">${orderRef}</div>
        <div class="date-str">Date: ${dateStr}</div>
      </div>
    </div>

    <div class="grid-2">
      <div>
        <div class="section-label">Billed / Delivered To</div>
        <div class="info-val">${address.name}</div>
        <div class="info-sub">Phone: +91 ${address.phone}</div>
        <div class="info-sub">${address.addressLine}${address.landmark ? `, Near ${address.landmark}` : ""}</div>
        <div class="info-sub">${address.city}, ${address.state} — ${address.pincode}</div>
      </div>
      <div>
        <div class="section-label">Supplier Details</div>
        <div class="info-val">${SITE.name}</div>
        <div class="info-sub">Proprietor: ${SITE.founder}</div>
        <div class="info-sub">Market: ${SITE.marketCovered}</div>
        <div class="info-sub">Status: Verified Agro Producer & Supplier</div>
      </div>
    </div>

    <table>
      <thead>
        <tr>
          <th style="width: 45px; text-align: center;">#</th>
          <th style="text-align: left;">Product Description</th>
          <th style="width: 120px; text-align: center;">Quantity</th>
          <th style="width: 170px; text-align: right;">Indicative Price</th>
        </tr>
      </thead>
      <tbody>
        ${itemsHtml}
      </tbody>
    </table>

    <div class="notice-box">
      <strong>Important Terms & Condition:</strong><br>
      This document constitutes a formal provisional quotation / order request.
      Final lot allocation, dispatch logistics, and final gross pricing will be confirmed by ${SITE.name} directly with the recipient prior to dispatch.
    </div>

    <div class="footer">
      <div>Thank you for choosing ${SITE.name}! Clean, high-yield organic oyster mushrooms.</div>
      <div>Computer Generated Invoice &bull; No Signature Required</div>
    </div>
  </div>

  <script>
    window.addEventListener("DOMContentLoaded", function() {
      setTimeout(function() {
        window.print();
      }, 400);
    });
  </script>
</body>
</html>`;

  printWindow.document.open();
  printWindow.document.write(html);
  printWindow.document.close();
}
