import { demoQuotes } from "../data";
import Reveal from "./Reveal";

export default function Experience() {
  return (
    <section className="relative py-24 sm:py-32 border-t border-white/5">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <Reveal>
          <p className="font-display text-[11px] tracking-[0.4em] text-copper">NOTES</p>
          <h2 className="mt-4 font-display text-4xl sm:text-5xl tracking-[0.06em]">THE BUILD EXPERIENCE</h2>
          <p className="mt-4 text-[11px] tracking-[0.2em] uppercase text-warm/40 font-display">
            Fictional / demo quotes — not genuine customer testimonials
          </p>
        </Reveal>
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          {demoQuotes.map((q, i) => (
            <Reveal key={q.role} delay={i * 90}>
              <blockquote className="h-full border border-white/10 p-7 sm:p-8 flex flex-col">
                <p className="font-display text-[10px] tracking-[0.28em] text-copper">DEMO TESTIMONIAL</p>
                <p className="mt-6 font-serif text-xl italic text-warm/90 leading-relaxed">“{q.quote}”</p>
                <footer className="mt-auto pt-8">
                  <p className="text-sm text-warm/70">{q.attribution}</p>
                  <p className="text-[11px] tracking-[0.16em] uppercase text-warm/35 mt-1">{q.role}</p>
                </footer>
              </blockquote>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
