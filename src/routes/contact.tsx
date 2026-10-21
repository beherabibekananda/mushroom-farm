import { createFileRoute } from "@tanstack/react-router";
import { HelpCircle, ChevronDown, MapPin, Mail, Phone, User } from "lucide-react";
import { useState } from "react";
import { SITE } from "@/lib/site";
import { PageHeader } from "@/components/site/PageHeader";
import { ContactForm } from "@/components/site/ContactForm";
import { TrustSection } from "@/components/site/Sections";
import { Reveal } from "@/components/site/primitives";
import { cn } from "@/lib/utils";

const title = `Contact Us | ${SITE.name} - Mushroom Supplier, Varanasi`;
const description = `Contact ${SITE.name} for fresh and dry mushroom orders, bulk supply, or business enquiries. Reach ${SITE.founder} at ${SITE.email}, Varanasi, UP.`;

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
    ],
  }),
  component: ContactPage,
});

const faqs = [
  {
    q: "What is your Minimum Order Quantity (MOQ)?",
    a: "Our minimum order quantity is 5 Kilogram for both Dry Oyster Mushroom and White Oyster Mushroom. For Fresh Oyster Mushroom, please contact us directly for the current MOQ and availability.",
  },
  {
    q: "What are your product prices?",
    a: "Dry Oyster Mushroom is priced at ₹1,000 – ₹1,400 per kilogram. White Oyster Mushroom is priced at ₹150 – ₹250 per kilogram. Prices may vary based on quantity and market rates. Please send an enquiry for the latest quote.",
  },
  {
    q: "Which regions in India do you supply to?",
    a: "Shiva Agro serves customers pan-India. We are based in Varanasi, Uttar Pradesh and can arrange delivery across India.",
  },
  {
    q: "What packaging do you use?",
    a: "Dry Oyster Mushrooms are packed in vacuum-sealed bags for maximum freshness and a shelf life of 6–12 months. White Oyster Mushrooms are packed in food-grade plastic packets for freshness up to 5–7 days.",
  },
  {
    q: "Can I get a quotation before placing an order?",
    a: "Yes! Simply fill in the enquiry form on this page or WhatsApp us directly. Mention the product name, quantity required and your location, and we'll send you a quotation promptly.",
  },
  {
    q: "What is the purpose of requirement field in the enquiry form?",
    a: "We ask for your purpose (Reselling, End Use, Manufacturing, etc.) so we can better tailor our pricing, packaging and delivery options to match your business requirements.",
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl border border-border bg-card transition-colors">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between p-4 sm:p-6 text-left gap-3"
        aria-expanded={open}
      >
        <span className="font-serif text-lg sm:text-xl font-medium text-foreground break-words">{q}</span>
        <ChevronDown
          size={18}
          className={cn(
            "shrink-0 text-muted-foreground transition-transform duration-300",
            open && "rotate-180 text-primary",
          )}
        />
      </button>
      {open && <div className="px-4 pb-4 sm:px-6 sm:pb-6 pt-0 text-xs sm:text-sm leading-relaxed text-muted-foreground">{a}</div>}
    </div>
  );
}

function ContactPage() {
  return (
    <main>
      <PageHeader
        title="Contact Shiva Agro"
        titleAccent="— Varanasi."
        subtitle={`Reach ${SITE.founder} for product enquiries, bulk quotes, and supply arrangements. We aim to respond promptly to all enquiries.`}
        breadcrumb="Contact"
      />

      {/* Quick contact strip */}
      <section className="border-b border-border bg-secondary/30 py-8 sm:py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: User, label: "Contact Person", value: SITE.founder },
              { icon: Mail, label: "Email", value: SITE.email, href: `mailto:${SITE.email}`, isEmail: true },
              { icon: Phone, label: "Phone", value: SITE.phone, href: `tel:${SITE.phone.replace(/\s/g, "")}` },
              { icon: MapPin, label: "Location", value: "Varanasi, Uttar Pradesh – 221108" },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-3 min-w-0">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-secondary text-primary">
                  <item.icon size={18} strokeWidth={1.4} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] sm:text-xs uppercase tracking-wider text-muted-foreground">{item.label}</p>
                  {item.href ? (
                    <a href={item.href} className={`text-xs sm:text-sm font-semibold hover:text-earth transition-colors ${item.isEmail ? "break-all" : "break-words"}`}>
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-xs sm:text-sm font-semibold break-words">{item.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContactForm />

      {/* FAQ */}
      <section className="bg-secondary/40 py-16 sm:py-24 md:py-32">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 md:px-8">
          <Reveal className="text-center">
            <span className="mx-auto mb-3 grid h-11 w-11 sm:h-12 sm:w-12 place-items-center rounded-full bg-secondary text-primary">
              <HelpCircle size={20} strokeWidth={1.5} />
            </span>
            <p className="eyebrow text-[0.68rem] sm:text-xs">Got Questions?</p>
            <h2 className="mt-3 text-3xl font-medium leading-[1.08] sm:mt-4 sm:text-4xl md:text-5xl break-words">
              Frequently Asked <em className="text-earth">Questions</em>
            </h2>
            <p className="mt-3 sm:mt-5 text-base sm:text-lg text-muted-foreground">
              Quick answers about pricing, MOQ, packaging, and shipping from {SITE.name}.
            </p>
          </Reveal>

          <div className="mt-10 sm:mt-14 space-y-3 sm:space-y-4">
            {faqs.map((faq) => (
              <FaqItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

      <TrustSection />
    </main>
  );
}
