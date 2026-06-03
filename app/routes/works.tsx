import { useEffect, useState } from "react";
import { type MetaFunction, Link } from "react-router";
import { AsciiBackground } from "~/components/AsciiBackground";
import { Clock } from "~/components/Clock";
import { ThemeToggle } from "~/components/ThemeToggle";
import "~/styles/works.css";

export const meta: MetaFunction = () => [
  { title: "Humza Khan — Works" },
  {
    name: "description",
    content: "Selected work · AI, finance, infrastructure, and open source.",
  },
  { property: "og:title", content: "Humza Khan — Works" },
  {
    property: "og:description",
    content: "Selected work · AI, finance, infrastructure, and open source.",
  },
  { property: "og:type", content: "website" },
  { property: "og:url", content: "https://humza.io/works" },
  { property: "og:site_name", content: "Humza Khan" },
  { property: "og:image", content: "https://humza.io/og-image.png" },
  { property: "og:image:width", content: "1200" },
  { property: "og:image:height", content: "630" },
  { property: "og:image:alt", content: "Humza Khan" },
  { name: "twitter:card", content: "summary_large_image" },
  { name: "twitter:title", content: "Humza Khan — Works" },
  {
    name: "twitter:description",
    content: "Selected work · AI, finance, infrastructure, and open source.",
  },
  { name: "twitter:site", content: "@0xHumza" },
  { name: "twitter:creator", content: "@0xHumza" },
  { name: "twitter:image", content: "https://humza.io/og-image.png" },
];

