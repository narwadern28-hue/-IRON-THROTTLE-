import { craftFeatures } from "../data";
import Reveal from "./Reveal";

export default function Craftsmanship() {
  return (
    <section className="relative py-24 sm:py-32 border-t border-white/5 overflow-hidden">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-16 items-center">
        <Reveal variant="left">
          <p className="font-display text-[11px] tracking-[0.4em] text-copper">ENGINEERING</p>
          <h2 className="mt-4 font-display text-4xl sm:text-5xl md:text-6xl tracking-[0.06em] leading-[0.95]">
            FORM MEETS FUNCTION.
          </h2>
          <p className="mt-6 font-serif text-lg text-muted leading-relaxed max-w-md">
            A custom motorcycle should ride as convincingly as it looks. Geometry, mass and materials are treated with the same care as paint and stitchwork.
          </p>
        </Reveal>

        <div className="space-y-2">
          {craftFeatures.map((f, i) => (
            <Reveal key={f.n} delay={i * 100}>
              <div className="group flex gap-6 sm:gap-10 items-start border-b border-white/8 py-8">
                <span className="craft-num text-5xl sm:text-6xl leading-none">{f.n}</span>
                <div>
                  <h3 className="font-display text-xl tracking-[0.2em]">{f.title}</h3>
                  <p className="mt-3 font-serif text-lg text-muted">{f.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
