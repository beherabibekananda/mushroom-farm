import { useState } from "react";
import { ArrowUpRight, Check, MessageCircle, IndianRupee } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { PRODUCTS, waLink, type Product } from "@/lib/site";
import { Btn, Reveal, SectionHead } from "./primitives";

export function ProductCard({ p, onView }: { p: Product; onView: () => void }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl bg-card shadow-soft">
      <button onClick={onView} className="relative overflow-hidden" aria-label={`View ${p.name}`}>
        <img
          src={p.image}
          alt={p.name}
          loading="lazy"
          width={1024}
          height={1024}
          className="aspect-[4/3.4] w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
        />
        <span className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-card/90 text-primary opacity-0 transition-all duration-500 group-hover:opacity-100">
          <ArrowUpRight size={18} />
        </span>
        {p.price && (
          <span className="absolute bottom-3 left-3 flex items-center gap-1 rounded-full bg-forest/90 px-3 py-1 text-xs font-semibold text-gold backdrop-blur-sm">
            <IndianRupee size={11} /> {p.price.replace("₹", "")}
          </span>
        )}
      </button>
      <div className="flex flex-1 flex-col p-5 sm:p-7">
        <h3 className="text-2xl sm:text-3xl font-medium break-words">{p.name}</h3>
        <p className="mt-2.5 text-sm sm:text-base text-muted-foreground">{p.description}</p>
        <ul className="mt-4 flex flex-wrap gap-1.5 sm:gap-2">
          {p.highlights.map((h) => (
            <li key={h} className="rounded-full border border-border px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">
              {h}
            </li>
          ))}
        </ul>
        {p.moq && (
          <p className="mt-3 text-xs text-muted-foreground">
            <span className="font-semibold text-foreground">Min. Order:</span> {p.moq}
          </p>
        )}
        <div className="mt-auto grid grid-cols-2 gap-2 pt-6 sm:gap-3 sm:pt-7">
          <button
            onClick={onView}
            className="rounded-full border border-primary/30 py-2.5 text-xs font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground sm:py-3 sm:text-sm"
          >
            View Details
          </button>
          <Btn href="/contact" className="py-2.5 text-xs sm:py-3 sm:text-sm justify-center">Enquire Now</Btn>
        </div>
      </div>
    </article>
  );
}

export function ProductSection() {
  const [active, setActive] = useState<Product | null>(null);
  return (
    <section id="products" className="bg-secondary/60 py-16 sm:py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <SectionHead
          eyebrow="Our Range"
          title="Our Premium Products"
          sub="Freshly grown and carefully processed oyster mushrooms — available for retail, wholesale and bulk supply across India."
        />
        <div className="mt-12 sm:mt-16 grid gap-6 sm:gap-8 md:grid-cols-2 max-w-4xl mx-auto">
          {PRODUCTS.map((p, i) => (
            <Reveal key={p.id} delay={i * 120}>
              <ProductCard p={p} onView={() => setActive(p)} />
            </Reveal>
          ))}
        </div>
      </div>

      <Dialog open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="max-h-[92vh] w-[94vw] max-w-4xl overflow-y-auto border-none bg-card p-0 rounded-2xl">
          {active && (
            <div className="grid md:grid-cols-2">
              <img
                src={active.image}
                alt={active.name}
                width={1024}
                height={1024}
                className="h-full max-h-64 sm:max-h-80 w-full object-cover md:max-h-none"
              />
              <div className="p-5 sm:p-7 md:p-9">
                <p className="eyebrow text-[0.68rem] sm:text-xs">Product Details</p>
                <DialogTitle className="mt-2 font-serif text-2xl sm:text-3xl md:text-4xl font-medium break-words">{active.name}</DialogTitle>
                <DialogDescription className="mt-2 text-sm sm:text-base text-muted-foreground">
                  {active.description}
                </DialogDescription>

                {/* Pricing & MOQ */}
                {(active.price || active.moq) && (
                  <div className="mt-4 flex flex-wrap gap-2 sm:gap-3">
                    {active.price && (
                      <div className="rounded-lg bg-secondary px-3 py-1.5 sm:px-4 sm:py-2">
                        <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Price</p>
                        <p className="mt-0.5 font-serif text-base sm:text-lg font-semibold text-primary">{active.price}</p>
                      </div>
                    )}
                    {active.moq && (
                      <div className="rounded-lg bg-secondary px-3 py-1.5 sm:px-4 sm:py-2">
                        <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Min. Order</p>
                        <p className="mt-0.5 font-serif text-base sm:text-lg font-semibold text-primary">{active.moq}</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Highlights */}
                <ul className="mt-4 space-y-1.5 text-xs sm:text-sm">
                  {active.highlights.map((h) => (
                    <li key={h} className="flex items-center gap-2">
                      <Check size={15} className="text-earth shrink-0" /> {h}
                    </li>
                  ))}
                </ul>

                {/* Full Specifications */}
                {active.specs && active.specs.length > 0 && (
                  <dl className="mt-5 divide-y divide-border border-y border-border text-xs sm:text-sm">
                    {active.specs.map(({ label, value }) => (
                      <div key={label} className="flex justify-between gap-4 py-2.5">
                        <dt className="text-muted-foreground">{label}</dt>
                        <dd className="text-right font-medium">{value}</dd>
                      </div>
                    ))}
                  </dl>
                )}

                <div className="mt-6 grid grid-cols-2 gap-2 sm:gap-3">
                  <Btn href="/contact" onClick={() => setActive(null)} className="py-2.5 text-xs sm:py-3 sm:text-sm justify-center">
                    Enquire Now
                  </Btn>
                  <Btn
                    href={waLink(`Hello, I'd like to enquire about ${active.name}.`)}
                    target="_blank"
                    rel="noreferrer"
                    variant="gold"
                    className="py-2.5 text-xs sm:py-3 sm:text-sm justify-center"
                  >
                    <MessageCircle size={15} /> WhatsApp
                  </Btn>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
