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
  { title: "Humza Khan — Product Engineer" },
  {
    name: "description",
    content:
      "Product Engineer based in Montréal, working at the intersection of AI and finance.",
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
