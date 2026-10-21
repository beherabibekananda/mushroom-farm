import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { Leaf, Reveal } from "./primitives";

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  titleAccent?: string;
  subtitle: string;
  breadcrumb: string;
}

export function PageHeader({ eyebrow, title, titleAccent, subtitle, breadcrumb }: PageHeaderProps) {
  return (
    <section className="grain relative overflow-hidden bg-forest pb-12 pt-28 text-forest-foreground sm:pb-16 sm:pt-36 md:pb-24 md:pt-44">
      <Leaf className="pointer-events-none absolute -right-12 -top-12 w-80 text-gold/10" />
      <Leaf className="pointer-events-none absolute -bottom-16 -left-16 w-72 rotate-90 text-gold/10" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <Reveal>
          <nav aria-label="Breadcrumb" className="mb-4 sm:mb-6 flex flex-wrap items-center gap-2 text-[0.68rem] uppercase tracking-[0.2em] text-forest-foreground/60">
            <Link to="/" className="transition-colors hover:text-gold">
              Home
            </Link>
            <ChevronRight size={12} className="text-gold/60" />
            <span className="text-gold">{breadcrumb}</span>
          </nav>

          {eyebrow && <p className="eyebrow text-[0.68rem] sm:text-xs">{eyebrow}</p>}
          <h1 className="mt-3 sm:mt-4 text-3xl font-medium leading-[1.08] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl break-words">
            {title} {titleAccent && <em className="font-light text-gold">{titleAccent}</em>}
          </h1>
          <p className="mt-4 sm:mt-6 max-w-2xl text-base text-forest-foreground/80 sm:text-lg md:text-xl">
            {subtitle}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
