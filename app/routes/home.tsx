import type { MetaFunction } from "react-router";
import { AsciiBackground } from "~/components/AsciiBackground";
import { Nav } from "~/components/Nav";
import { Hero } from "~/components/Hero";
import { ScrollCue } from "~/components/ScrollCue";
import { BuildingSection } from "~/components/BuildingSection";
import { WorksSection } from "~/components/WorksSection";
import { InterestsSection } from "~/components/InterestsSection";
import { Contact } from "~/components/Contact";
import { Footer } from "~/components/Footer";

export const meta: MetaFunction = () => [
  { title: "Humza Khan — Senior AI Product Engineer" },
  {
    name: "description",
    content:
      "Senior AI product engineer and physics enthusiast. I build AI agents, ship production systems at scale, and regularly lose arguments to my own chatbots.",
  },
  { property: "og:title", content: "Humza Khan — Senior AI Product Engineer" },
  {
    property: "og:description",
    content:
      "Senior AI product engineer and physics enthusiast. I build AI agents, ship production systems at scale, and regularly lose arguments to my own chatbots.",
  },
  { property: "og:type", content: "website" },
  { property: "og:url", content: "https://humza.io/" },
  { property: "og:site_name", content: "Humza Khan" },
  { property: "og:image", content: "https://humza.io/og-image.png" },
  { property: "og:image:width", content: "1200" },
  { property: "og:image:height", content: "630" },
  { property: "og:image:alt", content: "Humza Khan" },
  { name: "twitter:card", content: "summary_large_image" },
  { name: "twitter:title", content: "Humza Khan — Senior AI Product Engineer" },
  {
    name: "twitter:description",
    content:
      "Senior AI product engineer and physics enthusiast. I build AI agents, ship production systems at scale, and regularly lose arguments to my own chatbots.",
  },
  { name: "twitter:site", content: "@0xHumza" },
  { name: "twitter:creator", content: "@0xHumza" },
  { name: "twitter:image", content: "https://humza.io/og-image.png" },
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
        <InterestsSection />
        <WorksSection />
        <Contact />
        <Footer />
      </div>
    </>
  );
}
