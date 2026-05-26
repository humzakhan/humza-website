import { useEffect, useState } from "react";
import type { MetaFunction } from "react-router";
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
];

// Page-specific interactivity: case study expand/collapse.
// A tile click opens its associated case study panel (max-height accordion).
// Clicking a different tile closes the open one and opens the new one.
// The close (×) button closes without opening another.
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

        {/* Nav — ported faithfully from source with active class on works */}
        <nav className="nav">
          <a className="nav-name" href="/" style={{ textDecoration: "none", color: "var(--ink)" }}>
            humza khan
          </a>
          <div className="nav-links">
            <a href="/">home</a>
            <a href="/works" className="active">works</a>
            <a href="/resume">résumé</a>
            <span className="nav-clock">
              <span className="dot-blink" />
              <Clock />
            </span>
            <ThemeToggle />
          </div>
        </nav>

        {/* Hero */}
        <section className="hero">
          <p className="eyebrow">— WORKS</p>
          <h1 className="hero-heading">Prominent Work.</h1>
        </section>

        {/* Featured tile grid */}
        <section className="featured-section">
          <div className="tile-grid" id="tile-grid">

            {/* Row 1 */}
            <div className="tile-row">
              {/* Tile: TCA */}
              <div className="tile" data-case="tca" onClick={() => toggleCase("tca")} role="button" tabIndex={0} onKeyDown={(e) => e.key === "Enter" && toggleCase("tca")}>
                <span className="tile-tag">FINTECH</span>
                <h3 className="tile-name">TCA — Transaction Cost Analytics</h3>
                <p className="tile-desc">Real-time trade analytics engine for NYSE, NASDAQ, TSX.</p>
                <div className="tile-stat">
                  <span className="tile-stat-value">400M</span>
                  <span className="tile-stat-label">MESSAGES/DAY</span>
                </div>
                <div className="tile-footer">
                  <span>Revelate · 2019–2022</span>
                  <span className="tile-cta">read <span>→</span></span>
                </div>
              </div>

              {/* Tile: Lookout */}
              <div className="tile" data-case="lookout" onClick={() => toggleCase("lookout")} role="button" tabIndex={0} onKeyDown={(e) => e.key === "Enter" && toggleCase("lookout")}>
                <span className="tile-tag">INFRASTRUCTURE</span>
                <h3 className="tile-name">Lookout — Ingestion Redesign</h3>
                <p className="tile-desc">Rebuilt mobile ingestion service serving 12 million devices.</p>
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

            {/* Case: TCA */}
            <div className={`case${openCase === "tca" ? " open" : ""}`} id="case-tca">
              <button className="case-close" onClick={(e) => { e.stopPropagation(); closeCase(); }} aria-label="Close case study">×</button>
              <div className="case-inner">
                <div className="case-header">
                  <p className="case-eyebrow">CASE STUDY · FINTECH · 2019–2022</p>
                  <h2 className="case-title">TCA — Transaction Cost Analytics</h2>
                  <p className="case-tagline">Real-time trade analytics engine processing hundreds of millions of trade messages a day across major North American exchanges. Every number on a trading terminal at market close passed through architecture like this.</p>
                </div>
                <div className="case-grid">
                  <div>
                    <p className="case-cell-label">PROBLEM</p>
                    <p className="case-cell-text">NYSE needed sub-15-minute derivatives analytics at exchange scale. Existing batch jobs delivered insights 30 minutes after market close — too slow to be actionable.</p>
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
                    <p>The pipeline's hardest constraint wasn't throughput — it was the <strong>circuit-breaker mechanism</strong>. Analytic queries on derivatives data could take anywhere from 200ms to several minutes depending on the time window and complexity. When clients hit endpoints during peak market hours, a single slow query could cascade and starve faster ones.</p>
                    <p>We designed query slots with explicit timeouts; queries that exceeded their budget were terminated and fell back to a smaller pre-computed window. Clients always got a response, even if degraded. This single mechanism saved significant execution costs and was the difference between a system that worked under load and one that didn't.</p>
                    <p>The custom DataTable for CME Group was the second hard part. Real-time filtering and infinite scrolling over tens of thousands of analytics rows, previously only available via REST API. Memory optimization in React was non-trivial at this scale — we ended up with windowed virtualization and aggressive memoization.</p>
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

            {/* Case: Lookout */}
            <div className={`case${openCase === "lookout" ? " open" : ""}`} id="case-lookout">
              <button className="case-close" onClick={(e) => { e.stopPropagation(); closeCase(); }} aria-label="Close case study">×</button>
              <div className="case-inner">
                <div className="case-header">
                  <p className="case-eyebrow">CASE STUDY · INFRASTRUCTURE · 2022–2024</p>
                  <h2 className="case-title">Lookout — Ingestion Service Redesign</h2>
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
                    <p>The harder, less visible win was <strong>API latency</strong>. We took client-facing latency down by 55% through three concurrent moves: batched requests where independent calls were happening in tight loops, database partitioning to keep hot tables small, and selective denormalization to remove join hot paths. None of these were exotic — the difficulty was sequencing them without breaking production.</p>
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

            {/* Row 2 */}
            <div className="tile-row">
              {/* Tile: AgentPane */}
              <div className="tile" data-case="agentpane" onClick={() => toggleCase("agentpane")} role="button" tabIndex={0} onKeyDown={(e) => e.key === "Enter" && toggleCase("agentpane")}>
                <span className="tile-tag">AI · IN PROGRESS</span>
                <h3 className="tile-name">AgentPane</h3>
                <p className="tile-desc">Local-first observability and coaching for AI coding agents.</p>
                <div className="tile-stat">
                  <span className="tile-stat-value">4</span>
                  <span className="tile-stat-label">HARNESSES</span>
                </div>
                <div className="tile-footer">
                  <span>Edferal · 2025–</span>
                  <span className="tile-cta">read <span>→</span></span>
                </div>
              </div>

              {/* Tile: SkillGraph */}
              <div className="tile" data-case="skillgraph" onClick={() => toggleCase("skillgraph")} role="button" tabIndex={0} onKeyDown={(e) => e.key === "Enter" && toggleCase("skillgraph")}>
                <span className="tile-tag">OPEN SOURCE</span>
                <h3 className="tile-name">SkillGraph</h3>
                <p className="tile-desc">Self-hosted skill registry for AI agents with live updates.</p>
                <div className="tile-stat">
                  <span className="tile-stat-value">Go</span>
                  <span className="tile-stat-label">SELF-HOSTED</span>
                </div>
                <div className="tile-footer">
                  <span>Edferal · 2025–</span>
                  <span className="tile-cta">read <span>→</span></span>
                </div>
              </div>
            </div>

            {/* Case: AgentPane */}
            <div className={`case${openCase === "agentpane" ? " open" : ""}`} id="case-agentpane">
              <button className="case-close" onClick={(e) => { e.stopPropagation(); closeCase(); }} aria-label="Close case study">×</button>
              <div className="case-inner">
                <div className="case-header">
                  <p className="case-eyebrow">CURRENT BUILD · AI · 2025</p>
                  <h2 className="case-title">AgentPane</h2>
                  <p className="case-tagline">A local-first, multi-harness observability tool for AI coding agents. Watches your sessions across Claude Code, Codex, OpenCode, and Kimi — produces prescriptive insights, cost attribution, and pattern-to-config promotions.</p>
                </div>
                <div className="case-grid">
                  <div>
                    <p className="case-cell-label">PROBLEM</p>
                    <p className="case-cell-text">AI coding agents leave no audit trail across harnesses. You can't compare cost, performance, or quality across tools without manual export. Patterns that work get lost.</p>
                  </div>
                  <div>
                    <p className="case-cell-label">APPROACH</p>
                    <p className="case-cell-text">A Go daemon that watches sessions across all major harnesses. Semantic clustering of patterns via ChromaDB. TUI + local web UI + CLI for different workflows.</p>
                  </div>
                  <div>
                    <p className="case-cell-label">STATUS</p>
                    <p className="case-cell-text">In active development. Daemon and TUI shipped. Web UI in progress. Coaching layer next.</p>
                  </div>
                </div>
                <div className="case-section">
                  <p className="case-section-label">— THE THESIS</p>
                  <div className="case-section-body">
                    <p>Most AI agent tooling assumes you live in one harness. Reality is that serious users move between Claude Code for one task, Codex for another, OpenCode for a third. AgentPane is the layer underneath — it sees all of them and learns what works for you specifically.</p>
                    <p>The interesting part isn't the data collection. It's the <strong>pattern-to-config promotion</strong>: when you do something repeatedly that works, AgentPane suggests promoting it to a permanent rule. Your tools learn from your usage instead of from a generic dataset.</p>
                  </div>
                </div>
                <div className="case-section">
                  <p className="case-section-label">— TECH</p>
                  <div className="case-stack">
                    <span className="case-stack-tag">Go</span>
                    <span className="case-stack-tag">Cobra CLI</span>
                    <span className="case-stack-tag">Bubble Tea TUI</span>
                    <span className="case-stack-tag">React + Vite</span>
                    <span className="case-stack-tag">shadcn/ui</span>
                    <span className="case-stack-tag">ChromaDB</span>
                    <span className="case-stack-tag">SQLite</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Case: SkillGraph */}
            <div className={`case${openCase === "skillgraph" ? " open" : ""}`} id="case-skillgraph">
              <button className="case-close" onClick={(e) => { e.stopPropagation(); closeCase(); }} aria-label="Close case study">×</button>
              <div className="case-inner">
                <div className="case-header">
                  <p className="case-eyebrow">OPEN SOURCE · AI INFRA · 2025</p>
                  <h2 className="case-title">SkillGraph</h2>
                  <p className="case-tagline">A self-hosted, open-source skill registry. Agents discover, install, and share capabilities through a Postgres-backed graph with GitHub-based public discovery.</p>
                </div>
                <div className="case-grid">
                  <div>
                    <p className="case-cell-label">PROBLEM</p>
                    <p className="case-cell-text">Every agent platform reinvents skill management. There's no shared registry, no versioning, no provenance — just markdown files duplicated across projects.</p>
                  </div>
                  <div>
                    <p className="case-cell-label">APPROACH</p>
                    <p className="case-cell-text">Postgres-backed graph store with sqlc + atlas migrations. Harness auto-detection. SSE live updates. GitHub-based discovery so the registry is composable from public sources.</p>
                  </div>
                  <div>
                    <p className="case-cell-label">STATUS</p>
                    <p className="case-cell-text">Core docs and architecture finalized. CLI and Next.js frontend in progress. Open-source from day one.</p>
                  </div>
                </div>
                <div className="case-section">
                  <p className="case-section-label">— THE THESIS</p>
                  <div className="case-section-body">
                    <p>Skills are the building blocks of agent capability — but they live in scattered markdown files. SkillGraph treats them as a first-class asset: versioned, discoverable, composable.</p>
                    <p>The bet: self-hosted matters here. Your skills are <strong>your IP</strong> — you shouldn't hand them to a SaaS to use across multiple agent harnesses. SkillGraph runs on your infra, syncs from your GitHub, and exposes a simple API any harness can consume.</p>
                  </div>
                </div>
                <div className="case-section">
                  <p className="case-section-label">— TECH</p>
                  <div className="case-stack">
                    <span className="case-stack-tag">Go</span>
                    <span className="case-stack-tag">chi</span>
                    <span className="case-stack-tag">pgx</span>
                    <span className="case-stack-tag">sqlc</span>
                    <span className="case-stack-tag">atlas</span>
                    <span className="case-stack-tag">Next.js</span>
                    <span className="case-stack-tag">shadcn/ui</span>
                    <span className="case-stack-tag">Postgres</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* More section */}
        <section className="more-section">
          <div className="section-label">
            <span>— MORE</span>
            <span className="section-label-count">07 PROJECTS</span>
          </div>

          <div className="more-list">

            <a className="more-row" href="#">
              <span className="more-row-category">OPEN SOURCE</span>
              <div className="more-row-main">
                <span className="more-row-name">mpp-devtools</span>
                <p className="more-row-blurb">Developer observability toolkit for HTTP 402 / machine payments protocol.</p>
              </div>
              <span className="more-row-meta">
                <span>2025</span>
                <span className="more-row-arrow">→</span>
              </span>
            </a>

            <a className="more-row" href="#">
              <span className="more-row-category">ALGORITHMIC</span>
              <div className="more-row-main">
                <span className="more-row-name">APEX</span>
                <p className="more-row-blurb">Algorithmic crypto trading system for Hyperliquid with dual-engine strategy and AI auditor.</p>
              </div>
              <span className="more-row-meta">
                <span>2025</span>
                <span className="more-row-arrow">→</span>
              </span>
            </a>

            <a className="more-row" href="#">
              <span className="more-row-category">OPEN SOURCE</span>
              <div className="more-row-main">
                <span className="more-row-name">RepoMap</span>
                <p className="more-row-blurb">CLI that maps any codebase into an interactive architecture diagram with LLM-extracted structure.</p>
              </div>
              <span className="more-row-meta">
                <span>2024</span>
                <span className="more-row-arrow">→</span>
              </span>
            </a>

            <a className="more-row" href="#">
              <span className="more-row-category">OPEN SOURCE</span>
              <div className="more-row-main">
                <span className="more-row-name">Recap</span>
                <p className="more-row-blurb">Structured data extraction from URLs, PDFs, video, audio, local files. Multi-LLM, three interfaces.</p>
              </div>
              <span className="more-row-meta">
                <span>2024</span>
                <span className="more-row-arrow">→</span>
              </span>
            </a>

            <a className="more-row" href="#">
              <span className="more-row-category">WEBGL</span>
              <div className="more-row-main">
                <span className="more-row-name">Stellar</span>
                <p className="more-row-blurb">Interactive WebGL star explorer with 120K real stars from the actual stellar catalogue.</p>
              </div>
              <span className="more-row-meta">
                <span>2024</span>
                <span className="more-row-arrow">→</span>
              </span>
            </a>

            <a className="more-row" href="#">
              <span className="more-row-category">OPEN SOURCE</span>
              <div className="more-row-main">
                <span className="more-row-name">Lumi</span>
                <p className="more-row-blurb">Personalized animated learning tool — turns text or video into interactive explanations.</p>
              </div>
              <span className="more-row-meta">
                <span>2024</span>
                <span className="more-row-arrow">→</span>
              </span>
            </a>

            <a className="more-row" href="#">
              <span className="more-row-category">FINTECH</span>
              <div className="more-row-main">
                <span className="more-row-name">Derivatives Data Monetisation</span>
                <p className="more-row-blurb">Web distribution platform for CME Group derivatives data. 55% API latency reduction.</p>
              </div>
              <span className="more-row-meta">
                <span>2022</span>
                <span className="more-row-arrow">→</span>
              </span>
            </a>

            <a className="more-row" href="#">
              <span className="more-row-category">SAAS</span>
              <div className="more-row-main">
                <span className="more-row-name">MTM — Scholarship Matching</span>
                <p className="more-row-blurb">SaaS platform algorithmically matching students with scholarships. YC Startup School Batch '18.</p>
              </div>
              <span className="more-row-meta">
                <span>2019</span>
                <span className="more-row-arrow">→</span>
              </span>
            </a>

          </div>
        </section>

        <footer className="footer">
          <span>humza.io — 2026</span>
          <span><a href="mailto:hello@humza.io">hello@humza.io</a></span>
        </footer>

      </div>
    </div>
  );
}
