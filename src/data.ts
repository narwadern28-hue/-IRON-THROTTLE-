export type Build = {
  id: string;
  name: string;
  type: string;
  description: string;
  long: string;
  image: string;
  spec: string;
  finish: string;
};

export const builds: Build[] = [
  {
    id: "blackout",
    name: "BLACKOUT",
    type: "Street Tracker",
    description: "A stripped-back street tracker in obsidian. Light, precise, built for city sprints.",
    long: "BLACKOUT is a study in restraint. Matte graphite bodywork, a flat tracker seat and a short black exhaust keep the silhouette honest. Geometry is set for rapid direction changes and the kind of urban riding that rewards a machine that feels smaller than it looks.",
    image: "/images/blackout.jpg",
    spec: "Street geometry · Short exhaust · Tracker bars",
    finish: "Obsidian Black",
  },
  {
    id: "desert-900",
    name: "DESERT 900",
    type: "Adventure Scrambler",
    description: "High pipes, knobby rubber and a tank shaped for distance. Built for the spaces between towns.",
    long: "DESERT 900 sits between trail and tarmac. A taller stance, high-mount exhaust and a desert-sand finish give it the character of a machine that would rather take the unsealed road. Designed as a long-day companion rather than a showpiece.",
    image: "/images/desert900.jpg",
    spec: "High pipes · Off-road rubber · Distance tank",
    finish: "Desert Sand",
  },
  {
    id: "iron-runner",
    name: "IRON RUNNER",
    type: "Café Racer",
    description: "Clip-ons, rear-sets and a stretched tank. A contemporary café machine for the open A-road.",
    long: "IRON RUNNER takes the café brief seriously: dropped bars, a humped seat and a British racing green tank with a fine metallic edge. The riding position is committed. The detailing is quiet. It is built to be ridden at pace on empty roads.",
    image: "/images/ironrunner.jpg",
    spec: "Clubman bars · Rear-sets · Café cowl",
    finish: "British Racing Green",
  },
  {
    id: "redline",
    name: "REDLINE",
    type: "Performance Custom",
    description: "Tighter geometry, a sharper note and a finish that does not ask for attention.",
    long: "REDLINE is the performance brief. A sport tank, black alloy wheels and a stainless system sit on a chassis set up for accuracy. Deep burgundy paint catches light only when it wants to. Built for riders who care more about how a motorcycle works than how loudly it announces itself.",
    image: "/images/redline.jpg",
    spec: "Sport tank · Alloy wheels · Performance seat",
    finish: "Deep Burgundy",
  },
  {
    id: "outback",
    name: "OUTBACK",
    type: "Scrambler",
    description: "Wide bars, an honest dual seat and a stance for the long way round.",
    long: "OUTBACK is the scrambler as a travelling tool. Olive and black paint, a high pipe and a hand-stitched seat are there for days that start on tarmac and end on dirt. Nothing ornamental. Everything considered.",
    image: "/images/outback.jpg",
    spec: "Wide bars · Dual seat · High-mount exhaust",
    finish: "Olive & Black",
  },
  {
    id: "nightshift",
    name: "NIGHTSHIFT",
    type: "Urban Custom",
    description: "Compact, dark and quietly detailed. An urban custom for late rides through the city.",
    long: "NIGHTSHIFT is an urban custom in obsidian and silver. Flat bars, black performance wheels and LED lighting keep the profile low and contemporary. Designed for night work: short hops, long boulevards, and the architecture of the city after hours.",
    image: "/images/nightshift.jpg",
    spec: "Flat bars · LED lighting · Black performance wheels",
    finish: "Obsidian & Silver",
  },
];

export const navItems = [
  { id: "home", label: "HOME" },
  { id: "builds", label: "BUILDS" },
  { id: "customise", label: "CUSTOMISE" },
  { id: "process", label: "PROCESS" },
  { id: "workshop", label: "WORKSHOP" },
  { id: "about", label: "ABOUT" },
  { id: "contact", label: "CONTACT" },
];

