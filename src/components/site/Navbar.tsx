import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, MessageCircle, Phone } from "lucide-react";
import { NAV, SITE, waLink } from "@/lib/site";
import { Btn } from "./primitives";
import { cn } from "@/lib/utils";
import logoImg from "@/assets/logo.webp";

export function Logo({ light = true, className }: { light?: boolean; className?: string }) {
  return (
    <Link to="/" className={cn("flex items-center gap-3 group shrink-0", className)}>
      <img
        src={logoImg}
        alt={`${SITE.name} Brand Logo`}
        className="h-10 w-10 sm:h-11 sm:w-11 rounded-full object-cover border-2 border-gold shadow-md transition-transform duration-300 group-hover:scale-105 bg-white shrink-0"
      />
      <div className="flex flex-col">
        <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight leading-none text-white drop-shadow-sm">
          {SITE.name}
        </span>
        <span className="text-[0.6rem] sm:text-[0.65rem] uppercase tracking-widest text-gold font-semibold mt-1">
          Fresh & Dry Mushrooms
        </span>
      </div>
    </Link>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          scrolled || open
            ? "bg-[#0f1f14]/95 py-3 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.5)] border-b border-white/10"
            : "bg-[#0d1c12]/80 py-3.5 backdrop-blur-md shadow-[0_4px_25px_rgba(0,0,0,0.35)] border-b border-white/5",
        )}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 md:px-8">
          <Logo />
          <ul className="hidden items-center gap-1.5 lg:flex bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 shadow-inner">
            {NAV.map(([l, h]) => (
              <li key={h}>
                <Link
                  to={h}
                  activeOptions={{ exact: h === "/" }}
                  activeProps={{ className: "bg-gold text-[#0f1f14] font-bold shadow-md shadow-gold/30" }}
                  inactiveProps={{ className: "text-white/90 hover:text-gold hover:bg-white/10" }}
                  className="relative px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 inline-block"
                >
                  {l}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-3">
            <Btn
              href="/order"
              variant="gold"
              className="hidden px-5 py-2 sm:inline-flex text-xs font-bold shadow-lg shadow-gold/25 hover:shadow-gold/40 hover:scale-105 transition-all"
            >
              🛒 Order Now
            </Btn>
            <button
              aria-label="Toggle menu"
              onClick={() => setOpen(!open)}
              className="p-2 text-white hover:text-gold transition-colors lg:hidden bg-white/10 rounded-xl border border-white/15"
            >
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>
        {open && (
          <div className="max-h-[calc(100svh-5rem)] overflow-y-auto px-4 pb-6 pt-3 sm:px-6 lg:hidden bg-[#0d1c12] border-t border-white/10 shadow-2xl">
            <ul className="space-y-1">
              {NAV.map(([l, h]) => (
                <li key={h}>
                  <Link
                    to={h}
                    onClick={() => setOpen(false)}
                    activeOptions={{ exact: h === "/" }}
                    activeProps={{ className: "text-gold font-bold bg-white/10" }}
                    inactiveProps={{ className: "text-white/90 hover:text-gold" }}
                    className="block rounded-xl px-3 py-2.5 font-serif text-lg transition-colors"
                  >
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-5 grid grid-cols-1 gap-2.5">
              <Btn href="/order" variant="gold" className="justify-center shadow-md shadow-gold/30" onClick={() => setOpen(false)}>🛒 Order Now</Btn>
              <Btn href={waLink()} target="_blank" rel="noreferrer" variant="ghostLight" className="justify-center bg-[#25D366]/20 border-[#25D366]/50 text-white"><MessageCircle size={16} className="text-[#25D366]" /> WhatsApp Us</Btn>
            </div>
          </div>
        )}
      </header>

      <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 gap-0 border-t border-white/10 bg-[#0d1c12]/95 backdrop-blur-xl shadow-[0_-5px_25px_rgba(0,0,0,0.5)] md:hidden pb-[env(safe-area-inset-bottom)]">
        <a
          href={`tel:${SITE.phone.replace(/\s/g, "")}`}
          className="flex flex-col items-center justify-center gap-1 py-2.5 text-[11px] font-semibold text-white/90 hover:text-gold transition-colors active:bg-white/5"
        >
          <Phone size={17} className="text-white/80" />
          <span>Call Us</span>
        </a>
        <a
          href="/order"
          className="flex flex-col items-center justify-center gap-1 bg-gold text-[#0f1f14] py-2.5 text-[11px] font-bold shadow-md shadow-gold/20 active:brightness-95"
        >
          <span className="text-base leading-none">🛒</span>
          <span>Order Now</span>
        </a>
        <a
          href={waLink()}
          target="_blank"
          rel="noreferrer"
          className="flex flex-col items-center justify-center gap-1 py-2.5 text-[11px] font-semibold text-[#25D366] hover:brightness-110 transition-colors active:bg-white/5"
        >
          <MessageCircle size={17} className="text-[#25D366]" />
          <span>WhatsApp</span>
        </a>
      </div>
    </>
  );
}
