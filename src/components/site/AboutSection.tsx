import about from "@/assets/about.webp";
import logoImg from "@/assets/logo.webp";
import { SITE } from "@/lib/site";
import { Btn, Leaf, Reveal } from "./primitives";

const stats = [
  ["Pan India", "Market Covered"],
  ["A Grade", "Quality Standard"],
  ["Est. 2026", "Founded"],
];

export function AboutSection() {
  return (
    <section id="about" className="relative overflow-hidden py-16 sm:py-24 md:py-36">
      <Leaf className="pointer-events-none absolute -right-16 top-10 w-96 text-earth/15" />
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 md:px-8 lg:grid-cols-2 lg:gap-20">
        <Reveal className="relative">
          <img
            src={about}
            alt="Hands harvesting oyster mushrooms in a cultivation room"
            loading="lazy"
            width={1024}
            height={1280}
            className="aspect-[4/5] w-full rounded-2xl object-cover shadow-soft"
          />
          <div className="absolute -bottom-6 -right-4 hidden rounded-2xl bg-forest p-3.5 text-forest-foreground shadow-xl border border-gold/30 md:flex items-center gap-3.5">
            <img src={logoImg} alt={SITE.name} className="h-12 w-12 rounded-full object-cover border border-gold/50 bg-white" />
            <div>
              <p className="font-serif text-lg font-bold text-gold leading-tight">{SITE.name}</p>
              <p className="text-[10px] uppercase tracking-widest text-forest-foreground/80">Fresh & Dry Mushrooms</p>
            </div>
          </div>
        </Reveal>
        <Reveal delay={150}>
          <p className="eyebrow text-[0.68rem] sm:text-xs">About Us</p>
          <h2 className="mt-3 text-3xl font-medium leading-[1.08] tracking-tight sm:mt-4 sm:text-4xl md:text-6xl break-words">
            Growing Quality.
            <br />
            <em className="text-earth">Building Trust.</em>
          </h2>
          <p className="mt-5 text-base sm:text-lg leading-relaxed text-muted-foreground">
            <strong>{SITE.name}</strong> was established in {SITE.estYear} as a {SITE.legalStatus} by{" "}
            <strong>{SITE.founder}</strong>. Operating as a {SITE.businessType} of Fresh and Dry Oyster
            Mushrooms, we are proudly based in Varanasi, Uttar Pradesh.
          </p>
          <p className="mt-3 text-base sm:text-lg leading-relaxed text-muted-foreground">
            We offer our products at reasonable rates and aim to deliver them within the promised timeframe,
            serving customers across India with consistent quality and reliability.
          </p>
          <div className="mt-8 grid grid-cols-3 divide-x divide-border border-y border-border">
            {stats.map(([a, b]) => (
              <div key={a} className="px-2 sm:px-3 py-4 sm:py-6 text-center">
                <p className="font-serif text-xl sm:text-2xl text-primary md:text-3xl">{a}</p>
                <p className="mt-1 text-[10px] sm:text-xs uppercase tracking-wider sm:tracking-[0.2em] text-muted-foreground">{b}</p>
              </div>
            ))}
          </div>
          <Btn href="/about" variant="outline" className="mt-8 w-full sm:w-auto justify-center">
            Learn More About Us
          </Btn>
        </Reveal>
      </div>
    </section>
  );
}