export type Option = { id: string; label: string; price: number };

export const configOptions = {
  base: [
    { id: "tracker", label: "Street Tracker", price: 18500 },
    { id: "scrambler", label: "Scrambler", price: 19800 },
    { id: "cafe", label: "Café Racer", price: 21200 },
    { id: "bobber", label: "Bobber", price: 17900 },
  ],
  tank: [
    { id: "classic", label: "Classic Tank", price: 0 },
    { id: "sport", label: "Sport Tank", price: 450 },
    { id: "custom", label: "Custom Tank", price: 890 },
  ],
  paint: [
    { id: "obsidian", label: "Obsidian Black", price: 0, color: "#1c1c1e" },
    { id: "green", label: "British Racing Green", price: 650, color: "#1c3d2c" },
    { id: "sand", label: "Desert Sand", price: 550, color: "#c4a574" },
    { id: "silver", label: "Metallic Silver", price: 720, color: "#c5c8cc" },
    { id: "burgundy", label: "Deep Burgundy", price: 800, color: "#5a1c28" },
  ],
  seat: [
    { id: "leather", label: "Classic Leather", price: 0 },
    { id: "tracker", label: "Flat Tracker", price: 320 },
    { id: "cafe", label: "Café Racer", price: 480 },
    { id: "performance", label: "Performance", price: 560 },
  ],
  wheels: [
    { id: "spoked", label: "Spoked", price: 0 },
    { id: "alloy", label: "Alloy", price: 780 },
    { id: "black", label: "Black Performance", price: 1100 },
  ],
  exhaust: [
    { id: "short", label: "Short Black", price: 0 },
    { id: "stainless", label: "Stainless", price: 640 },
    { id: "high", label: "High-Mount", price: 720 },
  ],
  handlebars: [
    { id: "tracker", label: "Tracker", price: 0 },
    { id: "clubman", label: "Clubman", price: 280 },
    { id: "flat", label: "Flat Bar", price: 180 },
  ],
  lighting: [
    { id: "classic", label: "Classic Round", price: 0 },
    { id: "led", label: "LED Performance", price: 420 },
  ],
} as const;

export type ConfigState = {
  base: string;
  tank: string;
  paint: string;
  seat: string;
  wheels: string;
  exhaust: string;
  handlebars: string;
  lighting: string;
};

export const defaultConfig: ConfigState = {
  base: "tracker",
  tank: "classic",
  paint: "obsidian",
  seat: "leather",
  wheels: "spoked",
  exhaust: "short",
  handlebars: "tracker",
  lighting: "classic",
};

export const processSteps = [
  {
    n: "01",
    title: "DISCOVER",
    text: "Tell us about your riding style, inspiration and vision.",
  },
  {
    n: "02",
    title: "DESIGN",
    text: "We develop the concept and define the details.",
  },
  {
    n: "03",
    title: "BUILD",
    text: "Our workshop brings the motorcycle to life.",
  },
  {
    n: "04",
    title: "DELIVER",
    text: "Your finished machine is prepared for its next chapter.",
  },
];

export const craftFeatures = [
  {
    n: "01",
    title: "CRAFTSMANSHIP",
    text: "Built with attention to every detail.",
  },
  {
    n: "02",
    title: "ENGINEERING",
    text: "Designed around performance, reliability and rideability.",
  },
  {
    n: "03",
    title: "INDIVIDUALITY",
    text: "No two builds need to be the same.",
  },
];

export const demoQuotes = [
  {
    quote: "The process felt considered from the first conversation to the last bolt. A machine that actually fits the way I ride.",
    attribution: "Demo testimonial",
    role: "Street Tracker brief",
  },
  {
    quote: "Quiet confidence in the finish. Nothing shouting. Everything sitting exactly where it should.",
    attribution: "Demo testimonial",
    role: "Café Racer brief",
  },
  {
    quote: "It reads as a complete motorcycle, not a collection of parts. That is harder than it looks.",
    attribution: "Demo testimonial",
    role: "Scrambler brief",
  },
];

