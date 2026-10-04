import { useMemo } from "react";
import type { ConfigState } from "../data";
import { configOptions } from "../data";

type Props = {
  config: ConfigState;
  switching?: boolean;
};

function hexToRgb(hex: string) {
  const h = hex.replace("#", "");
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  };
}

function mix(hex: string, amt: number, toward = 255) {
  const { r, g, b } = hexToRgb(hex);
  const m = (c: number) => Math.round(c + (toward - c) * amt);
  return `rgb(${m(r)}, ${m(g)}, ${m(b)})`;
}

function shade(hex: string, amt: number) {
  return mix(hex, amt, 0);
}

function Wheel({
  cx,
  cy,
  type,
  id,
  knobby,
}: {
  cx: number;
  cy: number;
  type: string;
  id: string;
  knobby: boolean;
}) {
  const tireOuter = knobby ? 94 : 90;
  const tireInner = knobby ? 70 : 69;
  const rimFill = type === "black" ? "#1a1a1c" : type === "alloy" ? "#9aa0a6" : "#cfc8bc";
  const spokeStroke = type === "black" ? "#3a3a3e" : type === "alloy" ? "#d7dbe0" : "#e8e0d4";
  const hub = type === "black" ? "#111113" : "#d9d2c6";

  const spokes =
    type === "spoked"
      ? Array.from({ length: 16 }, (_, i) => {
          const a = (i / 16) * Math.PI * 2;
          return (
            <line
              key={i}
              x1={cx + Math.cos(a) * 12}
              y1={cy + Math.sin(a) * 12}
              x2={cx + Math.cos(a) * 64}
              y2={cy + Math.sin(a) * 64}
              stroke={spokeStroke}
              strokeWidth="1.15"
            />
          );
        })
      : type === "alloy"
        ? Array.from({ length: 5 }, (_, i) => {
            const a = (i / 5) * Math.PI * 2 - Math.PI / 2;
            const b = a + 0.38;
            const c = a - 0.38;
            const ix = cx + Math.cos(a) * 14;
            const iy = cy + Math.sin(a) * 14;
            const ox1 = cx + Math.cos(c) * 62;
            const oy1 = cy + Math.sin(c) * 62;
            const ox2 = cx + Math.cos(b) * 62;
            const oy2 = cy + Math.sin(b) * 62;
            return <path key={i} d={`M ${ix} ${iy} L ${ox1} ${oy1} L ${ox2} ${oy2} Z`} fill={rimFill} opacity="0.92" />;
          })
        : Array.from({ length: 7 }, (_, i) => {
            const a = (i / 7) * Math.PI * 2 - Math.PI / 2;
            const ix = cx + Math.cos(a) * 10;
            const iy = cy + Math.sin(a) * 10;
            const ox = cx + Math.cos(a) * 63;
            const oy = cy + Math.sin(a) * 63;
            const left = a - 0.18;
            const right = a + 0.18;
            return (
              <path
                key={i}
                d={`M ${ix} ${iy} L ${cx + Math.cos(left) * 60} ${cy + Math.sin(left) * 60} L ${ox} ${oy} L ${cx + Math.cos(right) * 60} ${cy + Math.sin(right) * 60} Z`}
                fill="#2a2a2e"
              />
            );
          });

  return (
    <g>
      {knobby &&
        Array.from({ length: 22 }, (_, i) => {
          const a = (i / 22) * Math.PI * 2;
          return (
            <rect
              key={i}
              x={cx + Math.cos(a) * (tireOuter - 2) - 3}
              y={cy + Math.sin(a) * (tireOuter - 2) - 5}
              width="6"
              height="9"
              rx="1"
              fill="#141416"
              transform={`rotate(${(a * 180) / Math.PI} ${cx + Math.cos(a) * (tireOuter - 2)} ${cy + Math.sin(a) * (tireOuter - 2)})`}
            />
          );
        })}
      <circle cx={cx} cy={cy} r={tireOuter} fill="#0d0d0f" />
      <circle cx={cx} cy={cy} r={tireOuter - 6} fill="#17171a" />
      <circle cx={cx} cy={cy} r={tireInner} fill={rimFill} />
      <circle cx={cx} cy={cy} r={tireInner - 5} fill="#0f0f12" />
      <circle cx={cx} cy={cy} r={64} fill="none" stroke={spokeStroke} strokeWidth="2.2" opacity="0.85" />
      {spokes}
      <circle cx={cx} cy={cy} r={16} fill={hub} />
      <circle cx={cx} cy={cy} r={8} fill="#0c0c0e" />
      <circle cx={cx} cy={cy} r={tireInner - 2} fill="none" stroke={`url(#rimShine-${id})`} strokeWidth="2" opacity="0.55" />
    </g>
  );
}

