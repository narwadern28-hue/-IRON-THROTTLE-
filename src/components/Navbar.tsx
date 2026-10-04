import { useEffect, useState } from "react";
import { navItems } from "../data";
import { scrollToId, useScrolled } from "../hooks";
import { IconClose, IconMenu } from "./Icons";
import { cn } from "../utils/cn";

type Props = {
  active: string;
};

export default function Navbar({ active }: Props) {
  const scrolled = useScrolled(40);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    scrollToId(id);
  };

  return (
    <>
      <div className="fixed top-0 inset-x-0 z-[70] h-8 flex items-center justify-center bg-[#14110e] text-[#e8d5bc] text-center text-[10px] sm:text-[11px] tracking-[0.18em] sm:tracking-[0.22em] uppercase px-4 font-display border-b border-white/5 whitespace-nowrap overflow-hidden text-ellipsis">
        Concept project — fictional brand for a portfolio. Not a real company.
      </div>

      <header
        className={cn(
          "fixed top-8 inset-x-0 z-[60] transition-all duration-500",
          scrolled ? "bg-[#09090b]/90 backdrop-blur-md border-b border-white/8" : "bg-transparent"
        )}
      >
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 h-[4.4rem] flex items-center justify-between gap-6">
          <button onClick={() => go("home")} className="flex items-center gap-3 group shrink-0">
            <span className="grid h-9 w-9 place-items-center border border-copper/70 text-[10px] tracking-[0.12em] font-brand text-copper-light">
              I&T
            </span>
            <span className="font-brand text-[12px] sm:text-[13px] tracking-[0.32em] text-warm">
              IRON & THROTTLE
            </span>
          </button>

          <nav className="hidden xl:flex items-center gap-7">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => go(item.id)}
                className={cn("nav-link", active === item.id && "is-active")}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button onClick={() => go("customise")} className="btn-primary !py-2.5 !px-4 text-[0.68rem] hidden sm:inline-flex">
              START YOUR BUILD
            </button>
            <button
              className="xl:hidden h-10 w-10 grid place-items-center text-warm"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
            >
              <IconMenu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      <div
        className={cn(
          "fixed inset-0 z-[80] bg-[#09090b] transition-transform duration-500 xl:hidden",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex items-center justify-between px-6 h-20 mt-8">
          <span className="font-brand tracking-[0.32em] text-sm">IRON & THROTTLE</span>
          <button onClick={() => setOpen(false)} aria-label="Close menu">
            <IconClose className="h-7 w-7" />
          </button>
        </div>
        <nav className="px-8 pt-8 flex flex-col gap-6">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => go(item.id)}
              className="text-left font-display text-3xl tracking-[0.18em] text-warm/90"
            >
              {item.label}
            </button>
          ))}
          <button onClick={() => go("customise")} className="btn-primary mt-6 w-full">
            START YOUR BUILD
          </button>
        </nav>
      </div>
    </>
  );
}
