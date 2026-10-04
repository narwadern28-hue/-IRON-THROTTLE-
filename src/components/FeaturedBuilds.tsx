import type { Build } from "../data";
import { builds } from "../data";
import Reveal from "./Reveal";
import { IconArrow } from "./Icons";

type Props = {
  onOpen: (build: Build) => void;
};

export default function FeaturedBuilds({ onOpen }: Props) {
  return (
    <section id="builds" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <Reveal>
          <p className="font-display text-[11px] tracking-[0.4em] text-copper">THE COLLECTION</p>
          <h2 className="mt-4 font-display text-4xl sm:text-5xl md:text-6xl tracking-[0.06em]">
            BUILT. NOT BOUGHT.
          </h2>
          <p className="mt-5 max-w-xl font-serif text-lg text-muted leading-relaxed">
            Every motorcycle begins with an idea. We turn that idea into a machine built around you.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
          {builds.map((build, i) => (
            <Reveal key={build.id} delay={i * 70} className={i === 0 || i === 3 ? "md:col-span-2" : ""}>
              <article
                className={`build-card group relative overflow-hidden cursor-pointer min-h-[420px] ${
                  i === 0 || i === 3 ? "lg:min-h-[520px]" : "lg:min-h-[480px]"
                }`}
                onClick={() => onOpen(build)}
              >
                <img
                  src={build.image}
                  alt={`${build.name} ${build.type}`}
                  className="build-img absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                <div className="build-shade absolute inset-0 opacity-70 bg-[radial-gradient(circle_at_30%_20%,rgba(193,127,74,0.18),transparent_45%)]" />
                <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end">
                  <p className="font-display text-[11px] tracking-[0.32em] text-copper-light">{build.type}</p>
                  <h3 className="mt-2 font-display text-3xl sm:text-4xl tracking-[0.12em]">{build.name}</h3>
                  <div className="build-copy build-more mt-4 max-w-md">
                    <p className="font-serif text-base text-warm/80 leading-relaxed">{build.description}</p>
                    <span className="mt-5 inline-flex items-center gap-2 font-display text-[11px] tracking-[0.28em] text-copper-light">
                      VIEW BUILD <IconArrow className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
