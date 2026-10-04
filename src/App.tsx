import { useMemo, useState } from "react";
import type { Build, ConfigState, GalleryItem } from "./data";
import { configOptions, navItems } from "./data";
import { scrollToId, useActiveSection } from "./hooks";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import FeaturedBuilds from "./components/FeaturedBuilds";
import Configurator from "./components/Configurator";
import Process from "./components/Process";
import Workshop from "./components/Workshop";
import Craftsmanship from "./components/Craftsmanship";
import Gallery from "./components/Gallery";
import About from "./components/About";
import Experience from "./components/Experience";
import FinalCTA from "./components/FinalCTA";
import Contact, { type ContactPrefill } from "./components/Contact";
import Footer from "./components/Footer";
import Lightbox from "./components/Lightbox";
import BuildModal from "./components/BuildModal";

export default function App() {
  const ids = useMemo(() => navItems.map((n) => n.id), []);
  const active = useActiveSection(ids);
  const [build, setBuild] = useState<Build | null>(null);
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);
  const [prefill, setPrefill] = useState<ContactPrefill | null>(null);

  const onRequest = (summary: string, price: number, config: ConfigState) => {
    const baseLabel = configOptions.base.find((b) => b.id === config.base)?.label ?? config.base;
    setPrefill({
      base: baseLabel,
      notes: `Demo configurator request — ${summary}. Illustrative estimate £${price.toLocaleString("en-GB")}.`,
    });
    scrollToId("contact");
  };

  return (
    <div className="relative bg-ink text-warm antialiased">
      <div className="noise-overlay" />
      <Navbar active={active} />
      <main>
        <Hero />
        <FeaturedBuilds onOpen={setBuild} />
        <Configurator onRequest={onRequest} />
        <Process />
        <Workshop />
        <Craftsmanship />
        <Gallery onOpen={setLightbox} />
        <About />
        <Experience />
        <FinalCTA />
        <Contact prefill={prefill} />
      </main>
      <Footer />
      <BuildModal build={build} onClose={() => setBuild(null)} />
      <Lightbox item={lightbox} onClose={() => setLightbox(null)} />
    </div>
  );
}
