import { scrollToId } from "../hooks";
import { IconFacebook, IconInstagram, IconYouTube } from "./Icons";

const links = [
  { id: "builds", label: "Builds" },
  { id: "customise", label: "Customise" },
  { id: "workshop", label: "Workshop" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/8 pt-16 pb-10">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
          <div>
            <p className="font-brand tracking-[0.36em] text-sm">IRON & THROTTLE</p>
            <p className="mt-3 font-display tracking-[0.28em] text-[11px] text-copper">BUILT FOR THE UNCOMMON.</p>
          </div>
          <nav className="flex flex-wrap gap-x-8 gap-y-3">
            {links.map((l) => (
              <button
                key={l.id}
                onClick={() => scrollToId(l.id)}
                className="font-display text-[11px] tracking-[0.22em] uppercase text-warm/55 hover:text-warm"
              >
                {l.label}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-4 text-warm/50">
            <span className="h-9 w-9 grid place-items-center border border-white/10" aria-hidden>
              <IconInstagram className="h-4 w-4" />
            </span>
            <span className="h-9 w-9 grid place-items-center border border-white/10" aria-hidden>
              <IconYouTube className="h-4 w-4" />
            </span>
            <span className="h-9 w-9 grid place-items-center border border-white/10" aria-hidden>
              <IconFacebook className="h-4 w-4" />
            </span>
          </div>
        </div>
        <div className="mt-14 flex flex-col sm:flex-row justify-between gap-3 text-[11px] tracking-[0.12em] uppercase text-warm/35">
          <p>Demo website · Fictional contact · hello@example.com</p>
          <p>Portfolio concept · Not a real business</p>
        </div>
      </div>
    </footer>
  );
}