export default function MotorcycleSVG({ config, switching }: Props) {
  const paint = configOptions.paint.find((p) => p.id === config.paint)?.color ?? "#1c1c1e";
  const highlight = mix(paint, 0.38);
  const mid = mix(paint, 0.12);
  const dark = shade(paint, 0.45);
  const edge = shade(paint, 0.62);

  const leather = config.seat === "performance" ? "#1a1a1c" : config.seat === "cafe" ? "#2a1c16" : "#5c3a28";
  const leatherHi = config.seat === "performance" ? "#2c2c30" : "#7a5340";
  const exhaustFill = config.exhaust === "stainless" ? "#c9cdd2" : config.exhaust === "high" ? "#8a8f95" : "#1c1c1e";
  const exhaustHi = config.exhaust === "short" ? "#3a3a3e" : "#e8ecef";
  const knobby = config.base === "scrambler" || config.base === "tracker";
  const showRearFender = config.base !== "bobber";
  const cafeCowl = config.base === "cafe" || config.seat === "cafe";

  const tankPath = useMemo(() => {
    if (config.tank === "sport") {
      return "M 498 188 C 520 154, 610 148, 692 176 C 718 188, 728 214, 710 236 L 690 252 L 512 256 C 486 250, 478 214, 498 188 Z";
    }
    if (config.tank === "custom") {
      return "M 478 196 C 500 150, 640 142, 718 182 C 738 194, 736 228, 714 246 L 690 258 L 500 262 C 460 254, 452 216, 478 196 Z";
    }
    return "M 492 198 C 508 162, 620 152, 698 188 C 722 202, 720 238, 694 252 L 516 258 C 478 250, 472 220, 492 198 Z";
  }, [config.tank]);

  const seatPath = useMemo(() => {
    if (config.seat === "tracker") {
      return "M 292 214 L 478 208 L 486 232 L 290 236 Z";
    }
    if (config.seat === "cafe") {
      return "M 268 198 C 280 176, 318 186, 360 204 L 486 214 L 488 236 L 352 232 C 310 228, 270 224, 262 214 Z";
    }
    if (config.seat === "performance") {
      return "M 318 214 C 360 200, 430 204, 488 214 L 490 232 L 328 234 Z";
    }
    return "M 300 210 C 340 192, 430 198, 486 216 L 488 238 C 420 242, 340 240, 296 230 Z";
  }, [config.seat]);

  return (
    <svg
      viewBox="0 0 1000 520"
      className={`bike-svg w-full h-auto ${switching ? "is-switching" : ""}`}
      role="img"
      aria-label="Interactive motorcycle preview"
    >
      <defs>
        <linearGradient id="paintGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={highlight} />
          <stop offset="42%" stopColor={mid} />
          <stop offset="100%" stopColor={dark} />
        </linearGradient>
        <linearGradient id="paintShine" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.28" />
          <stop offset="40%" stopColor="#fff" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#000" stopOpacity="0.25" />
        </linearGradient>
        <linearGradient id="metal" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#d7d4ce" />
          <stop offset="50%" stopColor="#8d8a84" />
          <stop offset="100%" stopColor="#3f3d3a" />
        </linearGradient>
        <linearGradient id="chrome" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f3f1ec" />
          <stop offset="45%" stopColor="#9a9893" />
          <stop offset="100%" stopColor="#eceae4" />
        </linearGradient>
        <linearGradient id="frameGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#3a3a3e" />
          <stop offset="100%" stopColor="#121214" />
        </linearGradient>
        <linearGradient id="engineGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#cfcac2" />
          <stop offset="40%" stopColor="#6d6a66" />
          <stop offset="100%" stopColor="#2a2927" />
        </linearGradient>
        <linearGradient id="seatGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={leatherHi} />
          <stop offset="100%" stopColor={leather} />
        </linearGradient>
        <linearGradient id="exhGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={exhaustHi} />
          <stop offset="55%" stopColor={exhaustFill} />
          <stop offset="100%" stopColor="#111" />
        </linearGradient>
        <radialGradient id="ground" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#000" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#000" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="rimShine-r" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="rimShine-f" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <filter id="soft">
          <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#000" floodOpacity="0.35" />
        </filter>
      </defs>

      <ellipse cx="500" cy="478" rx="340" ry="18" fill="url(#ground)" />

      {/* Rear wheel */}
      <Wheel cx={208} cy={352} type={config.wheels} id="r" knobby={knobby} />

      {/* Front wheel */}
      <Wheel cx={792} cy={352} type={config.wheels} id="f" knobby={knobby} />

      {/* Rear fender */}
      {showRearFender && (
        <path
          d="M 118 330 C 118 250, 300 236, 318 320"
          fill="none"
          stroke="url(#paintGrad)"
          strokeWidth={config.base === "cafe" ? 16 : 20}
          strokeLinecap="round"
        />
      )}

      {/* Front fender */}
      {config.base !== "bobber" && (
        <path
          d="M 720 300 C 740 250, 860 250, 870 318"
          fill="none"
          stroke="url(#paintGrad)"
          strokeWidth="16"
          strokeLinecap="round"
        />
      )}

      {/* Swingarm */}
      <path d="M 208 352 L 392 338 L 400 356 L 208 368 Z" fill="url(#frameGrad)" />
      <path d="M 208 352 L 300 300 L 312 312 L 220 360 Z" fill="#1c1c20" opacity="0.9" />

      {/* Frame */}
      <path d="M 392 338 L 530 214 L 546 226 L 410 352 Z" fill="url(#frameGrad)" />
      <path d="M 530 214 L 718 188 L 726 204 L 538 230 Z" fill="url(#frameGrad)" />
      <path d="M 400 350 L 700 348 L 700 362 L 400 364 Z" fill="#1a1a1e" />
      <path d="M 486 230 L 430 348 L 446 350 L 504 232 Z" fill="#222226" />

      {/* Engine */}
      <g filter="url(#soft)">
        <rect x="390" y="292" width="168" height="78" rx="14" fill="url(#engineGrad)" />
        <rect x="402" y="248" width="62" height="58" rx="6" fill="url(#metal)" />
        <rect x="476" y="240" width="66" height="66" rx="6" fill="url(#metal)" />
        {Array.from({ length: 7 }, (_, i) => (
          <line key={`f1-${i}`} x1="408" y1={256 + i * 7} x2="458" y2={256 + i * 7} stroke="#2a2a2c" strokeWidth="1.4" />
        ))}
        {Array.from({ length: 8 }, (_, i) => (
          <line key={`f2-${i}`} x1="482" y1={248 + i * 7} x2="536" y2={248 + i * 7} stroke="#2a2a2c" strokeWidth="1.4" />
        ))}
        <circle cx="430" cy="338" r="22" fill="#1a1a1c" stroke="#cfc8bc" strokeWidth="3" />
        <circle cx="430" cy="338" r="8" fill="#8a8680" />
        <rect x="548" y="318" width="28" height="36" rx="4" fill="url(#chrome)" />
      </g>

      {/* Exhaust */}
      {config.exhaust === "high" ? (
        <g>
          <path
            d="M 548 330 C 620 328, 680 250, 742 168"
            fill="none"
            stroke="url(#exhGrad)"
            strokeWidth="10"
            strokeLinecap="round"
          />
          <rect x="728" y="146" width="86" height="28" rx="12" fill="url(#exhGrad)" transform="rotate(-28 728 146)" />
        </g>
      ) : config.exhaust === "stainless" ? (
        <g>
          <path
            d="M 548 336 C 620 360, 700 372, 820 356"
            fill="none"
            stroke="url(#exhGrad)"
            strokeWidth="11"
            strokeLinecap="round"
          />
          <rect x="790" y="338" width="110" height="26" rx="12" fill="url(#exhGrad)" />
          <rect x="804" y="332" width="70" height="8" rx="2" fill="#9aa0a6" opacity="0.7" />
        </g>
      ) : (
        <g>
          <path
            d="M 548 338 C 600 358, 650 366, 710 360"
            fill="none"
            stroke="url(#exhGrad)"
            strokeWidth="12"
            strokeLinecap="round"
          />
          <rect x="688" y="344" width="64" height="24" rx="10" fill="#141416" stroke="#2a2a2e" />
        </g>
      )}

      {/* Seat */}
      <path d={seatPath} fill="url(#seatGrad)" />
      <path d={seatPath} fill="none" stroke={shade(leather, 0.2)} strokeWidth="1.2" />
      {config.seat === "leather" && (
        <path d="M 330 214 Q 390 204, 460 220" fill="none" stroke="#3a2418" strokeWidth="1.1" opacity="0.5" />
      )}
      {cafeCowl && config.seat !== "tracker" && (
        <path d="M 250 188 C 258 168, 292 172, 318 196 L 310 214 C 286 200, 260 196, 250 188 Z" fill="url(#paintGrad)" />
      )}

      {/* Tank */}
      <g>
        <path d={tankPath} fill="url(#paintGrad)" />
        <path d={tankPath} fill="url(#paintShine)" opacity="0.55" />
        <path d={tankPath} fill="none" stroke={edge} strokeWidth="1.4" />
        {config.tank === "custom" && (
          <path d="M 520 176 C 590 160, 660 168, 700 196" fill="none" stroke={highlight} strokeWidth="1.6" opacity="0.55" />
        )}
        <ellipse cx={config.tank === "sport" ? 620 : 610} cy="176" rx="16" ry="8" fill="url(#chrome)" />
        <rect x={config.tank === "sport" ? 614 : 604} y="164" width="12" height="10" rx="2" fill="#1a1a1c" />
      </g>

      {/* Side cover / number plate for tracker */}
      {config.base === "tracker" && (
        <g>
          <rect x="318" y="268" width="52" height="38" rx="3" fill="#f0ebe3" />
          <text x="344" y="292" textAnchor="middle" fontSize="10" fontFamily="Oswald, sans-serif" fill="#1a1a1c">
            09
          </text>
        </g>
      )}

      {/* Forks */}
      <path d="M 724 190 L 778 350 L 792 346 L 740 184 Z" fill="url(#metal)" />
      <path d="M 738 188 L 792 350 L 804 346 L 752 184 Z" fill="url(#chrome)" opacity="0.85" />
      <rect x="716" y="168" width="42" height="28" rx="6" fill="url(#metal)" transform="rotate(-18 716 168)" />

      {/* Handlebars */}
      {config.handlebars === "clubman" ? (
        <g>
          <path d="M 730 176 C 742 176, 768 198, 786 228" fill="none" stroke="#1c1c1e" strokeWidth="7" strokeLinecap="round" />
          <path d="M 720 174 C 700 176, 688 198, 682 220" fill="none" stroke="#1c1c1e" strokeWidth="7" strokeLinecap="round" />
          <circle cx="786" cy="228" r="6" fill="#2a211c" />
          <circle cx="682" cy="220" r="6" fill="#2a211c" />
        </g>
      ) : config.handlebars === "flat" ? (
        <g>
          <path d="M 668 154 L 790 150" fill="none" stroke="#1c1c1e" strokeWidth="7" strokeLinecap="round" />
          <circle cx="668" cy="154" r="6" fill="#2a211c" />
          <circle cx="790" cy="150" r="6" fill="#2a211c" />
        </g>
      ) : (
        <g>
          <path d="M 730 170 C 748 128, 790 118, 808 146" fill="none" stroke="#1c1c1e" strokeWidth="7" strokeLinecap="round" />
          <path d="M 722 170 C 700 128, 662 122, 648 150" fill="none" stroke="#1c1c1e" strokeWidth="7" strokeLinecap="round" />
          <circle cx="808" cy="146" r="6" fill="#2a211c" />
          <circle cx="648" cy="150" r="6" fill="#2a211c" />
        </g>
      )}

      {/* Headlight */}
      {config.lighting === "led" ? (
        <g>
          <rect x="812" y="196" width="46" height="28" rx="6" fill="#1a1a1c" stroke="#c17f4a" strokeWidth="1.2" />
          <rect x="818" y="204" width="34" height="6" rx="2" fill="#e8f0ff" opacity="0.9" />
          <rect x="818" y="214" width="22" height="4" rx="1" fill="#c17f4a" opacity="0.8" />
        </g>
      ) : (
        <g>
          <circle cx="834" cy="214" r="22" fill="url(#chrome)" />
          <circle cx="834" cy="214" r="16" fill="#f3ead4" />
          <circle cx="828" cy="208" r="6" fill="#fff" opacity="0.55" />
        </g>
      )}

      {/* Tail light */}
      <rect
        x={showRearFender ? 112 : 250}
        y={showRearFender ? 318 : 210}
        width="16"
        height="10"
        rx="2"
        fill="#8a1c1c"
      />

      {/* Foot pegs */}
      <rect x={config.base === "cafe" ? 520 : 430} y="368" width="28" height="6" rx="2" fill="#cfc8bc" />

      {/* Brand plate */}
      <text
        x="500"
        y="508"
        textAnchor="middle"
        fill="#c17f4a"
        fontFamily="Cinzel, serif"
        fontSize="11"
        letterSpacing="4"
        opacity="0.7"
      >
        IRON & THROTTLE  ·  CONCEPT
      </text>
    </svg>
  );
}
