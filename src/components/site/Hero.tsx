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
      {/* Edge-to-edge full screen natural background image for desktop & laptops */}
      <img
        src={heroBanner}
        alt="Shiva Agro — Freshness from Nature to Your Table. Premium Oyster Mushrooms, Fresh & Dry Mushrooms"
        width={1024}
        height={576}
        fetchPriority="high"
        loading="eager"
        className="absolute inset-0 h-full w-full object-cover object-center pointer-events-none select-none"
      />

      {/* Gentle top gradient so navigation links are always crystal clear against the sky */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-32 sm:h-36 bg-gradient-to-b from-black/65 via-black/30 to-transparent z-10"
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

      {/* Mobile Action Bar: Positioned above the fixed bottom bar (bottom-20) with zero overlap */}
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
