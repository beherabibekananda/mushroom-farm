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
        className="h-10 w-10 sm:h-12 sm:w-12 rounded-full object-cover border-2 border-gold/60 shadow-md transition-transform duration-300 group-hover:scale-105 bg-white"
      />
      <div className="flex flex-col">
        <span className={cn("font-serif text-xl sm:text-2xl font-bold tracking-tight leading-none", light ? "text-forest-foreground" : "text-primary")}>
          {SITE.name}
        </span>
        <span className="text-[0.6rem] sm:text-[0.65rem] uppercase tracking-widest text-gold font-medium mt-1">
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
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled || open ? "bg-forest/90 py-3 backdrop-blur-xl shadow-soft" : "py-6",
        )}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 md:px-8">
          <Logo />
          <ul className="hidden items-center gap-7 lg:flex">
            {NAV.map(([l, h]) => (
              <li key={h}>
                <Link
                  to={h}
                  activeOptions={{ exact: h === "/" }}
                  activeProps={{ className: "text-gold font-semibold" }}
                  inactiveProps={{ className: "text-forest-foreground/80 hover:text-gold" }}
                  className="relative py-1 text-sm tracking-wide transition-colors"
                >
                  {l}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-3">
            <Btn href="/order" variant="gold" className="hidden px-5 py-2.5 sm:inline-flex">🛒 Order Now</Btn>
            <Btn href="/contact" variant="ghostLight" className="hidden px-4 py-2.5 sm:inline-flex">Get a Quote</Btn>
            <button aria-label="Toggle menu" onClick={() => setOpen(!open)} className="p-1.5 text-forest-foreground lg:hidden">
              {open ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </nav>
        {open && (
          <div className="max-h-[calc(100svh-5rem)] overflow-y-auto px-4 pb-6 pt-2 sm:px-6 lg:hidden">
            <ul className="space-y-1">
              {NAV.map(([l, h]) => (
                <li key={h}>
                  <Link
                    to={h}
                    onClick={() => setOpen(false)}
                    activeOptions={{ exact: h === "/" }}
                    activeProps={{ className: "text-gold font-semibold" }}
                    inactiveProps={{ className: "text-forest-foreground hover:text-gold" }}
                    className="block border-b border-forest-foreground/10 py-3 font-serif text-xl sm:text-2xl transition-colors"
                  >
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <Btn href="/order" variant="gold" className="justify-center" onClick={() => setOpen(false)}>🛒 Order Now</Btn>
              <Btn href="/contact" variant="ghostLight" className="justify-center" onClick={() => setOpen(false)}>Get a Quote</Btn>
              <Btn href={waLink()} target="_blank" rel="noreferrer" variant="ghostLight" className="justify-center col-span-2"><MessageCircle size={16} /> WhatsApp Us</Btn>
            </div>
          </div>
        )}
      </header>

      <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 gap-px border-t border-border/80 bg-border shadow-soft md:hidden pb-[env(safe-area-inset-bottom)]">
        <a href={`tel:${SITE.phone.replace(/\s/g, "")}`} className="flex items-center justify-center gap-1.5 bg-card py-3.5 text-xs font-semibold text-primary"><Phone size={15} /> Call</a>
        <a href="/order" className="flex items-center justify-center gap-1.5 bg-gold text-accent-foreground py-3.5 text-xs font-bold">🛒 Order</a>
        <a href={waLink()} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-1.5 bg-primary py-3.5 text-xs font-semibold text-primary-foreground"><MessageCircle size={15} /> WhatsApp</a>
      </div>
    </>
  );
}
