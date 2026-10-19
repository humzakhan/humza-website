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
import { jsonLd, pageMeta, PERSON_ID, WEBSITE_ID } from "~/lib/seo";

export const meta: MetaFunction = () => [
  ...pageMeta({
    path: "/",
    title: "Humza Khan | Product Engineer in Montréal, Canada",
    description:
      "Humza Khan is a product engineer in Montréal (Montreal), Canada. Founding engineer building AI agents, LLM evals and production systems at scale.",
    type: "profile",
  }),
  jsonLd({
    "@type": "ProfilePage",
    "@id": "https://humza.io/#profile",
    url: "https://humza.io/",
    name: "Humza Khan | Product Engineer in Montréal, Canada",
    isPartOf: { "@id": WEBSITE_ID },
    mainEntity: { "@id": PERSON_ID },
    inLanguage: "en-CA",
    dateModified: "2026-10-19",
  }),
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
