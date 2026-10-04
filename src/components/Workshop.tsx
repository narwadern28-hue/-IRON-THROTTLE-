import { workshopTiles } from "../data";
import Reveal from "./Reveal";
import { scrollToId } from "../hooks";
import { IconArrow } from "./Icons";

export default function Workshop() {
  return (
    <section id="workshop" className="relative py-24 sm:py-32 border-t border-white/5">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-20 items-end">
          <Reveal>
            <p className="font-display text-[11px] tracking-[0.4em] text-copper">THE WORKSHOP</p>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl md:text-6xl tracking-[0.06em] leading-[0.95]">
              CRAFTED IN THE WORKSHOP.
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="font-serif text-xl sm:text-2xl text-warm/80 leading-relaxed">
              Every detail matters. From the first sketch to the final bolt, our builds are shaped by craftsmanship, engineering and obsession.
            </p>
            <button onClick={() => scrollToId("gallery")} className="btn-ghost mt-8">
              EXPLORE THE WORKSHOP
              <IconArrow className="h-4 w-4" />
            </button>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-4">
          {workshopTiles.map((tile, i) => (
            <Reveal key={tile.title} delay={i * 80}>
              <figure className="group relative overflow-hidden min-h-[320px] lg:min-h-[380px]">
                <img
                  src={tile.src}
                  alt={tile.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                <figcaption className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                  <p className="font-display tracking-[0.28em] text-sm text-copper-light">{tile.title}</p>
                  <p className="mt-2 font-serif text-base text-warm/80 max-w-md">{tile.text}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
