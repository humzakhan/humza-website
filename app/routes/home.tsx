import type { MetaFunction } from "react-router";
import { AsciiBackground } from "~/components/AsciiBackground";
import { Nav } from "~/components/Nav";
import { Hero } from "~/components/Hero";
import { ScrollCue } from "~/components/ScrollCue";
import { BuildingSection } from "~/components/BuildingSection";
import { WorksSection } from "~/components/WorksSection";
import { Contact } from "~/components/Contact";
import { Footer } from "~/components/Footer";

export const meta: MetaFunction = () => [
  { title: "Humza Khan — Enterprise AI Engineer" },
  {
    name: "description",
    content:
      "Building enterprise AI at the intersection of finance and productivity. Production systems shipped at CME Group, Revelate, and Lookout.",
  },
];

export default function Home() {
  return (
    <>
      <AsciiBackground />
      <div className="content">
        <Nav />
        <Hero />
        <ScrollCue />
        <BuildingSection />
        <WorksSection />
        <Contact />
        <Footer />
      </div>
    </>
  );
}
