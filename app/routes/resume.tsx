import { type MetaFunction, Link } from "react-router";
import { AsciiBackground } from "~/components/AsciiBackground";
import { Clock } from "~/components/Clock";
import { ThemeToggle } from "~/components/ThemeToggle";
import "~/styles/resume.css";

export const meta: MetaFunction = () => [
  { title: "Humza Khan — Resume" },
  {
    name: "description",
    content: "Resume · AI Product Engineer · agent infrastructure, distributed systems at scale.",
  },
  { property: "og:title", content: "Humza Khan — Resume" },
  {
    property: "og:description",
    content: "Resume · AI Product Engineer · agent infrastructure, distributed systems at scale.",
  },
  { property: "og:type", content: "website" },
  { property: "og:url", content: "https://humza.io/resume" },
  { property: "og:site_name", content: "Humza Khan" },
  { property: "og:image", content: "https://humza.io/og-image.png" },
  { property: "og:image:width", content: "1200" },
  { property: "og:image:height", content: "630" },
  { property: "og:image:alt", content: "Humza Khan" },
  { name: "twitter:card", content: "summary_large_image" },
  { name: "twitter:title", content: "Humza Khan — Resume" },
  {
    name: "twitter:description",
    content: "Resume · AI Product Engineer · agent infrastructure, distributed systems at scale.",
  },
  { name: "twitter:site", content: "@0xHumza" },
  { name: "twitter:creator", content: "@0xHumza" },
  { name: "twitter:image", content: "https://humza.io/og-image.png" },
];

// The source <script> has one page-specific click handler beyond ascii/theme/clock:
// the download-link `href="#" download`. This is a PDF download placeholder that
// in browser context would trigger window.print() or navigate to a PDF file.
// We wire it as an onClick that calls window.print() — a real event handler (not
// rendered logic), so it is SSR-safe: the function only runs in the browser on click.
function handleDownload(e: React.MouseEvent<HTMLAnchorElement>) {
  e.preventDefault();
  if (typeof window !== "undefined") {
    window.print();
  }
}

