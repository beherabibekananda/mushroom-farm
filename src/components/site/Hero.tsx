import { Link } from "@tanstack/react-router";
import { ArrowRight, MessageCircle } from "lucide-react";
import heroBanner from "@/assets/landing-banner.webp";
import heroBannerMobile from "@/assets/landing-banner-mobile.webp";
import { SITE, waLink } from "@/lib/site";
import { Btn } from "./primitives";

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-0 md:min-h-[100svh] w-full items-center justify-center overflow-hidden bg-[#0d1c12]"
    >
      {/* Mobile blurred atmospheric background to create a realistic, immersive depth of field */}
      <div 
        className="absolute inset-0 md:hidden bg-cover bg-center scale-110 blur-2xl opacity-40 pointer-events-none select-none brightness-75"
        style={{ backgroundImage: `url(${heroBannerMobile})` }}
        aria-hidden="true"
      />

      {/* Mobile ambient lighting glow behind the poster */}
      <div 
        className="absolute inset-0 md:hidden pointer-events-none bg-[radial-gradient(circle_at_center,rgba(40,75,45,0.45)_0%,rgba(13,28,18,0.95)_75%)]"
        aria-hidden="true"
      />

      {/* Main image container */}
      <div className="relative z-10 w-full flex items-center justify-center pt-16 pb-6 px-3 sm:px-4 md:p-0 md:h-full md:min-h-[100svh]">
        <picture className="w-full max-w-sm sm:max-w-md md:max-w-none md:absolute md:inset-0 pointer-events-none select-none flex items-center justify-center aspect-[9/16] md:aspect-auto">
          <source media="(max-width: 767px)" srcSet={heroBannerMobile} width={576} height={1024} type="image/webp" />
          <img
            src={heroBanner}
            alt="Shiva Agro — Freshness from Nature to Your Table. Premium Oyster Mushrooms, Fresh & Dry Mushrooms"
            width={1024}
            height={576}
            fetchPriority="high"
            loading="eager"
            decoding="async"
            className="w-full h-full max-h-[78vh] md:max-h-none rounded-2xl md:rounded-none object-contain md:object-cover object-center shadow-[0_15px_40px_rgba(0,0,0,0.6)] md:shadow-none border border-white/10 md:border-none transition-all duration-300 md:h-full md:w-full"
          />
        </picture>
      </div>

      {/* Top subtle gradient for navbar readability */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-20 sm:h-24 bg-gradient-to-b from-[#0d1c12]/90 via-[#0d1c12]/50 to-transparent z-20"
        aria-hidden="true"
      />

      {/* Bottom subtle fade */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0d1c12] to-transparent z-20 md:hidden"
        aria-hidden="true"
      />

      {/* Screen Reader & Accessible SEO Headings */}
      <div className="sr-only">
        <h1>{SITE.name} — Freshness from Nature to Your Table</h1>
        <p>Premium Oyster Mushrooms: Fresh, Nutritious, Natural. 100% Natural, No Preservatives, Rich in Nutrition, Healthy Lifestyle.</p>
        <p>Fresh and Dry Oyster Mushrooms Cultivation & Supply Across India. Shiva Agro, Varanasi, Uttar Pradesh.</p>
      </div>

      {/* Mobile hotspot mapped directly over the hero area linking to products */}
      <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center md:hidden">
        <div className="relative w-full h-full max-w-[500px]">
          <Link
            to="/products"
            aria-label="Explore Our Products"
            className="pointer-events-auto absolute inset-0 focus:outline-none"
          >
            <span className="sr-only">Explore Our Products</span>
          </Link>
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
