import { createFileRoute } from "@tanstack/react-router";
import { Check, Flame, Clock, Thermometer } from "lucide-react";
import { SITE } from "@/lib/site";
import { PageHeader } from "@/components/site/PageHeader";
import { ProductSection } from "@/components/site/ProductSection";
import { BulkCta, TrustSection } from "@/components/site/Sections";
import { Reveal } from "@/components/site/primitives";

const title = `Products | ${SITE.name} - Fresh & Dry Oyster Mushrooms`;
const description = `Browse ${SITE.name}'s collection of Fresh Oyster and Dry Oyster mushrooms. High nutrition, premium grade, available in retail & wholesale bulk.`;

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
    ],
  }),
  component: ProductsPage,
});

const guides = [
  {
    name: "Fresh Oyster Mushroom",
    tag: "High Moisture & Umami",
    shelfLife: "5 – 7 days refrigerated (3°C - 5°C)",
    culinary: "Stir-fries, curries, soups, pasta, and pan-seared with herbs.",
    handling: "Keep in ventilated containers; do not wash until ready to cook.",
  },
  {
    name: "Dry Oyster Mushroom",
    tag: "Concentrated Flavor & Long Storage",
    shelfLife: "6 – 12 months in airtight container",
    culinary: "Rich broths, gravies, mushroom powders, dietary supplements, seasonings.",
    handling: "Rehydrate in lukewarm water for 15-20 minutes before culinary preparation.",
  },
];

function ProductsPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Our Harvest"
        title="Premium Mushroom"
        titleAccent="Collection."
        subtitle="Explore our naturally grown Fresh and Dry Oyster mushroom selections, carefully graded for kitchens, restaurants, and bulk supply."
        breadcrumb="Products"
      />

      <ProductSection />

      {/* Culinary & Storage Guide */}
      <section className="bg-background py-16 sm:py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="eyebrow text-[0.68rem] sm:text-xs">Buyer's Guide</p>
            <h2 className="mt-3 text-3xl font-medium leading-[1.08] sm:mt-4 sm:text-4xl md:text-5xl break-words">
              Culinary Use & <em className="text-earth">Storage Advice</em>
            </h2>
            <p className="mt-3 sm:mt-5 text-base sm:text-lg text-muted-foreground">
              To maximize shelf life and culinary value, here is how each variety is best handled and prepared.
            </p>
          </Reveal>

          <div className="mt-12 sm:mt-16 grid gap-6 sm:gap-8 md:grid-cols-2 max-w-4xl mx-auto">
            {guides.map((g, i) => (
              <Reveal key={g.name} delay={i * 120} className="flex flex-col rounded-2xl border border-border bg-card p-5 sm:p-8 shadow-soft">
                <span className="inline-block w-fit rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-primary">
                  {g.tag}
                </span>
                <h3 className="mt-3 sm:mt-4 text-xl sm:text-2xl font-medium break-words">{g.name}</h3>

                <div className="mt-5 sm:mt-6 space-y-3.5 sm:space-y-4 text-xs sm:text-sm">
                  <div className="flex items-start gap-3">
                    <Clock size={16} className="mt-0.5 shrink-0 text-earth" />
                    <div>
                      <p className="font-semibold text-foreground">Shelf Life</p>
                      <p className="text-muted-foreground">{g.shelfLife}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Flame size={16} className="mt-0.5 shrink-0 text-gold" />
                    <div>
                      <p className="font-semibold text-foreground">Best For</p>
                      <p className="text-muted-foreground">{g.culinary}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Thermometer size={16} className="mt-0.5 shrink-0 text-primary" />
                    <div>
                      <p className="font-semibold text-foreground">Storage & Prep</p>
                      <p className="text-muted-foreground">{g.handling}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <BulkCta />
      <TrustSection />
    </main>
  );
}
