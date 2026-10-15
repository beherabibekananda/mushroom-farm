import { Link } from "@tanstack/react-router";
import { ArrowRight, MessageCircle } from "lucide-react";
import heroBanner from "@/assets/landing-banner.webp";
import { SITE, waLink } from "@/lib/site";
import { Btn } from "./primitives";

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex h-screen min-h-[100svh] w-full items-center justify-center overflow-hidden bg-[#162719]"
    >
      {/* Natural background image: positioned object-[65%_center] on mobile to focus the Shiva Agro pack, centered on desktop */}
      <img
        src={heroBanner}
        alt="Shiva Agro — Freshness from Nature to Your Table. Premium Oyster Mushrooms, Fresh & Dry Mushrooms"
        width={1024}
        height={576}
        fetchPriority="high"
        loading="eager"
        className="absolute inset-0 h-full w-full object-cover object-[62%_center] md:object-center pointer-events-none select-none transition-all duration-300"
      />

      {/* Top gradient for navbar clarity */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-28 sm:h-36 bg-gradient-to-b from-black/75 via-black/35 to-transparent z-10"
        aria-hidden="true"
      />

      {/* Mobile-only bottom vignette so floating buttons stand out against the wooden tabletop */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/85 via-black/40 to-transparent z-10 md:hidden"
        aria-hidden="true"
      />

      {/* Screen Reader & Accessible SEO Headings */}
      <div className="sr-only">
        <h1>{SITE.name} — Freshness from Nature to Your Table</h1>
        <p>Premium Oyster Mushrooms: Fresh, Nutritious, Natural. 100% Natural, No Preservatives, Rich in Nutrition, Healthy Lifestyle.</p>
        <p>Fresh and Dry Oyster Mushrooms Cultivation & Supply Across India. Shiva Agro, Varanasi, Uttar Pradesh.</p>
      </div>

      {/* Interactive Hotspot container mapped directly over the 'Explore Our Products ->' button */}
      <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center">
        <div className="relative w-full h-full max-w-[1920px]">
          <Link
            to="/products"
            aria-label="Explore Our Products"
            style={{
              left: "13.6%",
              top: "62.2%",
              width: "23.8%",
              height: "12.5%",
            }}
            className="pointer-events-auto absolute hidden md:block rounded-full transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_25px_rgba(76,175,80,0.6)] focus:outline-none focus:ring-4 focus:ring-gold/60 cursor-pointer"
          >
            <span className="sr-only">Explore Our Products</span>
          </Link>
        </div>
      </div>

      {/* Mobile Top Brand Pill (subtle and elegant below the navbar) */}
      <div className="absolute inset-x-0 top-20 z-20 flex flex-col items-center px-4 md:hidden pointer-events-none">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-black/55 backdrop-blur-md px-3.5 py-1 text-[11px] font-semibold tracking-wider uppercase text-gold border border-gold/40 shadow-lg">
          🌿 100% Natural Oyster Mushrooms
        </span>
      </div>

      {/* Mobile Action Bar: Positioned safely above the fixed bottom bar with zero overlap */}
      <div className="absolute inset-x-0 bottom-20 z-20 flex flex-col items-center px-4 md:hidden">
        <div className="flex w-full max-w-xs flex-col gap-2">
          <Btn
            href="/order"
            variant="gold"
            className="w-full justify-center shadow-[0_8px_25px_rgba(212,160,23,0.45)] py-3 text-sm font-bold border border-gold/50"
          >
            🛒 Order Fresh & Dry <ArrowRight size={16} />
          </Btn>
          <Btn
            href="/products"
            variant="ghostLight"
            className="w-full justify-center py-2.5 text-xs bg-black/60 backdrop-blur-md border border-white/25 text-white font-medium"
          >
            Explore Product Range <ArrowRight size={14} />
          </Btn>
        </div>
      </div>

      {/* Desktop: floating Order Now & WhatsApp pill dock */}
      <div className="hidden md:flex absolute left-8 bottom-10 z-20 items-center gap-3 bg-black/45 backdrop-blur-xl p-2 rounded-full border border-white/15 shadow-[0_10px_35px_rgba(0,0,0,0.5)]">
        <Btn href="/order" variant="gold" className="shadow-lg shadow-gold/30 text-xs font-bold px-5 py-2.5 hover:scale-105 transition-all">
          🛒 Order Now <ArrowRight size={14} />
        </Btn>
        <Btn href="/products" variant="ghostLight" className="text-xs font-semibold px-4 py-2.5 bg-white/10 hover:bg-white/20 border-white/20 text-white hover:scale-105 transition-all">
          View Products
        </Btn>
        <Btn href={waLink()} target="_blank" rel="noreferrer" variant="ghostLight" className="text-xs font-semibold px-4 py-2.5 bg-[#25D366]/20 hover:bg-[#25D366]/30 border-[#25D366]/40 text-white hover:scale-105 transition-all">
          <MessageCircle size={14} className="text-[#25D366]" /> WhatsApp Us
        </Btn>
      </div>
    </section>
  );
}