export default function Resume() {
  return (
    <div className="resume-page">
      <AsciiBackground />
      <div className="content">

        {/* Nav — ported faithfully from source; active class on résumé */}
        <nav className="nav">
          <Link
            className="nav-name"
            to="/"
            style={{ textDecoration: "none", color: "var(--ink)" }}
          >
            humza k<span className="nav-dot">.</span>
          </Link>
          <div className="nav-links">
            <Link to="/">home</Link>
            <Link to="/works">works</Link>
            <Link to="/resume" className="active">resume</Link>
            {/* Clock already renders its own nav-clock + dot-blink — do NOT wrap */}
            <Clock />
            <ThemeToggle />
          </div>
        </nav>

        {/* Hero */}
        <section className="hero">
          <p className="eyebrow">— RESUME</p>
          <h1 className="hero-heading">AI Product Engineer</h1>
          <a className="download-link" href="#" onClick={handleDownload}>
            ↓ DOWNLOAD PDF
          </a>
        </section>

        {/* Two-column resume grid */}
        <div className="resume-grid">

          {/* Sidebar */}
          <aside className="sidebar">

            <div className="sidebar-section">
              <p className="sidebar-label">— CONTACT</p>
              <ul className="sidebar-list">
                <li><span className="dot"></span>Montréal, QC</li>
                <li><span className="dot"></span><a className="side-link" href="mailto:hello@humza.io">hello@humza.io</a></li>
                <li><span className="dot"></span><a className="side-link" href="#" target="_blank" rel="noopener noreferrer">linkedin <span className="arr">→</span></a></li>
                <li><span className="dot"></span><a className="side-link" href="https://github.com/humzakhan" target="_blank" rel="noopener noreferrer">github <span className="arr">→</span></a></li>
              </ul>
            </div>

            <div className="sidebar-section">
              <p className="sidebar-label">— LANGUAGES</p>
              <ul className="sidebar-list">
                <li><span className="dot"></span>English — Fluent</li>
                <li><span className="dot"></span>French — Basic</li>
                <li><span className="dot"></span>Urdu — Native</li>
              </ul>
            </div>

            <div className="sidebar-section">
              <p className="sidebar-label">— RECOGNITION</p>
              <ul className="sidebar-list recognition-list">
                <li><span className="diamond">◆</span>AWS Certified Solutions Architect — Associate</li>
                <li><span className="diamond">◆</span>Y Combinator Startup School — Batch &#39;18</li>
                <li><span className="diamond">◆</span>Occasional writer on Medium</li>
              </ul>
            </div>

            <div className="sidebar-section">
              <p className="sidebar-label">— AVAILABLE FOR</p>
              <ul className="sidebar-list">
                <li><span className="dot"></span>Consulting / Advisory</li>
                <li><span className="dot"></span>Full-time roles</li>
              </ul>
            </div>

          </aside>

          {/* Main content */}
          <main className="main">

            <section className="section">
              <p className="section-label">— INTRODUCTION</p>
              <p className="intro-text">
                I&#39;m an AI product engineer who builds agent infrastructure from 0 to 1. Eight years in distributed systems taught me to ship for scale: financial data platforms, real-time pipelines, ingestion across millions of devices.
              </p>
              <p className="intro-text">
                Now I focus on the tooling and provenance that production AI agents depend on. I lead with the why, work backwards into architecture, and turn messy, ambiguous problems into shipped products.
              </p>
            </section>

            <section className="section">
              <p className="section-label">— HOW I WORK WITH AI</p>
              <p className="ai-intro">Two harnesses, each role routed to the model that fits <span>(Claude / Codex)</span></p>
              <dl className="ai-spec">
                <div className="ai-row">
                  <dt>Planning</dt>
                  <dd>Opus 4.8 / GPT-5.5 (high thinking)</dd>
                </div>
                <div className="ai-row">
                  <dt>Building</dt>
                  <dd>Sonnet 4.6 / GPT-5.4 (high)</dd>
                </div>
                <div className="ai-row">
                  <dt>Review</dt>
                  <dd>subagents across mixed models</dd>
                </div>
                <div className="ai-row">
                  <dt>Mechanical</dt>
                  <dd>Haiku 4.5 / GPT-5.4-mini (medium)</dd>
                </div>
                <div className="ai-row">
                  <dt>Orchestration</dt>
                  <dd>
                    <ul className="ai-sublist">
                      <li>mobile: <a className="project-link" href="https://syndic.dev" target="_blank" rel="noopener noreferrer">syndic <span className="ext">↗</span></a></li>
                      <li>desktop: <a className="project-link" href="https://superset.sh" target="_blank" rel="noopener noreferrer">superset.sh <span className="ext">↗</span></a>, <a className="project-link" href="https://cmux.com" target="_blank" rel="noopener noreferrer">cmux <span className="ext">↗</span></a> <span className="primary-tag">(primary)</span></li>
                    </ul>
                  </dd>
                </div>
                <div className="ai-row">
                  <dt>Evals</dt>
                  <dd>Promptfoo + DeepEval · LLM-as-judge</dd>
                </div>
              </dl>
            </section>

            <section className="section">
              <p className="section-label">— BUILDING NOW</p>

              <article className="job">
                <h3 className="job-title">
                  <a
                    className="job-title-link"
                    href="https://verstack.ai"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Verstack <span className="ext">↗</span>
                  </a>
                </h3>
                <p className="job-meta job-meta-lead">
                  <span className="org">Technical Co-founder</span> · Leads engineering end-to-end
                </p>
                <ul className="job-bullets">
                  <li>Reverse ETL for unstructured data: unstructured in, structured out at scale.</li>
                  <li>No-code pipeline builder lets anyone stand up a production data pipeline in <strong>minutes instead of weeks</strong>, no data engineer required.</li>
                  <li>Delivers structured output at <strong>95%+ accuracy</strong>, cutting the time to get usable context into AI agents by <strong>~80%</strong>.</li>
                </ul>
              </article>

            </section>

            <section className="section">
              <p className="section-label">— ALSO BUILDING</p>
              <ul className="project-list">
                <li>
                  <a className="project-link" href="https://syndic.dev" target="_blank" rel="noopener noreferrer">Syndic <span className="ext">↗</span></a> — mobile control plane for AI coding agents; self-hosted, runs on your existing subscriptions.
                </li>
                <li>
                  <a className="project-link" href="#" target="_blank" rel="noopener noreferrer">Provenant <span className="ext">↗</span></a> — provenance and audit chains for long-running financial agents.
                </li>
                <li>
                  <a className="project-link" href="#" target="_blank" rel="noopener noreferrer">Fauxbooks <span className="ext">↗</span></a> — reconcilable synthetic financial datasets at scale.
                </li>
              </ul>
              <p className="project-more">
                <a href="https://github.com/humzakhan" target="_blank" rel="noopener noreferrer">More projects on GitHub →</a>
              </p>
            </section>

            <section className="section no-print">
              <p className="section-label">— TECH STACK</p>

              <dl className="ai-spec">
                <div className="ai-row">
                  <dt>Current</dt>
                  <dd className="stack-line">Go&nbsp;<span className="sep">·</span> TypeScript&nbsp;<span className="sep">·</span> Python&nbsp;<span className="sep">·</span> Postgres&nbsp;<span className="sep">·</span> pgvector&nbsp;<span className="sep">·</span> React&nbsp;<span className="sep">·</span> Next.js&nbsp;<span className="sep">·</span> Tailwind</dd>
                </div>
                <div className="ai-row">
                  <dt>Experienced</dt>
                  <dd className="stack-line">Java&nbsp;<span className="sep">·</span> Scala&nbsp;<span className="sep">·</span> Kafka&nbsp;<span className="sep">·</span> Spring&nbsp;Boot&nbsp;<span className="sep">·</span> ElasticSearch&nbsp;<span className="sep">·</span> GraphQL&nbsp;<span className="sep">·</span> AWS&nbsp;<span className="sep">·</span> Terraform&nbsp;<span className="sep">·</span> Docker&nbsp;<span className="sep">·</span> Redis&nbsp;<span className="sep">·</span> Airflow&nbsp;<span className="sep">·</span> Kudu</dd>
                </div>
              </dl>
            </section>

            <section className="section">
              <p className="section-label">— PROFESSIONAL EXPERIENCE</p>

              <article className="job">
                <h3 className="job-title">Senior Software Engineer</h3>
                <p className="job-meta">
                  <a className="org" href="https://www.lookout.com/" target="_blank" rel="noopener noreferrer">Lookout Inc <span className="ext">↗</span></a>
                  <span className="sep">·</span>
                  Aug 2022 — 2024
                  <span className="sep">·</span>
                  2y
                </p>
                <ul className="job-bullets">
                  <li>Redesigned the core ingestion service, cutting <strong>$60K/yr</strong> in operating costs while sustaining data from <strong>~12M devices</strong>.</li>
                  <li>Automated compliance workflows, returning <strong>6–8 engineering hours/week</strong> per person to product work.</li>
                  <li>Cut client-facing API latency <strong>55%</strong> (batched requests, DB partitioning) and infrastructure spend <strong>30%</strong> through smarter compute use.</li>
                  <li>Stood up DataDog observability, lifting system visibility <strong>35–45%</strong> with cross-channel alerting.</li>
                </ul>
              </article>

              <article className="job">
                <h3 className="job-title">Full Stack Developer</h3>
                <p className="job-meta">
                  <a className="org" href="https://revelate.co/" target="_blank" rel="noopener noreferrer">Revelate <span className="ext">↗</span></a>
                  <span className="sep">·</span>
                  Mar 2019 — Jul 2022
                  <span className="sep">·</span>
                  3y 5m
                </p>
                <ul className="job-bullets">
                  <li>Built and scaled a real-time trade-analytics engine processing <strong>200–400M messages/day</strong> across NYSE, NASDAQ, and TSX.</li>
                  <li>Cut metrics delivery from <strong>30m to 12m</strong> by reworking the data store and orchestration (Airflow, Athena, Kudu) into a <strong>T-15min</strong> pipeline.</li>
                  <li>Drove <strong>ARR</strong> by shipping a custom real-time DataTable — filtering and infinite scroll — for CME Group.</li>
                  <li>Protected query-engine cost with a <strong>circuit-breaker</strong> mechanism.</li>
                </ul>
              </article>

              <article className="job">
                <h3 className="job-title">Principal Consultant</h3>
                <p className="job-meta">
                  <a className="org" href="https://www.upwork.com/freelancers/~01da283dbe40c60c70" target="_blank" rel="noopener noreferrer">Self-Employed <span className="ext">↗</span></a>
                  <span className="sep">·</span>
                  May 2016 — 2021
                  <span className="sep">·</span>
                  5y
                </p>
                <ul className="job-bullets">
                  <li>Drove a SaaS MVP to launch as the linchpin engineer, stretching across backend, infrastructure, frontend, and product strategy to hit every deadline. The client called it <strong>&#34;the sole reason it was delivered successfully.&#34;</strong></li>
                  <li>Took a UK telecom leader&#39;s new fibre-optic product from concept to MVP in <strong>record time</strong>, owning architecture and build end-to-end on an aggressive timeline.</li>
                  <li>Turned ambiguous requirements into execution-ready architectures, delivered ahead of deadline; one client noted the work was <strong>&#34;completed prior to the expected end date with the highest quality of work.&#34;</strong></li>
                  <li>Earned a <strong>100% five-star track record</strong> across every engagement, consistently rated by clients as accountable, reliable, and committed to quality.</li>
                  <li>Brought finance and cybersecurity depth to high-stakes data platforms: <strong>petabyte-scale</strong> data monetization and Transaction Cost Analytics for institutional traders, plus a real-time engine ingesting <strong>500M+ trade messages/day</strong>.</li>
                  <li><a className="bullet-link" href="https://www.upwork.com/freelancers/~01da283dbe40c60c70" target="_blank" rel="noopener noreferrer">See real partner reviews on Upwork →</a></li>
                </ul>
              </article>

              <article className="job">
                <h3 className="job-title">Full Stack Web Developer</h3>
                <p className="job-meta">
                  <span className="org org--na" data-tip="website not available">Muballigh Travels</span>
                  <span className="sep">·</span>
                  Nov 2016 — Jan 2018
                  <span className="sep">·</span>
                  1y 3m
                </p>
                <ul className="job-bullets">
                  <li>Digitized core manual operations with custom web tooling, replacing slow manual workflows.</li>
                  <li>Built RESTful APIs (Node.js, ASP.NET Web API) and a ReactJS client on top of them.</li>
                </ul>
              </article>

              <article className="job">
                <h3 className="job-title">Intern Web Developer</h3>
                <p className="job-meta">
                  <span className="org org--na" data-tip="website not available">Geneve Travel &amp; Tours</span>
                  <span className="sep">·</span>
                  May 2015 — Aug 2016
                  <span className="sep">·</span>
                  1y 4m
                </p>
                <ul className="job-bullets">
                  <li>Shipped responsive front-ends and back-end services from client requirements.</li>
                  <li>Refactored the CMS UX to lift user engagement.</li>
                </ul>
              </article>

            </section>

            <section className="section">
              <p className="section-label">— REFERENCES</p>
              <ul className="project-list">
                <li><a className="project-link" href="https://www.upwork.com/freelancers/~01da283dbe40c60c70" target="_blank" rel="noopener noreferrer">Real client reviews on Upwork <span className="ext">↗</span></a></li>
                <li>More references available on request from past employers.</li>
              </ul>
            </section>

          </main>

        </div>

      </div>
    </div>
  );
}
