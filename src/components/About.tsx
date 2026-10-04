import Reveal from "./Reveal";

export default function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32 border-t border-white/5">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <Reveal className="lg:col-span-5">
          <p className="font-display text-[11px] tracking-[0.4em] text-copper">ABOUT</p>
          <h2 className="mt-4 font-display text-4xl sm:text-5xl md:text-6xl tracking-[0.06em] leading-[0.95]">
            MORE THAN A MOTORCYCLE.
          </h2>
        </Reveal>
        <Reveal delay={120} className="lg:col-span-6 lg:col-start-7">
          <p className="font-serif text-xl sm:text-2xl text-warm/85 leading-relaxed">
            We believe a motorcycle should feel personal. Every build is an opportunity to combine design, engineering and individuality into a machine that feels unmistakably yours.
          </p>
          <p className="mt-8 text-sm leading-relaxed text-muted">
            IRON &amp; THROTTLE is a fictional concept brand created for a freelance web-design portfolio. The workshop, motorcycles, prices and contact details on this site are illustrative. This is not a real company and not a real client project.
          </p>
          <div className="mt-10 grid grid-cols-3 gap-6 border-t border-white/10 pt-8">
            {[
              ["6", "Concept builds"],
              ["UK / AU", "Imagined locales"],
              ["2026", "Portfolio piece"],
            ].map(([n, l]) => (
              <div key={l}>
                <p className="font-display text-2xl tracking-[0.08em] text-copper-light">{n}</p>
                <p className="mt-1 text-[11px] tracking-[0.16em] uppercase text-warm/40">{l}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
