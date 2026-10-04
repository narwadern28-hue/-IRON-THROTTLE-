import { useMemo, useState } from "react";
import {
  configOptions,
  defaultConfig,
  type ConfigState,
} from "../data";
import MotorcycleSVG from "./MotorcycleSVG";
import Reveal from "./Reveal";
import { useCountUp } from "../hooks";
import { IconArrow } from "./Icons";
import { cn } from "../utils/cn";

type Props = {
  onRequest: (summary: string, price: number, config: ConfigState) => void;
};

const categories: { key: keyof ConfigState; label: string }[] = [
  { key: "base", label: "BASE BIKE" },
  { key: "tank", label: "TANK" },
  { key: "paint", label: "PAINT" },
  { key: "seat", label: "SEAT" },
  { key: "wheels", label: "WHEELS" },
  { key: "exhaust", label: "EXHAUST" },
  { key: "handlebars", label: "HANDLEBARS" },
  { key: "lighting", label: "LIGHTING" },
];

function labelOf(key: keyof ConfigState, id: string) {
  const list = configOptions[key] as readonly { id: string; label: string }[];
  return list.find((o) => o.id === id)?.label ?? id;
}

export default function Configurator({ onRequest }: Props) {
  const [config, setConfig] = useState<ConfigState>(defaultConfig);
  const [switching, setSwitching] = useState(false);
  const [activeCat, setActiveCat] = useState<keyof ConfigState>("base");

  const price = useMemo(() => {
    return (Object.keys(config) as (keyof ConfigState)[]).reduce((sum, key) => {
      const list = configOptions[key] as readonly { id: string; price: number }[];
      return sum + (list.find((o) => o.id === config[key])?.price ?? 0);
    }, 0);
  }, [config]);

  const animated = useCountUp(price, true, 700);

  const update = (key: keyof ConfigState, id: string) => {
    if (config[key] === id) return;
    setSwitching(true);
    setConfig((c) => ({ ...c, [key]: id }));
    window.setTimeout(() => setSwitching(false), 420);
  };

  const summary = `${labelOf("base", config.base)} · ${labelOf("paint", config.paint)} · ${labelOf("seat", config.seat)} · ${labelOf("wheels", config.wheels)} · ${labelOf("exhaust", config.exhaust)}`;

  const formatted = `£${animated.toLocaleString("en-GB")}`;

  return (
    <section id="customise" className="relative py-24 sm:py-32 border-t border-white/5">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <Reveal>
          <p className="font-display text-[11px] tracking-[0.4em] text-copper">CONFIGURATOR</p>
          <h2 className="mt-4 font-display text-4xl sm:text-5xl md:text-6xl tracking-[0.06em]">
            BUILD YOUR MACHINE.
          </h2>
          <p className="mt-5 max-w-xl font-serif text-lg text-muted">
            Start with the foundation. Make it yours.
          </p>
          <p className="mt-3 text-[11px] tracking-[0.18em] uppercase text-warm/40 font-display">
            Demonstration configurator — estimated prices are illustrative only.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-8">
          <div>
            <div className="bike-stage relative overflow-hidden border border-white/8 min-h-[280px] sm:min-h-[380px] lg:min-h-[460px] px-2 sm:px-6 pt-6 pb-2">
              <div className="absolute top-5 left-5 font-display text-[10px] tracking-[0.32em] text-warm/40">
                LIVE PREVIEW
              </div>
              <MotorcycleSVG config={config} switching={switching} />
            </div>

            <div className="mt-6 flex gap-2 overflow-x-auto pb-2 no-scrollbar">
              {categories.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setActiveCat(cat.key)}
                  className={cn(
                    "shrink-0 px-4 py-2 font-display text-[11px] tracking-[0.22em] border",
                    activeCat === cat.key
                      ? "border-copper text-copper-light bg-copper/10"
                      : "border-white/10 text-warm/55 hover:border-white/25"
                  )}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="mt-5 border border-white/8 p-5 sm:p-6">
              <div className="flex items-center justify-between gap-4">
                <p className="font-display text-[11px] tracking-[0.28em] text-copper">{categories.find((c) => c.key === activeCat)?.label}</p>
                <p className="text-xs text-warm/40">{labelOf(activeCat, config[activeCat])}</p>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {activeCat === "paint"
                  ? configOptions.paint.map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => update("paint", opt.id)}
                        className={cn("flex items-center gap-3 option-chip px-3 py-2", config.paint === opt.id && "is-active")}
                      >
                        <span
                          className={cn("swatch", config.paint === opt.id && "is-active")}
                          style={{ background: opt.color }}
                        />
                        <span className="font-display text-[11px] tracking-[0.16em]">{opt.label}</span>
                      </button>
                    ))
                  : (configOptions[activeCat] as readonly { id: string; label: string; price: number }[]).map(
                      (opt) => (
                        <button
                          key={opt.id}
                          onClick={() => update(activeCat, opt.id)}
                          className={cn("option-chip px-4 py-2.5 font-display text-[11px] tracking-[0.16em]", config[activeCat] === opt.id && "is-active")}
                        >
                          {opt.label}
                          {opt.price > 0 && (
                            <span className="ml-2 text-warm/35">+£{opt.price.toLocaleString("en-GB")}</span>
                          )}
                        </button>
                      )
                    )}
              </div>
            </div>
          </div>

          <aside className="xl:sticky xl:top-28 h-fit border border-white/10 bg-[#0e0e11] p-6 sm:p-7">
            <p className="font-display text-[11px] tracking-[0.32em] text-copper">YOUR BUILD</p>
            <div className="mt-6 space-y-4">
              {(
                [
                  ["Base", "base"],
                  ["Paint", "paint"],
                  ["Seat", "seat"],
                  ["Wheels", "wheels"],
                  ["Exhaust", "exhaust"],
                ] as const
              ).map(([label, key]) => (
                <div key={key} className="flex items-end justify-between gap-4 border-b border-white/8 pb-3">
                  <span className="text-[11px] tracking-[0.2em] uppercase text-warm/40 font-display">{label}</span>
                  <span className="text-sm text-warm text-right">{labelOf(key, config[key])}</span>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <p className="font-display text-[11px] tracking-[0.22em] text-warm/40">ESTIMATED BUILD</p>
              <p className="mt-2 font-display text-4xl tracking-[0.04em] text-copper-light">{formatted}</p>
              <p className="mt-2 text-[11px] text-warm/35 leading-relaxed">
                Illustrative figure for this demonstration only. Not a quotation.
              </p>
            </div>
            <button
              className="btn-primary w-full mt-8"
              onClick={() => onRequest(summary, price, config)}
            >
              REQUEST THIS BUILD
              <IconArrow className="h-4 w-4" />
            </button>
          </aside>
        </div>
      </div>
    </section>
  );
}