export type GalleryItem = {
  src: string;
  alt: string;
  caption: string;
  tall?: boolean;
};

export const gallery: GalleryItem[] = [
  { src: "/images/hero.jpg", alt: "Custom cafe racer in studio light", caption: "Studio · Side profile" },
  { src: "/images/engine.jpg", alt: "Motorcycle engine close-up", caption: "Engine · Detail", tall: true },
  { src: "/images/workshop.jpg", alt: "Custom motorcycle workshop", caption: "Workshop · Night" },
  { src: "/images/leather.jpg", alt: "Handcrafted leather motorcycle seat", caption: "Leather · Hand stitching", tall: true },
  { src: "/images/blackout.jpg", alt: "Blackout street tracker", caption: "BLACKOUT · Street tracker" },
  {
    src: "https://images.pexels.com/photos/5313374/pexels-photo-5313374.jpeg?auto=compress&cs=tinysrgb&w=1400",
    alt: "Chrome motorcycle engine detail",
    caption: "Metal · Close-up",
    tall: true,
  },
  {
    src: "https://images.pexels.com/photos/3688260/pexels-photo-3688260.jpeg?auto=compress&cs=tinysrgb&w=1400",
    alt: "Welder at work in industrial workshop",
    caption: "Fabrication · Welding",
  },
  {
    src: "https://images.pexels.com/photos/11890955/pexels-photo-11890955.jpeg?auto=compress&cs=tinysrgb&w=1400",
    alt: "Mechanic working on a motorcycle engine",
    caption: "Build · Engine work",
  },
  { src: "/images/ironrunner.jpg", alt: "Iron Runner cafe racer", caption: "IRON RUNNER · Café racer" },
  {
    src: "https://images.pexels.com/photos/5803398/pexels-photo-5803398.jpeg?auto=compress&cs=tinysrgb&w=1400",
    alt: "Motorcycle exhaust close-up",
    caption: "Exhaust · Detail",
    tall: true,
  },
  {
    src: "https://images.pexels.com/photos/11808212/pexels-photo-11808212.jpeg?auto=compress&cs=tinysrgb&w=1400",
    alt: "Vintage leather motorcycle seat",
    caption: "Seat · Craft",
  },
  { src: "/images/redline.jpg", alt: "Redline performance custom", caption: "REDLINE · Performance" },
  {
    src: "https://images.pexels.com/photos/9924837/pexels-photo-9924837.jpeg?auto=compress&cs=tinysrgb&w=1600",
    alt: "Cafe racer parked on an empty road",
    caption: "Road · Profile",
  },
  {
    src: "https://images.pexels.com/photos/11890964/pexels-photo-11890964.jpeg?auto=compress&cs=tinysrgb&w=1400",
    alt: "Mechanic repairing a motorcycle in a garage",
    caption: "Workshop · Hands",
  },
  { src: "/images/nightshift.jpg", alt: "Nightshift urban custom motorcycle", caption: "NIGHTSHIFT · Urban" },
  {
    src: "https://images.pexels.com/photos/105018/pexels-photo-105018.jpeg?auto=compress&cs=tinysrgb&w=1400",
    alt: "Cafe racer in a workshop",
    caption: "Workshop · Machine",
  },
];

export const workshopTiles = [
  {
    src: "/images/workshop.jpg",
    title: "THE FLOOR",
    text: "Where frames are jigged, engines are dressed and machines take their final stance.",
  },
  {
    src: "https://images.pexels.com/photos/9305076/pexels-photo-9305076.jpeg?auto=compress&cs=tinysrgb&w=1400",
    title: "METAL",
    text: "Fabrication, tig work and the slow business of making steel look inevitable.",
  },
  {
    src: "/images/engine.jpg",
    title: "THE HEART",
    text: "Engines built, balanced and finished as part of the motorcycle — not an afterthought.",
  },
  {
    src: "/images/leather.jpg",
    title: "HIDE & PAINT",
    text: "Seats stitched by hand. Tanks painted, flatted and brought to a quiet lustre.",
  },
];
