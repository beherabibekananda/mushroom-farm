import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Mail, Users, Building2, Globe, CalendarDays, ArrowRight } from "lucide-react";
import { SITE } from "@/lib/site";
import { PageHeader } from "@/components/site/PageHeader";
import { AboutSection } from "@/components/site/AboutSection";
import { TrustSection } from "@/components/site/Sections";
import { Btn, Reveal } from "@/components/site/primitives";

const title = `About Us | ${SITE.name} - Oyster Mushroom Manufacturer, Varanasi`;
const description = `${SITE.name} is a ${SITE.businessType} of Fresh, Dry and White Oyster Mushrooms established in ${SITE.estYear} by ${SITE.founder}, based in Varanasi, Uttar Pradesh.`;

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
    ],
  }),
  component: AboutPage,
});

const companyFacts = [
  { icon: Building2, label: "Business Type", value: SITE.businessType },
  { icon: CalendarDays, label: "Established", value: SITE.estYear },
  { icon: Users, label: "Proprietor", value: SITE.founder },
  { icon: Globe, label: "Market Covered", value: SITE.marketCovered },
  { icon: MapPin, label: "Location", value: "Varanasi, Uttar Pradesh" },
  { icon: Mail, label: "Email", value: SITE.email },
];

function AboutPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Who We Are"
        title="Shiva Agro,"
        titleAccent="Varanasi."
        subtitle={`A trusted ${SITE.businessType} of premium oyster mushrooms, serving customers across India from the heart of Uttar Pradesh.`}
        breadcrumb="About Us"
      />

      <AboutSection />

      {/* Company Facts */}
      <section className="bg-secondary/40 py-16 sm:py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="eyebrow text-[0.68rem] sm:text-xs">Company Profile</p>
            <h2 className="mt-3 text-3xl font-medium leading-[1.08] sm:mt-4 sm:text-4xl md:text-5xl break-words">
              About <em className="text-earth">{SITE.name}</em>
            </h2>
            <p className="mt-3 sm:mt-5 text-base sm:text-lg text-muted-foreground">
              {SITE.name} was established as a {SITE.legalStatus} in {SITE.estYear}. Under the leadership of{" "}
              {SITE.founder}, we operate as a {SITE.businessType} of Fresh Oyster Mushroom and Dry Oyster Mushroom
              — offering products at reasonable rates and delivering within the promised timeframe to customers across India.
            </p>
          </Reveal>

          <div className="mt-10 sm:mt-14 grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {companyFacts.map((f, i) => (
              <Reveal
                key={f.label}
                delay={i * 80}
                className="flex items-start gap-3.5 rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-soft"
              >
                <span className="grid h-10 w-10 sm:h-11 sm:w-11 shrink-0 place-items-center rounded-full bg-secondary text-primary">
                  <f.icon size={18} strokeWidth={1.4} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] sm:text-xs uppercase tracking-wider text-muted-foreground">{f.label}</p>
                  <p className="mt-0.5 text-sm sm:text-base font-semibold text-foreground break-words">{f.value}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <TrustSection />

      {/* CTA */}
      <section className="grain relative overflow-hidden bg-forest py-16 sm:py-20 text-forest-foreground md:py-28">
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 text-center md:px-8">
          <Reveal>
            <p className="eyebrow text-[0.68rem] sm:text-xs">Get in Touch</p>
            <h2 className="mt-3 sm:mt-4 text-3xl sm:text-4xl md:text-5xl break-words">
              Ready to Source from <em className="text-gold">{SITE.name}?</em>
            </h2>
            <p className="mx-auto mt-4 sm:mt-5 max-w-xl text-base sm:text-lg text-forest-foreground/80">
              Contact {SITE.founder} directly for product enquiries, bulk pricing and delivery schedules across India.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4">
              <Btn href="/products" variant="gold" className="w-full sm:w-auto justify-center">
                View Products <ArrowRight size={16} />
              </Btn>
              <Btn href="/contact" variant="ghostLight" className="w-full sm:w-auto justify-center">
                Send Enquiry
              </Btn>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
