import { scrollToId } from "../hooks";
import Reveal from "./Reveal";
import { IconArrow } from "./Icons";

export default function FinalCTA() {
  return (
    <section className="relative min-h-[70vh] flex items-center overflow-hidden">
      <img
        src="/images/nightshift.jpg"
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-black/70" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
      <div className="relative z-10 mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 py-28 w-full">
        <Reveal>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl tracking-[0.06em] max-w-3xl leading-[0.95]">
            READY TO BUILD SOMETHING DIFFERENT?
          </h2>
          <p className="mt-6 font-serif text-xl text-warm/80 max-w-lg">
            Tell us what you have in mind. Your next machine starts with an idea.
          </p>
          <button onClick={() => scrollToId("customise")} className="btn-primary mt-10">
            START YOUR BUILD
            <IconArrow className="h-4 w-4" />
          </button>
        </Reveal>
      </div>
    </section>
  );
}
