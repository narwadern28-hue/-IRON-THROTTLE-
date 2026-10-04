import { useEffect } from "react";
import type { GalleryItem } from "../data";
import { IconClose } from "./Icons";

type Props = {
  item: GalleryItem | null;
  onClose: () => void;
};

export default function Lightbox({ item, onClose }: Props) {
  useEffect(() => {
    if (!item) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [item, onClose]);

  if (!item) return null;

  return (
    <div className="lightbox-enter fixed inset-0 z-[90] bg-black/92 flex items-center justify-center p-4 sm:p-10" onClick={onClose}>
      <button className="absolute top-6 right-6 text-warm" onClick={onClose} aria-label="Close">
        <IconClose className="h-7 w-7" />
      </button>
      <figure className="max-w-6xl w-full" onClick={(e) => e.stopPropagation()}>
        <img src={item.src} alt={item.alt} className="max-h-[80vh] w-full object-contain" />
        <figcaption className="mt-4 font-display text-[11px] tracking-[0.28em] text-warm/60 text-center">
          {item.caption}
        </figcaption>
      </figure>
    </div>
  );
}
