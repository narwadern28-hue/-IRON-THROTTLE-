import { processSteps } from "../data";
import Reveal from "./Reveal";

export default function Process() {
  return (
    <section id="process" className="relative py-24 sm:py-32 border-t border-white/5">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <Reveal>
          <p className="font-display text-[11px] tracking-[0.4em] text-copper">THE PROCESS</p>
          <h2 className="mt-4 font-display text-4xl sm:text-5xl md:text-6xl tracking-[0.06em]">
            FROM IDEA TO MACHINE.
          </h2>
        </Reveal>

        <div className="relative mt-16">
          <div className="hidden lg:block absolute top-[42px] left-[8%] right-[8%] h-px timeline-line" />
          <ol className="grid grid-cols-1 lg:grid-cols-4 gap-10 lg:gap-8">
            {processSteps.map((step, i) => (
              <Reveal key={step.n} delay={i * 90}>
                <li className="relative pl-10 lg:pl-0">
                  <span className="lg:hidden absolute left-0 top-1 bottom-0 w-px bg-copper/30" />
                  <span className="lg:hidden absolute left-[-4px] top-2 h-2.5 w-2.5 rounded-full bg-copper" />
                  <div className="flex lg:flex-col lg:items-center text-left lg:text-center">
                    <div className="relative z-10 grid h-[84px] w-[84px] place-items-center rounded-full border border-copper/50 bg-[#09090b]">
                      <span className="font-display text-xl tracking-[0.16em] text-copper-light">{step.n}</span>
                    </div>
                  </div>
                  <h3 className="mt-6 font-display text-xl tracking-[0.22em] lg:text-center">{step.title}</h3>
                  <p className="mt-3 font-serif text-base text-muted leading-relaxed lg:text-center lg:px-4">
                    {step.text}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
