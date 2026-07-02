import { type MetaFunction, Link } from "react-router";
import { AsciiBackground } from "~/components/AsciiBackground";
import { Clock } from "~/components/Clock";
import { ThemeToggle } from "~/components/ThemeToggle";
import "~/styles/writings.css";

type WritingItem = {
  title: string;
  why: string;
  href: string;
};

const verstackArticles: WritingItem[] = [
  {
    title: "Turning Unstructured Data Into Agent-Ready Context",
    why: "To explain the data bottleneck behind useful enterprise agents.",
    href: "https://verstack.ai",
  },
  {
    title: "Reverse ETL for AI Workflows",
    why: "Because models only become useful when the surrounding system can feed them reliable context.",
    href: "https://verstack.ai",
  },
  {
    title: "No-Code Pipelines Without Losing Engineering Rigor",
    why: "To separate accessible product surfaces from fragile implementation shortcuts.",
    href: "https://verstack.ai",
  },
  {
    title: "Evaluating Extraction Quality in Production",
    why: "Accuracy claims matter most when the documents are messy, long, and real.",
    href: "https://verstack.ai",
  },
  {
    title: "What Enterprise AI Actually Needs",
    why: "Most teams do not need a demo; they need dependable systems around the model.",
    href: "https://verstack.ai",
  },
];

const xPosts: WritingItem[] = [
  {
    title: "Agents need memory, but more importantly they need taste.",
    why: "A short note on why context alone does not make an agent useful.",
    href: "https://x.com/0xHumza",
  },
  {
    title: "The best AI products feel less like chatbots and more like leverage.",
    why: "To separate product usefulness from model novelty.",
    href: "https://x.com/0xHumza",
  },
  {
    title: "Most automation fails at the handoff.",
    why: "The messy edge between human intent and system execution is usually where the product lives.",
    href: "https://x.com/0xHumza",
  },
  {
    title: "Infrastructure is product when AI is involved.",
    why: "The interface only works if the underlying system can reliably know, act, and recover.",
    href: "https://x.com/0xHumza",
  },
  {
    title: "The future is not agents everywhere. It is better command surfaces.",
    why: "A sharper frame for how I think about supervising AI work.",
    href: "https://x.com/0xHumza",
  },
];

export const meta: MetaFunction = () => [
  { title: "Humza Khan — Writings" },
  {
    name: "description",
    content: "A static first version of writings from Verstack and X.",
  },
  { property: "og:title", content: "Humza Khan — Writings" },
  {
    property: "og:description",
    content: "Notes from building AI systems, agent infrastructure, and products.",
  },
  { property: "og:type", content: "website" },
  { property: "og:url", content: "https://humza.io/writings" },
  { property: "og:site_name", content: "Humza Khan" },
  { property: "og:image", content: "https://humza.io/og-image.png" },
  { property: "og:image:width", content: "1200" },
  { property: "og:image:height", content: "630" },
  { property: "og:image:alt", content: "Humza Khan" },
  { name: "twitter:card", content: "summary_large_image" },
  { name: "twitter:title", content: "Humza Khan — Writings" },
  {
    name: "twitter:description",
    content: "Notes from building AI systems, agent infrastructure, and products.",
  },
  { name: "twitter:site", content: "@0xHumza" },
  { name: "twitter:creator", content: "@0xHumza" },
  { name: "twitter:image", content: "https://humza.io/og-image.png" },
];

function WritingSection({
  label,
  description,
  items,
  variant,
  viewAllHref,
}: {
  label: string;
  description: string;
  items: WritingItem[];
  variant: "articles" | "posts";
  viewAllHref: string;
}) {
  return (
    <section className={`writing-section writing-section--${variant}`}>
      <div className="writing-section-head">
        <div>
          <p className="writing-section-kicker">— {label}</p>
          <p className="writing-section-desc">{description}</p>
        </div>
        <a className="writing-view-all" href={viewAllHref} target="_blank" rel="noreferrer">
          View all <span aria-hidden="true">↗</span>
        </a>
      </div>

      <div className="writing-list">
        {items.map((item, index) => (
          <a className="writing-row" href={item.href} target="_blank" rel="noreferrer" key={item.title}>
            <span className="writing-index">{String(index + 1).padStart(2, "0")}</span>
            <span className="writing-copy">
              <span className="writing-title">{item.title}</span>
              <span className="writing-why">Why I wrote this: {item.why}</span>
            </span>
            <span className="writing-arrow">↗</span>
          </a>
        ))}
      </div>
    </section>
  );
}

export default function Writings() {
  return (
    <div className="writings-page">
      <AsciiBackground />
      <div className="content">
        <nav className="nav">
          <Link className="nav-name" to="/" style={{ textDecoration: "none", color: "var(--ink)" }}>
            humza k<span className="nav-dot">.</span>
          </Link>
          <div className="nav-links">
            <Link to="/">home</Link>
            <Link to="/works">works</Link>
            <Link to="/resume">resume</Link>
            <Clock />
            <ThemeToggle />
          </div>
        </nav>

        <section className="hero writings-hero">
          <h1 className="hero-heading">Writings</h1>
          <p className="hero-text">
            Notes from building <strong>AI systems</strong>, agent infrastructure, and the occasional thing I had to write down before it disappeared.
          </p>
        </section>

        <WritingSection
          label="VERSTACK ESSAYS"
          description="Longer-form notes on data infrastructure, agents, and product engineering."
          items={verstackArticles}
          variant="articles"
          viewAllHref="https://verstack.ai"
        />

        <WritingSection
          label="X POSTS"
          description="Shorter thoughts, product notes, and working observations."
          items={xPosts}
          variant="posts"
          viewAllHref="https://x.com/0xHumza"
        />

        <section className="writing-status" aria-label="Source status">
          <span>SOURCE STATUS</span>
          <span>STATIC PREVIEW</span>
          <span>AUTOMATION LATER</span>
        </section>
      </div>
    </div>
  );
}
