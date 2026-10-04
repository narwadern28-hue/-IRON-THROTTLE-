import { useEffect, useRef } from "react";
import { scrollToId } from "../hooks";
import { IconArrow } from "./Icons";

export default function Hero() {
  const imgWrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = imgWrap.current;
    if (!el) return;
    const onScroll = () => {
      const y = window.scrollY;
      if (y > window.innerHeight) return;
      el.style.transform = `translateY(${y * 0.22}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="home" className="relative h-[100svh] min-h-[640px] overflow-hidden">
      <div className="absolute inset-0 will-change-transform" ref={imgWrap}>
        <img
          src="/images/hero.jpg"
          alt="Custom motorcycle in dramatic studio light"
          className="hero-zoom h-[115%] w-full object-cover object-[62%_center]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-black/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-transparent to-black/30" />
      </div>

      <div className="relative z-10 h-full mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 flex flex-col justify-end pb-20 sm:pb-24 pt-40">
        <p
          className="hero-anim font-display text-[11px] sm:text-[12px] tracking-[0.42em] text-copper-light"
          style={{ animationDelay: "0.15s" }}
        >
          CUSTOM MOTORCYCLES • HAND BUILT
        </p>
        <div
          className="hero-rule mt-5 mb-6 h-px w-24 bg-copper"
          style={{ animationDelay: "0.35s" }}
        />
        <h1
          className="hero-anim font-display font-medium text-[3.1rem] sm:text-6xl md:text-7xl lg:text-[5.4rem] leading-[0.92] tracking-[0.04em] max-w-4xl"
          style={{ animationDelay: "0.28s" }}
        >
          BUILT FOR THE
          <br />
          <span className="text-copper-light">UNCOMMON.</span>
        </h1>
        <p
          className="hero-anim mt-6 max-w-xl font-serif text-lg sm:text-xl text-warm/80 leading-relaxed"
          style={{ animationDelay: "0.48s" }}
        >
          Handcrafted motorcycles designed around your vision, your riding style and your idea of perfection.
        </p>
        <div className="hero-anim mt-10 flex flex-wrap gap-4" style={{ animationDelay: "0.62s" }}>
          <button onClick={() => scrollToId("customise")} className="btn-primary">
            START YOUR BUILD
            <IconArrow className="h-4 w-4" />
          </button>
          <button onClick={() => scrollToId("builds")} className="btn-ghost">
            EXPLORE BUILDS
          </button>
        </div>
      </div>

      <button
        onClick={() => scrollToId("builds")}
        className="absolute bottom-7 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3 text-[10px] tracking-[0.35em] font-display text-warm/60"
        aria-label="Scroll"
      >
        SCROLL
        <span className="relative h-10 w-px bg-white/20 overflow-hidden">
          <span className="scroll-dot absolute top-0 left-0 h-2 w-px bg-copper" />
        </span>
      </button>
    </section>
  );
}
