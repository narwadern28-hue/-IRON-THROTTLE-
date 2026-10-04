import { useEffect } from "react";
import type { Build } from "../data";
import { IconClose, IconArrow } from "./Icons";
import { scrollToId } from "../hooks";

type Props = {
  build: Build | null;
  onClose: () => void;
};

export default function BuildModal({ build, onClose }: Props) {
  useEffect(() => {
    if (!build) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [build, onClose]);

  if (!build) return null;

  return (
    <div className="lightbox-enter fixed inset-0 z-[90] bg-[#09090b]/95 overflow-y-auto" onClick={onClose}>
      <div
        className="mx-auto max-w-6xl min-h-full grid grid-cols-1 lg:grid-cols-2"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative min-h-[50vh] lg:min-h-screen">
          <img src={build.image} alt={build.name} className="absolute inset-0 h-full w-full object-cover" />
        </div>
        <div className="relative p-8 sm:p-12 lg:p-16 flex flex-col justify-center">
          <button className="absolute top-6 right-6" onClick={onClose} aria-label="Close">
            <IconClose className="h-6 w-6" />
          </button>
          <p className="font-display text-[11px] tracking-[0.32em] text-copper">{build.type}</p>
          <h3 className="mt-3 font-display text-4xl sm:text-5xl tracking-[0.12em]">{build.name}</h3>
          <p className="mt-6 font-serif text-lg text-warm/80 leading-relaxed">{build.long}</p>
          <dl className="mt-8 space-y-3 text-sm">
            <div className="flex justify-between border-b border-white/10 pb-3">
              <dt className="text-warm/40 tracking-[0.16em] uppercase text-[11px]">Finish</dt>
              <dd>{build.finish}</dd>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-3">
              <dt className="text-warm/40 tracking-[0.16em] uppercase text-[11px]">Specification</dt>
              <dd className="text-right max-w-[220px]">{build.spec}</dd>
            </div>
          </dl>
          <p className="mt-6 text-[11px] tracking-[0.16em] uppercase text-warm/35">
            Concept motorcycle — fictional build for this portfolio piece
          </p>
          <button
            className="btn-primary mt-8 w-fit"
            onClick={() => {
              onClose();
              scrollToId("customise");
            }}
          >
            START A SIMILAR BUILD
            <IconArrow className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

