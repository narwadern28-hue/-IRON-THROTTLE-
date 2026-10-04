import { gallery, type GalleryItem } from "../data";
import Reveal from "./Reveal";

type Props = {
  onOpen: (item: GalleryItem) => void;
};

export default function Gallery({ onOpen }: Props) {
  return (
    <section id="gallery" className="relative py-24 sm:py-32 border-t border-white/5">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <Reveal>
          <p className="font-display text-[11px] tracking-[0.4em] text-copper">GALLERY</p>
          <h2 className="mt-4 font-display text-4xl sm:text-5xl tracking-[0.06em]">IN THE DETAILS.</h2>
        </Reveal>
      </div>

      <div className="mt-12 hidden xl:flex gap-3 overflow-x-auto px-8 pb-6 snap-x no-scrollbar">
        {gallery.slice(0, 7).map((item) => (
          <button
            key={"film-" + item.src + item.caption}
            onClick={() => onOpen(item)}
            className="gallery-item relative shrink-0 snap-start w-[420px] h-[520px] overflow-hidden"
          >
            <img src={item.src} alt={item.alt} className="h-full w-full object-cover" />
            <span className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-black/80 to-transparent font-display text-[11px] tracking-[0.22em] text-left">
              {item.caption}
            </span>
          </button>
        ))}
      </div>

      <div className="mt-4 mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 columns-1 sm:columns-2 lg:columns-3 gap-3">
        {gallery.map((item) => (
          <Reveal key={item.caption + item.src} className="mb-3 break-inside-avoid">
            <button onClick={() => onOpen(item)} className="gallery-item relative block w-full overflow-hidden">
              <img
                src={item.src}
                alt={item.alt}
                className={`w-full object-cover ${item.tall ? "aspect-[3/4]" : "aspect-[4/3]"}`}
              />
              <span className="absolute inset-0 bg-black/0 hover:bg-black/25 transition-colors" />
              <span className="absolute bottom-0 inset-x-0 p-4 text-left font-display text-[10px] tracking-[0.22em] bg-gradient-to-t from-black/70 to-transparent">
                {item.caption}
              </span>
            </button>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