// Page-specific interactivity: case study expand/collapse.
// A tile click opens its associated case study panel (max-height accordion).
// Clicking a different tile closes the open one and opens the new one.
// The close (x) button closes without opening another.
// Escape key closes the open case.
// After opening, the panel is scrolled into view after 100ms.
function useCaseStudy() {
  const [openCase, setOpenCase] = useState<string | null>(null);

  function closeCase() {
    setOpenCase(null);
  }

  function toggleCase(id: string) {
    setOpenCase((prev) => (prev === id ? null : id));
  }

  // Scroll into view after animation starts
  useEffect(() => {
    if (!openCase) return;
    const timer = setTimeout(() => {
      const el = document.getElementById("case-" + openCase);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
    return () => clearTimeout(timer);
  }, [openCase]);

  // Escape key handler
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpenCase(null);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  return { openCase, toggleCase, closeCase };
}

export default function Works() {
  const { openCase, toggleCase, closeCase } = useCaseStudy();

  return (
    <div className="works-page">
      <AsciiBackground />
      <div className="content">

        {/* Nav */}
        <nav className="nav">
          <Link className="nav-name" to="/" style={{ textDecoration: "none", color: "var(--ink)" }}>
            humza k<span className="nav-dot">.</span>
          </Link>
          <div className="nav-links">
            <Link to="/">home</Link>
            <Link to="/works" className="active">works</Link>
            <Link to="/resume">resume</Link>
            <Clock />
            <ThemeToggle />
          </div>
        </nav>

        {/* Hero */}
        <section className="hero">
          <p className="eyebrow">— WORKS</p>
          <h1 className="hero-heading">Prominent Works.</h1>
          <p className="hero-subtitle">A closer look at the work linked across the site: the problem each project solved, the approach, and where it landed.</p>
        </section>

        {/* Chapter 01: What Defines Me / Production at Scale */}
        <section className="chapter-section">
          <p className="chapter-eyebrow">— 01 · WHAT DEFINES ME / PRODUCTION AT SCALE</p>
          <div className="tile-grid">

            {/* Tile row: TCA + Lookout */}
            <div className="tile-row">

              {/* Tile: Real-Time Trade Analytics (TCA) */}
              <div
                className="tile"
                data-case="tca"
                onClick={() => toggleCase("tca")}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggleCase("tca"); } }}
              >
                <span className="tile-tag">FINTECH</span>
                <h3 className="tile-name">Real-Time Trade Analytics</h3>
                <p className="tile-desc">Sub-15-minute analytics over every trade on NYSE, NASDAQ, and TSX.</p>
                <div className="tile-stat">
                  <span className="tile-stat-value">400M</span>
                  <span className="tile-stat-label">MESSAGES/DAY</span>
                </div>
                <div className="tile-footer">
                  <span>Revelate · 2019–2022</span>
                  <span className="tile-cta">read <span>→</span></span>
                </div>
              </div>

              {/* Tile: Ingestion Redesign (Lookout) */}
              <div
                className="tile"
                data-case="lookout"
                onClick={() => toggleCase("lookout")}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggleCase("lookout"); } }}
              >
                <span className="tile-tag">INFRASTRUCTURE</span>
                <h3 className="tile-name">Ingestion Redesign</h3>
                <p className="tile-desc">Rebuilt the pipeline feeding the security graph for 12M devices.</p>
                <div className="tile-stat">
                  <span className="tile-stat-value">12M</span>
                  <span className="tile-stat-label">DEVICES</span>
                </div>
                <div className="tile-footer">
                  <span>Lookout · 2022–2024</span>
                  <span className="tile-cta">read <span>→</span></span>
                </div>
              </div>
            </div>

            {/* Case: Real-Time Trade Analytics */}
            <div className={`case${openCase === "tca" ? " open" : ""}`} id="case-tca">
              <button className="case-close" onClick={(e) => { e.stopPropagation(); closeCase(); }} aria-label="Close case study">×</button>
              <div className="case-inner">
                <div className="case-header">
                  <p className="case-eyebrow">— CASE STUDY</p>
                  <h2 className="case-title">Real-Time Trade Analytics</h2>
                  <p className="case-tagline">A streaming analytics engine processing every trade across North America's major exchanges, with results in under fifteen minutes.</p>
                </div>
                <div className="case-grid">
                  <div>
                    <p className="case-cell-label">PROBLEM</p>
                    <p className="case-cell-text">NYSE needed sub-15-minute derivatives analytics at exchange scale. Existing batch jobs delivered insights 30 minutes after market close, too slow to be actionable.</p>
                  </div>
                  <div>
                    <p className="case-cell-label">APPROACH</p>
                    <p className="case-cell-text">Designed Kafka → Kudu → Athena streaming pipeline with circuit-breaker for timed-out queries. Custom React DataTable with real-time filtering and infinite scroll.</p>
                  </div>
                  <div>
                    <p className="case-cell-label">OUTCOME</p>
                    <p className="case-cell-text">Delivery reduced from 30m to 12m. Processing 200–400M trade messages daily. Direct ARR contribution to the Revelate data platform.</p>
                  </div>
                </div>
                <div className="case-section">
                  <p className="case-section-label">— THE DETAIL</p>
                  <div className="case-section-body">
                    <p>The pipeline's hardest constraint wasn't throughput. It was the <strong>circuit-breaker mechanism</strong>. Analytic queries on derivatives data could take anywhere from 200ms to several minutes depending on the time window and complexity. When clients hit endpoints during peak market hours, a single slow query could cascade and starve faster ones.</p>
                    <p>We designed query slots with explicit timeouts; queries that exceeded their budget were terminated and fell back to a smaller pre-computed window. Clients always got a response, even if degraded. This single mechanism saved significant execution costs and was the difference between a system that worked under load and one that didn't.</p>
                    <p>The custom DataTable for CME Group was the second hard part. Real-time filtering and infinite scrolling over tens of thousands of analytics rows, previously only available via REST API. Memory optimization in React was non-trivial at this scale. We ended up with windowed virtualization and aggressive memoization.</p>
                  </div>
                </div>
                <div className="case-section">
                  <p className="case-section-label">— TECH</p>
                  <div className="case-stack">
                    <span className="case-stack-tag">Java</span>
                    <span className="case-stack-tag">Spring Boot</span>
                    <span className="case-stack-tag">Apache Kafka</span>
                    <span className="case-stack-tag">Apache Kudu</span>
                    <span className="case-stack-tag">Apache Spark</span>
                    <span className="case-stack-tag">AWS Athena</span>
                    <span className="case-stack-tag">DataDog</span>
                    <span className="case-stack-tag">React</span>
                    <span className="case-stack-tag">Apache Airflow</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Case: Ingestion Redesign */}
            <div className={`case${openCase === "lookout" ? " open" : ""}`} id="case-lookout">
              <button className="case-close" onClick={(e) => { e.stopPropagation(); closeCase(); }} aria-label="Close case study">×</button>
              <div className="case-inner">
                <div className="case-header">
                  <p className="case-eyebrow">— CASE STUDY</p>
                  <h2 className="case-title">Ingestion Redesign</h2>
                  <p className="case-tagline">Redesigned a major ingestion service handling telemetry from 12 million mobile devices. Automated compliance activities and built DataDog-based observability across critical systems.</p>
                </div>
                <div className="case-grid">
                  <div>
                    <p className="case-cell-label">PROBLEM</p>
                    <p className="case-cell-text">Legacy ingestion service was costly to operate, hard to debug, and compliance work was eating 6–8 hours per engineer per week.</p>
                  </div>
                  <div>
                    <p className="case-cell-label">APPROACH</p>
                    <p className="case-cell-text">Redesign ingestion path, automate compliance workflows, instrument critical systems with DataDog. Aggressive batching, partitioning, smart compute utilization.</p>
                  </div>
                  <div>
                    <p className="case-cell-label">OUTCOME</p>
                    <p className="case-cell-text">$60K USD saved annually. 30% infra cost reduction. 35–45% boost in observability. 55% API latency reduction.</p>
                  </div>
                </div>
                <div className="case-section">
                  <p className="case-section-label">— THE DETAIL</p>
                  <div className="case-section-body">
                    <p>The compliance automation was the highest-leverage piece. Engineers were spending most of a workday each week on cross-channel alert triage, log aggregation for audits, and routine compliance reports. We built integrated tooling that consumed DataDog signals and automatically generated the artifacts these tasks required.</p>
                    <p>The harder, less visible win was <strong>API latency</strong>. We took client-facing latency down by 55% through three concurrent moves: batched requests where independent calls were happening in tight loops, database partitioning to keep hot tables small, and selective denormalization to remove join hot paths. None of these were exotic. The difficulty was sequencing them without breaking production.</p>
                  </div>
                </div>
                <div className="case-section">
                  <p className="case-section-label">— TECH</p>
                  <div className="case-stack">
                    <span className="case-stack-tag">Scala</span>
                    <span className="case-stack-tag">Kafka</span>
                    <span className="case-stack-tag">DataDog</span>
                    <span className="case-stack-tag">AWS</span>
                    <span className="case-stack-tag">Terraform</span>
                    <span className="case-stack-tag">Postgres</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Flagship tile: Sorbet */}
            <div
              className="tile tile-flagship"
              data-case="sorbet"
              onClick={() => toggleCase("sorbet")}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggleCase("sorbet"); } }}
            >
              <div className="tile-flagship-top">
                <span className="tile-tag">FINTECH</span>
                <span className="tile-role-chip">Engineering Lead</span>
              </div>
              <h3 className="tile-name">Crypto-Native Payments</h3>
              <p className="tile-desc">A neobank MVP that let freelancers get paid through a single link, settled on-chain in USDC.</p>
              <div className="tile-stat-row">
                <div className="tile-stat">
                  <span className="tile-stat-value">0→1</span>
                  <span className="tile-stat-label">MVP IN 8 WEEKS</span>
                </div>
              </div>
              <div className="tile-footer">
                <span>Sorbet</span>
                <span className="tile-cta">read <span>→</span></span>
              </div>
            </div>

            {/* Case: Sorbet */}
            <div className={`case${openCase === "sorbet" ? " open" : ""}`} id="case-sorbet">
              <button className="case-close" onClick={(e) => { e.stopPropagation(); closeCase(); }} aria-label="Close case study">×</button>
              <div className="case-inner">
                <div className="case-header">
                  <p className="case-eyebrow">— CASE STUDY</p>
                  <h2 className="case-title">Crypto-Native Payments</h2>
                  <p className="case-tagline">The MVP for Sorbet: a neobank built on crypto rails that let freelancers get paid in a few clicks, settled on-chain in USDC.</p>
                </div>
                <div className="case-grid">
                  <div>
                    <p className="case-cell-label">PROBLEM</p>
                    <p className="case-cell-text">Freelancers were waiting too long to get paid. Traditional cross-border rails were slow and expensive, and there was no simple way to send or receive money in crypto.</p>
                  </div>
                  <div>
                    <p className="case-cell-label">APPROACH</p>
                    <p className="case-cell-text">Built the MVP solo: a payments platform with composable profiles and payment tiers, settling on-chain in USDC so a freelancer could get paid through a single shareable link.</p>
                  </div>
                  <div>
                    <p className="case-cell-label">OUTCOME</p>
                    <p className="case-cell-text">Shipped in 8 weeks. 100 customers at launch, tens of thousands processed, and early inbound from businesses.</p>
                  </div>
                </div>
                <div className="case-section">
                  <p className="case-section-label">— THE DETAIL</p>
                  <div className="case-section-body">
                    <p>The hard part was the payments layer. Underneath a few-clicks experience sat a full neobank running on crypto rails: integrating payment processors and on-chain USDC settlement through Circle, tied together so that getting paid was a single link for the user while the system handled wallets, settlement, and payouts behind it. I designed the composable profile architecture that made it work, where a freelancer's public profile, their payment tiers, and their crypto payout flow were assembled from the same composable building blocks.</p>
                    <p>I led the build end to end. I built the platform solo, then hired and trained the first designer and the first developer and transitioned the codebase and architecture to the team that carried it forward. The product has since evolved into a global payments platform, and I moved on to other opportunities.</p>
                  </div>
                </div>
                <div className="case-section">
                  <p className="case-section-label">— TECH</p>
                  <div className="case-stack">
                    <span className="case-stack-tag">React</span>
                    <span className="case-stack-tag">TypeScript</span>
                    <span className="case-stack-tag">NestJS</span>
                    <span className="case-stack-tag">Stripe</span>
                    <span className="case-stack-tag">Circle (USDC)</span>
                    <span className="case-stack-tag">On-chain settlement</span>
                  </div>
                </div>
                <div className="case-section">
                  <p className="case-section-label">— LINKS</p>
                  <div className="case-links">
                    <a className="project-link" href="https://mysorbet.io" target="_blank" rel="noopener noreferrer">mysorbet.io <span className="ext">↗</span></a>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Chapter 02: Building Now — Verstack + Syndic flagships */}
        <section className="chapter-section">
          <p className="chapter-eyebrow">— 02 · BUILDING NOW</p>
          <div className="tile-grid">

            {/* Flagship tile: Verstack */}
            <div
              className="tile tile-flagship"
              data-case="verstack"
              onClick={() => toggleCase("verstack")}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggleCase("verstack"); } }}
            >
              <div className="tile-flagship-top">
                <span className="tile-tag">AI · FLAGSHIP</span>
                <span className="tile-role-chip">Technical Co-founder</span>
              </div>
              <h3 className="tile-name">Verstack</h3>
              <p className="tile-desc">Reverse ETL for the unstructured data your AI agents can't read yet.</p>
              <div className="tile-stat-row">
                <div className="tile-stat">
                  <span className="tile-stat-value">95%+</span>
                  <span className="tile-stat-label">ACCURACY</span>
                </div>
                <div className="tile-stat">
                  <span className="tile-stat-value">~80%</span>
                  <span className="tile-stat-label">LESS TIME-TO-CONTEXT</span>
                </div>
              </div>
              <div className="tile-footer">
                <span>verstack.ai</span>
                <span className="tile-cta">read <span>→</span></span>
              </div>
            </div>

            {/* Case: Verstack */}
            <div className={`case${openCase === "verstack" ? " open" : ""}`} id="case-verstack">
              <button className="case-close" onClick={(e) => { e.stopPropagation(); closeCase(); }} aria-label="Close case study">×</button>
              <div className="case-inner">
                <div className="case-header">
                  <p className="case-eyebrow">— BUILDING NOW</p>
                  <h2 className="case-title">Verstack</h2>
                  <p className="case-tagline">Unstructured in, structured out. Agent-ready data, delivered reliably at scale.</p>
                </div>
                <div className="case-grid">
                  <div>
                    <p className="case-cell-label">PROBLEM</p>
                    <p className="case-cell-text">AI agents are only as good as the data they can read. Most enterprise data is unstructured and effectively invisible to them.</p>
                  </div>
                  <div>
                    <p className="case-cell-label">APPROACH</p>
                    <p className="case-cell-text">A reverse-ETL platform that turns unstructured sources into structured, agent-ready data through a no-code pipeline builder.</p>
                  </div>
                  <div>
                    <p className="case-cell-label">OUTCOME</p>
                    <p className="case-cell-text">95%+ extraction accuracy and about 80% less time to get usable context into agents. Minutes instead of weeks.</p>
                  </div>
                </div>
                <div className="case-section">
                  <p className="case-section-label">— THE DETAIL</p>
                  <div className="case-section-body">
                    <p>As technical co-founder I lead the platform's engineering end to end. The core bet is that the bottleneck for useful AI is not the model, it is the data pipeline feeding it. Enterprises sit on mountains of unstructured documents that agents cannot consume. Verstack turns unstructured in into structured out, reliably and at scale, with a no-code builder so teams can stand up pipelines without writing extraction logic by hand.</p>
                  </div>
                </div>
                <div className="case-section">
                  <p className="case-section-label">— LINKS</p>
                  <div className="case-links">
                    <a className="project-link" href="https://verstack.ai" target="_blank" rel="noopener noreferrer">verstack.ai <span className="ext">↗</span></a>
                  </div>
                </div>
              </div>
            </div>

            {/* Flagship tile: Syndic */}
            <div
              className="tile tile-flagship"
              data-case="syndic"
              onClick={() => toggleCase("syndic")}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggleCase("syndic"); } }}
            >
              <div className="tile-flagship-top">
                <span className="tile-tag">DEVTOOL · LIVE</span>
                <span className="tile-role-chip">Solo build</span>
              </div>
              <h3 className="tile-name">Syndic</h3>
              <p className="tile-desc">Mobile control plane for AI coding agents, running on the subscriptions you already pay for.</p>
              <div className="tile-footer">
                <span>syndic.dev</span>
                <span className="tile-cta">read <span>→</span></span>
              </div>
            </div>

            {/* Case: Syndic */}
            <div className={`case${openCase === "syndic" ? " open" : ""}`} id="case-syndic">
              <button className="case-close" onClick={(e) => { e.stopPropagation(); closeCase(); }} aria-label="Close case study">×</button>
              <div className="case-inner">
                <div className="case-header">
                  <p className="case-eyebrow">— BUILDING NOW</p>
                  <h2 className="case-title">Syndic</h2>
                  <p className="case-tagline">A mobile-first harness for commanding remote AI coding agent fleets.</p>
                </div>
                <div className="case-grid">
                  <div>
                    <p className="case-cell-label">PROBLEM</p>
                    <p className="case-cell-text">AI coding agents live on the desktop. The moment you step away from your machine, your agent workflow stops.</p>
                  </div>
                  <div>
                    <p className="case-cell-label">APPROACH</p>
                    <p className="case-cell-text">A mobile-first control plane: dispatch tasks from your phone, monitor CLI processes running on a VM, review diffs, and merge PRs, all on the subscriptions you already pay for.</p>
                  </div>
                  <div>
                    <p className="case-cell-label">STATUS</p>
                    <p className="case-cell-text">Live at syndic.dev. Built solo, end to end.</p>
                  </div>
                </div>
                <div className="case-section">
                  <p className="case-section-label">— THE DETAIL</p>
                  <div className="case-section-body">
                    <p>Syndic moves the agent workflow off the desktop. You dispatch a task from your phone, it runs CLI agent processes on a VM, and you monitor progress, review the diff, and merge the PR without opening a laptop. It is self-hosted and runs on your existing agent subscriptions rather than reselling tokens, so you keep your own plans and keys. I built the entire platform solo.</p>
                  </div>
                </div>
                <div className="case-section">
                  <p className="case-section-label">— LINKS</p>
                  <div className="case-links">
                    <a className="project-link" href="https://syndic.dev" target="_blank" rel="noopener noreferrer">syndic.dev <span className="ext">↗</span></a>
                    <a className="project-link" href="https://github.com/humzakhan/syndic" target="_blank" rel="noopener noreferrer">GitHub <span className="ext">↗</span></a>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Chapter 03: What's Next / In Development */}
        <section className="chapter-section">
          <p className="chapter-eyebrow">— 03 · WHAT'S NEXT / IN DEVELOPMENT</p>
          <div className="tile-grid">

            <div className="tile-row">

              {/* Tile: Provenant */}
              <div
                className="tile"
                data-case="provenant"
                onClick={() => toggleCase("provenant")}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggleCase("provenant"); } }}
              >
                <span className="tile-tag">FINTECH · OPEN SOURCE</span>
                <p className="tile-oss-meta">Go · MIT · Open Source</p>
                <h3 className="tile-name">Provenant</h3>
                <p className="tile-desc">Provenance for finance workflows, with evidence you can verify and replay.</p>
                <div className="tile-footer">
                  <span>In development</span>
                  <span className="tile-cta">read <span>→</span></span>
                </div>
              </div>

              {/* Tile: Fauxbooks */}
              <div
                className="tile"
                data-case="fauxbooks"
                onClick={() => toggleCase("fauxbooks")}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggleCase("fauxbooks"); } }}
              >
                <span className="tile-tag">FINTECH · OPEN SOURCE</span>
                <p className="tile-oss-meta">Go · MIT · Open Source</p>
                <h3 className="tile-name">Fauxbooks</h3>
                <p className="tile-desc">Deterministic, reconcilable synthetic double-entry accounting datasets.</p>
                <div className="tile-footer">
                  <span>In development</span>
                  <span className="tile-cta">read <span>→</span></span>
                </div>
              </div>
            </div>

            {/* Case: Provenant */}
            <div className={`case${openCase === "provenant" ? " open" : ""}`} id="case-provenant">
              <button className="case-close" onClick={(e) => { e.stopPropagation(); closeCase(); }} aria-label="Close case study">×</button>
              <div className="case-inner">
                <div className="case-header">
                  <p className="case-eyebrow">— WHAT'S NEXT</p>
                  <h2 className="case-title">Provenant</h2>
                  <p className="case-tagline">A provenance layer for finance workflows: where every output number came from, packaged as evidence you can verify and replay.</p>
                </div>
                <div className="case-grid">
                  <div>
                    <p className="case-cell-label">PROBLEM</p>
                    <p className="case-cell-text">When a finance team releases a number, they need to prove where it came from. Agent and tool pipelines make that provenance easy to lose.</p>
                  </div>
                  <div>
                    <p className="case-cell-label">APPROACH</p>
                    <p className="case-cell-text">An enforcement layer between source files, agent and tool reads, numeric claims, and the final answer. Four guarantees on every read path: non-bypassable exit, fail-closed errors, schema-first validation, and deterministic replay.</p>
                  </div>
                  <div>
                    <p className="case-cell-label">STATUS</p>
                    <p className="case-cell-text">In development. Open source, Go and MIT. Integrates with MCP hosts including Claude Code, Cursor, and Codex CLI.</p>
                  </div>
                </div>
                <div className="case-section">
                  <p className="case-section-label">— THE DETAIL</p>
                  <div className="case-section-body">
                    <p>Provenant is not a logger, a database, a workflow engine, or a complete accounting product. It is the enforcement layer that sits between raw source bytes and the final answer a finance team is willing to release. It records where every output number came from and packages the evidence for verify and replay, enforcing four guarantees across every supported read path: non-bypassable exit, fail-closed errors, schema-first validation, and deterministic replay. It is built for SR 11-7 and FINRA 2026 contexts, where controllers, audit leads, platform engineers, and compliance officers need a verifiable audit chain from raw bytes through to a replayable audit bundle.</p>
                  </div>
                </div>
                <div className="case-section">
                  <p className="case-section-label">— TECH</p>
                  <div className="case-stack">
                    <span className="case-stack-tag">Go</span>
                    <span className="case-stack-tag">MCP</span>
                    <span className="case-stack-tag">Schema validation</span>
                    <span className="case-stack-tag">Deterministic replay</span>
                  </div>
                </div>
                <div className="case-section">
                  <p className="case-section-label">— LINKS</p>
                  <div className="case-links">
                    <a className="project-link" href="https://github.com/humzakhan/provenant" target="_blank" rel="noopener noreferrer">GitHub <span className="ext">↗</span></a>
                  </div>
                </div>
              </div>
            </div>

            {/* Case: Fauxbooks */}
            <div className={`case${openCase === "fauxbooks" ? " open" : ""}`} id="case-fauxbooks">
              <button className="case-close" onClick={(e) => { e.stopPropagation(); closeCase(); }} aria-label="Close case study">×</button>
              <div className="case-inner">
                <div className="case-header">
                  <p className="case-eyebrow">— WHAT'S NEXT</p>
                  <h2 className="case-title">Fauxbooks</h2>
                  <p className="case-tagline">An open-source Go CLI that generates deterministic, reconcilable synthetic double-entry accounting data.</p>
                </div>
                <div className="case-grid">
                  <div>
                    <p className="case-cell-label">PROBLEM</p>
                    <p className="case-cell-text">Testing financial software needs realistic accounting data, but real ledgers are sensitive and hand-built fixtures do not reconcile.</p>
                  </div>
                  <div>
                    <p className="case-cell-label">APPROACH</p>
                    <p className="case-cell-text">Generate a complete, balanced set of financial files from a seeded event stream: general ledger, bank statement, sub-ledgers, and financial reports.</p>
                  </div>
                  <div>
                    <p className="case-cell-label">STATUS</p>
                    <p className="case-cell-text">In development. Open source, Go and MIT.</p>
                  </div>
                </div>
                <div className="case-section">
                  <p className="case-section-label">— THE DETAIL</p>
                  <div className="case-section-body">
                    <p>fbx produces a full set of balanced double-entry accounting files from a single seeded event stream: GL, bank statement, sub-ledgers, and financial reports, all of which reconcile against each other. The key property is determinism: the same seed, bundle, period, and version produce byte-identical output across runs, operating systems, and CPU architectures. That makes it usable as a stable fixture for testing financial pipelines, where you need data that is realistic, reconcilable, and reproducible.</p>
                  </div>
                </div>
                <div className="case-section">
                  <p className="case-section-label">— TECH</p>
                  <div className="case-stack">
                    <span className="case-stack-tag">Go</span>
                    <span className="case-stack-tag">CLI</span>
                    <span className="case-stack-tag">Deterministic generation</span>
                  </div>
                </div>
                <div className="case-section">
                  <p className="case-section-label">— LINKS</p>
                  <div className="case-links">
                    <a className="project-link" href="https://github.com/humzakhan/fauxbooks" target="_blank" rel="noopener noreferrer">GitHub <span className="ext">↗</span></a>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Chapter 04: Historical Work */}
        <section className="chapter-section">
          <p className="chapter-eyebrow">— 04 · HISTORICAL WORK</p>
          <div className="tile-grid">

            <div
              className="tile tile-flagship"
              data-case="blockunion"
              onClick={() => toggleCase("blockunion")}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggleCase("blockunion"); } }}
            >
              <div className="tile-flagship-top">
                <span className="tile-tag">BLOCKCHAIN INFRA</span>
                <span className="tile-role-chip">Contract · 2018</span>
              </div>
              <h3 className="tile-name">BlockUnion Architecture</h3>
              <p className="tile-desc">First-version architecture and platform build for a token-incentivized reputation network.</p>
              <div className="tile-stat-row">
                <div className="tile-stat">
                  <span className="tile-stat-value">0→1</span>
                  <span className="tile-stat-label">STARTUP MVP</span>
                </div>
                <div className="tile-stat">
                  <span className="tile-stat-value">&lt;1K</span>
                  <span className="tile-stat-label">BETA USERS</span>
                </div>
              </div>
              <div className="tile-footer">
                <span>Ethereum · Web3 · AWS</span>
                <span className="tile-cta">read <span>→</span></span>
              </div>
            </div>

            <div className={`case${openCase === "blockunion" ? " open" : ""}`} id="case-blockunion">
              <button className="case-close" onClick={(e) => { e.stopPropagation(); closeCase(); }} aria-label="Close case study">×</button>
              <div className="case-inner">
                <div className="case-header">
                  <p className="case-eyebrow">— HISTORICAL WORK</p>
                  <h2 className="case-title">BlockUnion Architecture</h2>
                  <p className="case-tagline">A 2018 contract build for a decentralized reputation platform that rewarded blockchain-service reviews with platform tokens.</p>
                </div>
                <div className="case-grid">
                  <div>
                    <p className="case-cell-label">PROBLEM</p>
                    <p className="case-cell-text">Blockchain services had weak reputation signals. Users had little reason to share credible reviews, so discovery and trust stayed thin.</p>
                  </div>
                  <div>
                    <p className="case-cell-label">APPROACH</p>
                    <p className="case-cell-text">Designed and built the first version end to end: platform architecture, AWS infrastructure, Web3 integration, token-reward flows, REST APIs, and database-backed application services.</p>
                  </div>
                  <div>
                    <p className="case-cell-label">OUTCOME</p>
                    <p className="case-cell-text">Launched a public beta with fewer than 1,000 users, on-chain token activity, deployed contracts, and cloud-hosted availability around the 99.9% target.</p>
                  </div>
                </div>
                <div className="case-section">
                  <p className="case-section-label">— THE DETAIL</p>
                  <div className="case-section-body">
                    <p>BlockUnion was early full-stack blockchain infrastructure work. The premise was simple: if someone shared an experience with a decentralized service anywhere on the web, the platform could turn that contribution into a reputation signal and reward it with tokens that had monetary value.</p>
                    <p>I worked as a contract engineer on the first startup version and owned the architecture from scratch: choosing the technical stack, designing for elastic cloud capacity, connecting the application layer to Ethereum/Web3 flows, and translating business requirements into a production-ready technical system.</p>
                  </div>
                </div>
                <div className="case-section">
                  <p className="case-section-label">— TECH</p>
                  <div className="case-stack">
                    <span className="case-stack-tag">Ethereum</span>
                    <span className="case-stack-tag">Web3</span>
                    <span className="case-stack-tag">AWS</span>
                    <span className="case-stack-tag">REST APIs</span>
                    <span className="case-stack-tag">SQL</span>
                    <span className="case-stack-tag">C#</span>
                    <span className="case-stack-tag">Smart contracts</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Chapter 05: Open Source */}
        <section className="chapter-section chapter-oss">
          <p className="chapter-eyebrow">— 05 · OPEN SOURCE</p>
          <p className="oss-intro">Experiments and tools I build in public.</p>
          <div className="oss-list">
            <a className="oss-row" href="https://github.com/humzakhan/lumi" target="_blank" rel="noopener noreferrer">
              <span className="oss-row-name">lumi</span>
              <span className="oss-row-desc">Visually learn any concept.</span>
              <span className="oss-row-arrow">↗</span>
            </a>
            <a className="oss-row" href="https://github.com/humzakhan/repomap" target="_blank" rel="noopener noreferrer">
              <span className="oss-row-name">repomap</span>
              <span className="oss-row-desc">Navigate any GitHub repo visually and cut onboarding time.</span>
              <span className="oss-row-arrow">↗</span>
            </a>
            <a className="oss-row" href="https://github.com/humzakhan/recap" target="_blank" rel="noopener noreferrer">
              <span className="oss-row-name">recap</span>
              <span className="oss-row-desc">Extract targeted insights from any content on the web.</span>
              <span className="oss-row-arrow">↗</span>
            </a>
            <a className="oss-row" href="https://github.com/humzakhan/stellar" target="_blank" rel="noopener noreferrer">
              <span className="oss-row-name">stellar</span>
              <span className="oss-row-desc">Explore 120K catalogued stars in a gamified way.</span>
              <span className="oss-row-arrow">↗</span>
            </a>
            <a className="oss-row" href="https://github.com/humzakhan/hone" target="_blank" rel="noopener noreferrer">
              <span className="oss-row-name">hone</span>
              <span className="oss-row-desc">Harden project specs through adversarial critique loops.</span>
              <span className="oss-row-arrow">↗</span>
            </a>
          </div>
          <a className="oss-github-link" href="https://github.com/humzakhan" target="_blank" rel="noopener noreferrer">
            More on GitHub <span className="ext">↗</span>
          </a>
        </section>

        <footer className="footer">
          <span className="footer-copyright">© 2026 <a href="mailto:humzakhanagain@outlook.com">Humza Khan</a></span>
        </footer>

      </div>
    </div>
  );
}
