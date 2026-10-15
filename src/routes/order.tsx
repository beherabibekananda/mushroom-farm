import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useCallback } from "react";
import { PRODUCTS, SITE } from "@/lib/site";
import { CartProvider, useCart, type CartItem, type Unit } from "@/lib/cart";
import {
  generateOrderRef,
  buildWhatsAppMessage,
  waOrderLink,
  type Address,
} from "@/lib/order";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/order")({
  head: () => ({
    meta: [
      { title: `Place an Order | ${SITE.name}` },
      {
        name: "description",
        content:
          "Order Fresh and Dry Oyster Mushrooms from Shiva Agro. Quick checkout with WhatsApp confirmation.",
      },
    ],
  }),
  component: () => (
    <CartProvider>
      <OrderPage />
    </CartProvider>
  ),
});

// ─── Step Indicator ──────────────────────────────────────────────────────────
const STEPS = ["Select Products", "Delivery Address", "Review & Confirm"];

function StepBar({ step }: { step: number }) {
  return (
    <div className="flex items-center justify-center gap-0 mb-8 select-none">
      {STEPS.map((label, i) => {
        const done = i < step;
        const active = i === step;
        return (
          <div key={label} className="flex items-center">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={cn(
                  "w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300",
                  done
                    ? "bg-primary text-primary-foreground"
                    : active
                      ? "bg-gold text-accent-foreground ring-4 ring-gold/20"
                      : "bg-muted text-muted-foreground",
                )}
              >
                {done ? (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    className="w-4 h-4"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : (
                  i + 1
                )}
              </div>
              <span
                className={cn(
                  "text-[10px] font-semibold tracking-wide text-center max-w-[70px] leading-tight",
                  active
                    ? "text-foreground"
                    : done
                      ? "text-primary"
                      : "text-muted-foreground",
                )}
              >
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={cn(
                  "h-0.5 w-12 md:w-20 mx-2 mt-[-18px] transition-all duration-500",
                  done ? "bg-primary" : "bg-border",
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Unit Selector ────────────────────────────────────────────────────────────
const UNIT_OPTIONS: { value: Unit; label: string }[] = [
  { value: "kg", label: "KG" },
  { value: "g", label: "Grams" },
  { value: "pack", label: "Pack" },
];

// ─── Step 1: Product Selection ────────────────────────────────────────────────
function ProductStep({ onNext }: { onNext: () => void }) {
  const { items, addItem, updateItem, removeItem } = useCart();

  const getItem = (id: string) => items.find((i) => i.productId === id);

  const handleAdd = (product: (typeof PRODUCTS)[0]) => {
    if (!getItem(product.id)) {
      const defaultQty = product.id === "fresh-oyster" ? 5 : 1;
      addItem({
        productId: product.id,
        name: product.name,
        image: product.image,
        quantity: defaultQty,
        unit: "kg",
        priceRange: product.price,
      });
    }
  };

  const handleQty = (id: string, delta: number) => {
    const item = getItem(id);
    if (!item) return;
    const next = Math.max(1, item.quantity + delta);
    updateItem(id, { quantity: next });
  };

  const handleUnit = (id: string, unit: Unit) => updateItem(id, { unit });

  const canProceed = items.length > 0;

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-serif font-medium text-foreground">
          Select Your Products
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Choose one or more products and set your quantity.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 max-w-3xl mx-auto">
        {PRODUCTS.map((product) => {
          const item = getItem(product.id);
          const selected = !!item;
          return (
            <div
              key={product.id}
              className={cn(
                "relative rounded-2xl border-2 transition-all duration-300 overflow-hidden bg-card",
                selected
                  ? "border-primary shadow-[0_0_0_4px_oklch(0.33_0.06_155_/_0.08)]"
                  : "border-border hover:border-primary/40",
              )}
            >
              {/* Badge */}
              {selected && (
                <div className="absolute top-3 right-3 z-10 bg-primary text-primary-foreground text-[10px] font-bold px-2.5 py-1 rounded-full tracking-wide uppercase">
                  In Order
                </div>
              )}

              {/* Product Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
              </div>

              {/* Product Info */}
              <div className="p-4">
                <h3 className="font-serif text-lg font-medium leading-tight">
                  {product.name}
                </h3>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                  {product.description}
                </p>

                {product.price && (
                  <div className="mt-2 inline-flex items-center gap-1.5 bg-gold/10 text-foreground text-xs font-semibold px-2.5 py-1 rounded-full border border-gold/30">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      className="w-3 h-3 text-gold"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="M15 9.5a3 3 0 0 0-6 0c0 5 6 3 6 8a3 3 0 0 1-6 0" />
                      <path d="M12 6v1m0 10v1" />
                    </svg>
                    {product.price}
                  </div>
                )}
                {!product.price && (
                  <div className="mt-2 text-xs text-muted-foreground italic">
                    Price on request
                  </div>
                )}

                {product.moq && (
                  <div className="text-[11px] text-muted-foreground mt-1">
                    Min. Order: {product.moq}
                  </div>
                )}

                {/* Quantity + Unit controls (shown when selected) */}
                {selected && item && (
                  <div className="mt-4 space-y-3 border-t border-border pt-4">
                    {/* Quantity */}
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                        Quantity
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          id={`qty-dec-${product.id}`}
                          onClick={() => handleQty(product.id, -1)}
                          className="w-7 h-7 rounded-full bg-muted flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2.5}
                            className="w-3.5 h-3.5"
                          >
                            <line x1="5" y1="12" x2="19" y2="12" />
                          </svg>
                        </button>
                        <span className="w-8 text-center font-bold text-sm">
                          {item.quantity}
                        </span>
                        <button
                          id={`qty-inc-${product.id}`}
                          onClick={() => handleQty(product.id, 1)}
                          className="w-7 h-7 rounded-full bg-muted flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                          aria-label="Increase quantity"
                        >
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2.5}
                            className="w-3.5 h-3.5"
                          >
                            <line x1="12" y1="5" x2="12" y2="19" />
                            <line x1="5" y1="12" x2="19" y2="12" />
                          </svg>
                        </button>
                      </div>
                    </div>

                    {/* Unit */}
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                        Unit
                      </span>
                      <div className="flex gap-1.5">
                        {UNIT_OPTIONS.map((u) => (
                          <button
                            key={u.value}
                            id={`unit-${product.id}-${u.value}`}
                            onClick={() => handleUnit(product.id, u.value)}
                            className={cn(
                              "text-[11px] font-semibold px-2.5 py-1 rounded-full border transition-all",
                              item.unit === u.value
                                ? "bg-primary text-primary-foreground border-primary"
                                : "bg-transparent border-border text-muted-foreground hover:border-primary/50",
                            )}
                          >
                            {u.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Action button */}
                {!selected ? (
                  <button
                    id={`add-${product.id}`}
                    onClick={() => handleAdd(product)}
                    className="mt-4 w-full rounded-xl bg-primary text-primary-foreground py-2.5 text-sm font-semibold hover:brightness-110 hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2.5}
                      className="w-4 h-4"
                    >
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                    Add to Order
                  </button>
                ) : (
                  <button
                    id={`remove-${product.id}`}
                    onClick={() => removeItem(product.id)}
                    className="mt-4 w-full rounded-xl border-2 border-destructive/30 text-destructive py-2.5 text-sm font-semibold hover:bg-destructive hover:text-destructive-foreground transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2.5}
                      className="w-4 h-4"
                    >
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                    Remove
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Order Summary sticky bar */}
      {items.length > 0 && (
        <div className="mt-6 rounded-2xl border border-primary/20 bg-primary/5 p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="text-sm font-semibold text-foreground mb-1">
                📦 Your Order Summary
              </div>
              <div className="flex flex-col gap-0.5">
                {items.map((i) => (
                  <div key={i.productId} className="text-xs text-muted-foreground">
                    {i.name} — {i.quantity} {i.unit.toUpperCase()}
                    {i.priceRange ? (
                      <span className="text-gold ml-1">({i.priceRange})</span>
                    ) : (
                      <span className="text-muted-foreground ml-1">(Price TBD)</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <button
              id="proceed-to-address"
              onClick={onNext}
              disabled={!canProceed}
              className="rounded-full bg-primary text-primary-foreground px-6 py-2.5 text-sm font-semibold hover:brightness-110 hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-2 disabled:opacity-40 disabled:pointer-events-none"
            >
              Continue
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                className="w-4 h-4"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {items.length === 0 && (
        <div className="mt-6 rounded-2xl border-2 border-dashed border-border p-8 text-center">
          <div className="text-3xl mb-2">🛒</div>
          <p className="text-muted-foreground text-sm">
            Select at least one product to continue.
          </p>
        </div>
      )}
    </div>
  );
}

// ─── Step 2: Delivery Address ─────────────────────────────────────────────────
const INDIA_STATES = [
  "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa",
  "Gujarat","Haryana","Himachal Pradesh","Jharkhand","Karnataka","Kerala",
  "Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland",
  "Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura",
  "Uttar Pradesh","Uttarakhand","West Bengal","Andaman and Nicobar Islands",
  "Chandigarh","Dadra and Nagar Haveli and Daman and Diu","Delhi","Jammu and Kashmir",
  "Ladakh","Lakshadweep","Puducherry"
];

// Field must live at MODULE level — not inside AddressStep — so React never
// recreates its component identity on re-renders (which would unmount inputs
// and lose keyboard focus after every single keystroke).
function Field({
  id,
  label,
  required,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-xs font-semibold text-foreground mb-1.5 tracking-wide">
        {label} {required && <span className="text-destructive">*</span>}
      </label>
      {children}
    </div>
  );
}

function AddressStep({
  onNext,
  onBack,
  address,
  setAddress,
}: {
  onNext: () => void;
  onBack: () => void;
  address: Address;
  setAddress: (a: Address) => void;
}) {
  const [errors, setErrors] = useState<Partial<Record<keyof Address, string>>>({});
  const [pinLoading, setPinLoading] = useState(false);

  const set = <K extends keyof Address>(k: K, v: Address[K]) =>
    setAddress({ ...address, [k]: v });

  const fetchPin = async (pin: string) => {
    if (pin.length !== 6) return;
    setPinLoading(true);
    try {
      const res = await fetch(`https://api.postalpincode.in/pincode/${pin}`);
      const data = await res.json();
      const info = data?.[0];
      if (info?.Status === "Success" && info.PostOffice?.length) {
        const po = info.PostOffice[0];
        setAddress({
          ...address,
          pincode: pin,
          city: po.District || "",
          state: po.State || "",
        });
        setErrors((e) => ({ ...e, pincode: undefined, city: undefined, state: undefined }));
      }
    } catch (_) {
      // silent fail – user can fill manually
    } finally {
      setPinLoading(false);
    }
  };

  const validate = () => {
    const e: Partial<Record<keyof Address, string>> = {};
    if (!address.name.trim()) e.name = "Name is required";
    if (!/^[6-9]\d{9}$/.test(address.phone)) e.phone = "Enter a valid 10-digit mobile number";
    if (!/^\d{6}$/.test(address.pincode)) e.pincode = "Enter a valid 6-digit PIN code";
    if (!address.city.trim()) e.city = "City is required";
    if (!address.state.trim()) e.state = "State is required";
    if (!address.addressLine.trim()) e.addressLine = "Address is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => {
    if (validate()) onNext();
  };

  const inputClass = (key: keyof Address) =>
    cn(
      "w-full rounded-xl border bg-card px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/40 transition-all",
      errors[key] ? "border-destructive ring-1 ring-destructive/30" : "border-border",
    );

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-serif font-medium">Delivery Address</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Where should we deliver your order?
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {/* Full Name */}
        <Field id="addr-name" label="Full Name" required>
          <input
            id="addr-name"
            type="text"
            placeholder="e.g. Rajesh Kumar"
            value={address.name}
            onChange={(e) => set("name", e.target.value)}
            className={inputClass("name")}
          />
          {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
        </Field>

        {/* Phone */}
        <Field id="addr-phone" label="Mobile Number" required>
          <div className="flex">
            <span className="flex items-center px-3 text-sm text-muted-foreground bg-muted border border-r-0 border-border rounded-l-xl">
              +91
            </span>
            <input
              id="addr-phone"
              type="tel"
              placeholder="98XXXXXXXX"
              maxLength={10}
              value={address.phone}
              onChange={(e) => set("phone", e.target.value.replace(/\D/g, ""))}
              className={cn(inputClass("phone"), "rounded-l-none")}
            />
          </div>
          {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone}</p>}
        </Field>

        {/* PIN Code */}
        <Field id="addr-pin" label="PIN Code" required>
          <div className="relative">
            <input
              id="addr-pin"
              type="text"
              placeholder="e.g. 221108"
              maxLength={6}
              value={address.pincode}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, "");
                set("pincode", val);
                if (val.length === 6) fetchPin(val);
              }}
              className={inputClass("pincode")}
            />
            {pinLoading && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              </div>
            )}
          </div>
          {errors.pincode && <p className="text-xs text-destructive mt-1">{errors.pincode}</p>}
          <p className="text-[11px] text-muted-foreground mt-1">City and State will auto-fill</p>
        </Field>

        {/* City */}
        <Field id="addr-city" label="City / District" required>
          <input
            id="addr-city"
            type="text"
            placeholder="e.g. Varanasi"
            value={address.city}
            onChange={(e) => set("city", e.target.value)}
            className={inputClass("city")}
          />
          {errors.city && <p className="text-xs text-destructive mt-1">{errors.city}</p>}
        </Field>

        {/* State */}
        <Field id="addr-state" label="State" required>
          <select
            id="addr-state"
            value={address.state}
            onChange={(e) => set("state", e.target.value)}
            className={cn(inputClass("state"), "cursor-pointer")}
          >
            <option value="">Select State</option>
            {INDIA_STATES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          {errors.state && <p className="text-xs text-destructive mt-1">{errors.state}</p>}
        </Field>

        {/* Landmark */}
        <Field id="addr-landmark" label="Landmark">
          <input
            id="addr-landmark"
            type="text"
            placeholder="Near school, temple, etc. (optional)"
            value={address.landmark || ""}
            onChange={(e) => set("landmark", e.target.value)}
            className={inputClass("landmark")}
          />
        </Field>

        {/* Address Line (full width) */}
        <div className="sm:col-span-2">
          <Field id="addr-line" label="Full Address" required>
            <textarea
              id="addr-line"
              rows={3}
              placeholder="House/Flat No., Street, Area, Colony..."
              value={address.addressLine}
              onChange={(e) => set("addressLine", e.target.value)}
              className={cn(inputClass("addressLine"), "resize-none")}
            />
            {errors.addressLine && (
              <p className="text-xs text-destructive mt-1">{errors.addressLine}</p>
            )}
          </Field>
        </div>
      </div>

      {/* Nav buttons */}
      <div className="flex gap-3 mt-8">
        <button
          id="addr-back"
          onClick={onBack}
          className="flex items-center gap-2 rounded-full border border-border text-foreground px-5 py-2.5 text-sm font-semibold hover:bg-muted transition-all"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            className="w-4 h-4"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Back
        </button>
        <button
          id="addr-next"
          onClick={handleNext}
          className="flex-1 rounded-full bg-primary text-primary-foreground py-2.5 text-sm font-semibold hover:brightness-110 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
        >
          Review Order
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            className="w-4 h-4"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </div>
  );
}

// ─── Step 3: Review & Confirm ─────────────────────────────────────────────────
function ReviewStep({
  onBack,
  address,
}: {
  onBack: () => void;
  address: Address;
}) {
  const { items, clearCart } = useCart();
  const navigate = useNavigate();
  const [orderRef] = useState(() => generateOrderRef());
  const [sent, setSent] = useState(false);

  const message = buildWhatsAppMessage(orderRef, items, address);
  const waUrl = waOrderLink(message);

  const handleSend = () => {
    setSent(true);
    window.open(waUrl, "_blank");
  };

  if (sent) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-3xl font-serif font-medium mb-3">Order Sent!</h2>
        <p className="text-muted-foreground max-w-md mx-auto text-sm leading-relaxed mb-2">
          Your provisional order has been forwarded to <strong>{SITE.name}</strong> via WhatsApp.
          They will confirm pricing and availability soon.
        </p>
        <div className="mt-2 mb-6 inline-flex items-center gap-2 bg-primary/5 border border-primary/20 rounded-full px-4 py-2 text-xs font-mono font-semibold text-primary">
          📋 Ref: {orderRef}
        </div>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            id="new-order"
            onClick={() => {
              clearCart();
              navigate({ to: "/order" });
              setSent(false);
            }}
            className="rounded-full border border-border px-6 py-2.5 text-sm font-semibold hover:bg-muted transition-all"
          >
            Place Another Order
          </button>
          <a
            href="/"
            className="rounded-full bg-primary text-primary-foreground px-6 py-2.5 text-sm font-semibold hover:brightness-110 transition-all text-center"
          >
            Back to Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-serif font-medium">Review Your Order</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Please review the details before sending to WhatsApp.
        </p>
      </div>

      {/* Order Ref */}
      <div className="flex items-center gap-3 mb-5 bg-gold/10 border border-gold/30 rounded-xl px-4 py-3">
        <span className="text-lg">📋</span>
        <div>
          <div className="text-xs text-muted-foreground">Order Reference</div>
          <div className="font-mono font-bold text-sm text-foreground">{orderRef}</div>
        </div>
      </div>

      <div className="space-y-4">
        {/* Products */}
        <div className="rounded-2xl border border-border bg-card overflow-hidden">
          <div className="px-4 py-3 border-b border-border bg-muted/30">
            <h3 className="text-sm font-bold uppercase tracking-wide text-muted-foreground">
              🛒 Products Ordered
            </h3>
          </div>
          <div className="divide-y divide-border">
            {items.map((item) => (
              <div key={item.productId} className="flex items-center gap-3 px-4 py-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-14 h-14 rounded-xl object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm text-foreground truncate">
                    {item.name}
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    Qty: {item.quantity} {item.unit.toUpperCase()}
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  {item.priceRange ? (
                    <div className="text-xs font-semibold text-gold">{item.priceRange}</div>
                  ) : (
                    <div className="text-xs text-muted-foreground italic">Price TBD</div>
                  )}
                </div>
              </div>
            ))}
          </div>
          {/* Note about pricing */}
          <div className="px-4 py-3 border-t border-border bg-amber-50/50">
            <p className="text-xs text-amber-700 leading-relaxed">
              ⚠️ This is a <strong>quotation request</strong>. Final pricing will be confirmed by{" "}
              {SITE.name} via WhatsApp before processing payment.
            </p>
          </div>
        </div>

        {/* Address */}
        <div className="rounded-2xl border border-border bg-card overflow-hidden">
          <div className="px-4 py-3 border-b border-border bg-muted/30">
            <h3 className="text-sm font-bold uppercase tracking-wide text-muted-foreground">
              📦 Delivery Address
            </h3>
          </div>
          <div className="px-4 py-3 space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="text-base">👤</span>
              <span className="font-semibold text-sm">{address.name}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>📞</span>
              <span>+91 {address.phone}</span>
            </div>
            <div className="flex items-start gap-2 text-sm text-muted-foreground">
              <span className="mt-0.5">🏠</span>
              <span>
                {address.addressLine}
                {address.landmark ? `, near ${address.landmark}` : ""}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>📮</span>
              <span>
                {address.city}, {address.state} – {address.pincode}
              </span>
            </div>
          </div>
        </div>

        {/* WhatsApp message preview */}
        <div className="rounded-2xl border border-border bg-card overflow-hidden">
          <div className="px-4 py-3 border-b border-border bg-muted/30 flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wide text-muted-foreground">
              💬 WhatsApp Message Preview
            </h3>
          </div>
          <div className="px-4 py-3">
            <pre className="text-xs text-muted-foreground whitespace-pre-wrap break-words font-mono leading-relaxed bg-muted/40 rounded-xl p-3 max-h-52 overflow-y-auto">
              {message}
            </pre>
          </div>
        </div>
      </div>

      {/* Nav buttons */}
      <div className="flex gap-3 mt-8">
        <button
          id="review-back"
          onClick={onBack}
          className="flex items-center gap-2 rounded-full border border-border text-foreground px-5 py-2.5 text-sm font-semibold hover:bg-muted transition-all"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            className="w-4 h-4"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Back
        </button>
        <button
          id="send-whatsapp"
          onClick={handleSend}
          className="flex-1 rounded-full py-3 text-sm font-bold flex items-center justify-center gap-2.5 transition-all hover:-translate-y-0.5"
          style={{ background: "#25D366", color: "#fff" }}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          Send Order via WhatsApp
        </button>
      </div>
    </div>
  );
}

// ─── Main Order Page ───────────────────────────────────────────────────────────
const EMPTY_ADDRESS: Address = {
  name: "",
  phone: "",
  pincode: "",
  city: "",
  state: "",
  addressLine: "",
  landmark: "",
};

function OrderPage() {
  const [step, setStep] = useState(0);
  const [address, setAddress] = useState<Address>(EMPTY_ADDRESS);

  const next = useCallback(() => setStep((s) => Math.min(s + 1, 2)), []);
  const back = useCallback(() => setStep((s) => Math.max(s - 1, 0)), []);

  return (
    <div className="min-h-screen bg-background pt-[72px]">
      {/* Top Banner */}
      <div className="bg-forest py-3 text-center">
        <span className="text-forest-foreground text-xs font-semibold tracking-widest uppercase">
          🌿 {SITE.name} — Natural Mushroom Farm, {SITE.address.split(",")[2]?.trim()}
        </span>
      </div>

      {/* Checkout header bar — sticks below the fixed site Navbar (72px) */}
      <div className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-[72px] z-30">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-3">
          <a href="/" className="text-muted-foreground hover:text-foreground transition-colors">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              className="w-5 h-5"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </a>
          <div>
            <div className="text-sm font-bold text-foreground">{SITE.name}</div>
            <div className="text-[10px] text-muted-foreground">Secure Order</div>
          </div>
          <div className="ml-auto flex items-center gap-1.5 text-[11px] text-muted-foreground">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              className="w-3.5 h-3.5 text-primary"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            Secured
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <StepBar step={step} />

        <div className="bg-card rounded-3xl border border-border shadow-[0_8px_40px_-12px_oklch(0.24_0.045_155_/_0.15)] p-5 md:p-8">
          {step === 0 && <ProductStep onNext={next} />}
          {step === 1 && (
            <AddressStep
              onNext={next}
              onBack={back}
              address={address}
              setAddress={setAddress}
            />
          )}
          {step === 2 && <ReviewStep onBack={back} address={address} />}
        </div>

        {/* Trust badges */}
        <div className="mt-6 grid grid-cols-3 gap-4 text-center">
          {[
            { icon: "🔒", label: "Secure Order" },
            { icon: "💬", label: "WhatsApp Confirmed" },
            { icon: "🌿", label: "Farm Fresh" },
          ].map((b) => (
            <div key={b.label} className="flex flex-col items-center gap-1">
              <span className="text-2xl">{b.icon}</span>
              <span className="text-[11px] text-muted-foreground font-semibold">{b.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
