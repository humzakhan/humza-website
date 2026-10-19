import { type MetaFunction, Link } from "react-router";
import { PERSON_ID, WEBSITE_ID, jsonLd, pageMeta } from "~/lib/seo";
import { AsciiBackground } from "~/components/AsciiBackground";
import { Clock } from "~/components/Clock";
import { ThemeToggle } from "~/components/ThemeToggle";
import "~/styles/resume.css";

export const meta: MetaFunction = () => [
  ...pageMeta({
    path: "/resume",
    title: "Humza Khan Resume | Founding & Software Engineer",
    description:
      "Resume of Humza Khan, software engineer in Montréal: founding engineer, ex-Lookout, Revelate and Integral. Distributed systems, fintech data, AI evals.",
    type: "profile",
  }),
  jsonLd({
    "@type": "ProfilePage",
    "@id": "https://humza.io/resume#profile",
    url: "https://humza.io/resume",
    name: "Humza Khan Resume",
    isPartOf: { "@id": WEBSITE_ID },
    mainEntity: { "@id": PERSON_ID },
    dateModified: "2026-10-19",
    inLanguage: "en-CA",
  }),
];

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
            <a href="/blog/">blog</a>
            {/* Clock already renders its own nav-clock + dot-blink — do NOT wrap */}
            <Clock />
            <ThemeToggle />
          </div>
        </nav>

        {/* Hero */}
        <section className="hero">
          <p className="eyebrow">— RESUME</p>
          <h1 className="hero-heading">Product Engineer</h1>
          <a className="download-link" href="/humza-khan-resume.pdf" download>
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
                <li><span className="dot"></span>Montréal, Québec, Canada</li>
                <li><span className="dot"></span><a className="side-link" href="mailto:hello@humza.io">hello@humza.io</a></li>
                <li><span className="dot"></span><a className="side-link" href="https://www.linkedin.com/in/humzakhaan/" target="_blank" rel="noopener noreferrer">linkedin <span className="arr">→</span></a></li>
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
              </ul>
            </div>

            <div className="sidebar-section">
              <p className="sidebar-label">— AVAILABLE FOR</p>
              <ul className="sidebar-list">
                <li><span className="dot"></span>Full-time engineering &amp; research</li>
              </ul>
            </div>

          </aside>

          {/* Main content */}
          <main className="main">

            <section className="section">
              <p className="section-label">— INTRODUCTION</p>
              <p className="intro-text">
                I&#39;m a product engineer and software engineer based in Montréal with a decade of experience across distributed systems, financial data platforms, mobile security, and production AI tooling.
              </p>
              <p className="intro-text">
                I build the whole surface area: user experience, backend architecture, data flows, agent harnesses, and production infrastructure. Lately: agent safeguards, evals, and fine-tuning small open models.
              </p>
            </section>

            <section className="section">
              <p className="section-label">— HOW I WORK WITH AI</p>
              <p className="ai-intro">I mostly use Claude: Opus to plan, Sonnet to build. OpenAI models handle the grunt work. <span>(Claude Code / Codex)</span></p>
              <dl className="ai-spec">
                <div className="ai-row">
                  <dt>Planning</dt>
                  <dd>Opus 5.5</dd>
                </div>
                <div className="ai-row">
                  <dt>Building</dt>
                  <dd>Sonnet 5.5</dd>
                </div>
                <div className="ai-row">
                  <dt>Review</dt>
                  <dd>Claude subagents, run adversarially against the plan</dd>
                </div>
                <div className="ai-row">
                  <dt>Grunt work</dt>
                  <dd>GPT-6.1 Sol / Luna · migrations, renames, boilerplate</dd>
                </div>
                <div className="ai-row">
                  <dt>Orchestration</dt>
                  <dd>
                    <ul className="ai-sublist">
                      <li><a className="project-link" href="https://syndic.dev" target="_blank" rel="noopener noreferrer">syndic <span className="ext">↗</span></a></li>
                      <li>Claude Remote</li>
                      <li>T3 Code</li>
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
                <h2 className="job-title">
                  Stealth startup
                  <span className="job-title-note">(spatial intelligence)</span>
                </h2>
                <p className="job-meta job-meta-lead">
                  <span className="org">Founding Engineer</span> · Apr 2026 — Present · Leads engineering end to end
                </p>
                <ul className="job-bullets">
                  <li>Building spatial intelligence that maps and understands physical spaces, reducing the on-site work it takes to manage them at scale.</li>
                  <li>Designed the pipeline from capture to 3D reconstruction to spatially grounded model outputs, with every finding anchored to where it occurred.</li>
                  <li>Hardened the multimodal model pipeline (video, audio, documents) against prompt injection: untrusted evidence is delimited as data, and any finding without a timestamp, location, and cited basis is suppressed.</li>
                  <li>Ran a pilot eval of a video-language model against human labels, across a prompt matrix with repeated runs and consensus-of-3: raised the share of labelled issues caught from <strong>56%</strong> to <strong>92%</strong>, and isolated a false positive the model repeated in 4 of 5 runs.</li>
                  <li>Turned a multi-day manual workflow into minutes.</li>
                </ul>
              </article>

            </section>

            <section className="section">
              <p className="section-label">— ALSO BUILDING</p>
              <ul className="project-list">
                <li>
                  <a className="project-link" href="https://syndic.dev" target="_blank" rel="noopener noreferrer">Syndic <span className="ext">↗</span></a> · Mobile orchestration for cloud coding agents, goals, templates, and scheduled workflows.
                </li>
                <li>
                  <a className="project-link" href="https://github.com/humzakhan/provenant" target="_blank" rel="noopener noreferrer">Provenant <span className="ext">↗</span></a> · Provenance and audit chains for long-running financial agents, with fail-closed reads and deterministic replay. Open source, Go.
                </li>
                <li>
                  <a className="project-link" href="https://github.com/humzakhan/fauxbooks" target="_blank" rel="noopener noreferrer">Fauxbooks <span className="ext">↗</span></a> · Reconcilable synthetic accounting datasets, byte-identical across platforms, for testing financial pipelines and models. Open source, Go.
                </li>
                <li>
                  <span className="project-name">Fine-Tuned Statement Extraction</span> · Supervised fine-tuning of small open models for bilingual bank statements, with a sandboxed data pipeline. In progress.
                </li>
              </ul>
              <p className="project-more">
                <a href="https://github.com/humzakhan" target="_blank" rel="noopener noreferrer">More projects on GitHub →</a>
              </p>
            </section>

            <section className="section">
              <p className="section-label">— TECH STACK</p>

              <dl className="ai-spec">
                <div className="ai-row">
                  <dt>Current</dt>
                  <dd className="stack-line">Python&nbsp;<span className="sep">·</span> TypeScript&nbsp;<span className="sep">·</span> Go&nbsp;<span className="sep">·</span> Postgres&nbsp;<span className="sep">·</span> pgvector&nbsp;<span className="sep">·</span> React&nbsp;<span className="sep">·</span> Next.js&nbsp;<span className="sep">·</span> Tailwind</dd>
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
                <h2 className="job-title">Senior Software Engineer</h2>
                <p className="job-meta">
                  <span className="org">Integral</span>
                  <span className="sep">·</span>
                  Apr 2024 — Sep 2025
                  <span className="sep">·</span>
                  1y 6m
                </p>
                <ul className="job-bullets">
                  <li>Owned the ingestion pipeline end to end for an AI-powered accounting platform, bringing transactions from crypto data sources into a single, accounting-ready ledger.</li>
                  <li>Built and maintained the source integrations as the product expanded from crypto accounting to accounting for small and medium-sized businesses.</li>
                  <li>Raised ingestion data quality by deduplicating transactions across overlapping sources, so downstream books stayed accurate.</li>
                  <li>Used AI extensively to design, build, and maintain the data pipelines and integrations.</li>
                </ul>
              </article>

              <article className="job">
                <h2 className="job-title">Senior Software Engineer</h2>
                <p className="job-meta">
                  <a className="org" href="https://www.lookout.com/" target="_blank" rel="noopener noreferrer">Lookout Inc <span className="ext">↗</span></a>
                  <span className="sep">·</span>
                  Aug 2022 — Feb 2024
                  <span className="sep">·</span>
                  1y 7m
                </p>
                <ul className="job-bullets">
                  <li>Redesigned the core ingestion service feeding the mobile security graph, cutting <strong>$60K/yr</strong> in operating costs while sustaining data from <strong>~12M devices</strong>.</li>
                  <li>Automated compliance workflows, returning <strong>6–8 engineering hours/week</strong> per person to product work.</li>
                  <li>Cut client-facing API latency <strong>55%</strong> (batched requests, DB partitioning) and infrastructure spend <strong>30%</strong> through smarter compute use.</li>
                  <li>Stood up DataDog observability, lifting system visibility <strong>35–45%</strong> with cross-channel alerting.</li>
                </ul>
              </article>

              <article className="job">
                <h2 className="job-title">Full Stack Engineer</h2>
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
                <h2 className="job-title">Principal Consultant</h2>
                <p className="job-meta">
                  <a className="org" href="https://www.upwork.com/freelancers/~01da283dbe40c60c70" target="_blank" rel="noopener noreferrer">Self-Employed <span className="ext">↗</span></a>
                  <span className="sep">·</span>
                  May 2016 — Feb 2019
                  <span className="sep">·</span>
                  2y 10m
                </p>
                <ul className="job-bullets">
                  <li>Drove a SaaS MVP to launch as the linchpin engineer, stretching across backend, infrastructure, frontend, and product strategy to hit every deadline. The client called it <strong>&#34;the sole reason it was delivered successfully.&#34;</strong></li>
                  <li>Took a UK telecom leader&#39;s new fibre-optic product from concept to MVP in <strong>record time</strong>, owning architecture and build end-to-end on an aggressive timeline.</li>
                  <li>Turned ambiguous requirements into execution-ready architectures, delivered ahead of deadline; one client noted the work was <strong>&#34;completed prior to the expected end date with the highest quality of work.&#34;</strong></li>
                  <li>Earned a <strong>100% five-star track record</strong> across every engagement, consistently rated by clients as accountable, reliable, and committed to quality.</li>
                  <li><a className="bullet-link" href="https://www.upwork.com/freelancers/~01da283dbe40c60c70" target="_blank" rel="noopener noreferrer">See real partner reviews on Upwork →</a></li>
                </ul>
              </article>

              <article className="job">
                <h2 className="job-title">Full Stack Web Developer</h2>
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
                <h2 className="job-title">Intern Web Developer</h2>
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
