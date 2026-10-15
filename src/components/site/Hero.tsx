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

      {/* Mobile-Friendly CTAs for narrow smartphone screens where 16:9 scales proportionally */}
      <div className="absolute inset-x-0 bottom-6 z-20 flex flex-col items-center px-4 md:hidden">
        <div className="flex w-full max-w-sm flex-col gap-2.5">
          <Btn href="/order" variant="gold" className="w-full justify-center shadow-lg shadow-black/50 py-3 text-sm">
            🛒 Order Now <ArrowRight size={16} />
          </Btn>
          <Btn href="/products" variant="ghostLight" className="w-full justify-center py-2.5 text-sm bg-black/50 backdrop-blur-md">
            Explore Products <ArrowRight size={15} />
          </Btn>
          <div className="grid grid-cols-2 gap-2">
            <Btn href={waLink()} target="_blank" rel="noreferrer" variant="ghostLight" className="justify-center py-2.5 text-xs bg-black/50 backdrop-blur-md">
              <MessageCircle size={15} /> WhatsApp
            </Btn>
            <Btn href="/contact" variant="ghostLight" className="justify-center py-2.5 text-xs bg-black/50 backdrop-blur-md">
              Get a Quote
            </Btn>
          </div>
        </div>
      </div>

      {/* Desktop: floating Order Now pill, always visible over the banner */}
      <div className="hidden md:flex absolute left-8 bottom-10 z-20 flex-col gap-3">
        <Btn href="/order" variant="gold" className="shadow-xl shadow-black/40 text-sm">
          🛒 Order Now <ArrowRight size={15} />
        </Btn>
        <Btn href={waLink()} target="_blank" rel="noreferrer" variant="ghostLight" className="text-xs bg-black/40 backdrop-blur-md border-white/30 text-white">
          <MessageCircle size={14} /> WhatsApp Us
        </Btn>
      </div>
    </section>
  );
}
