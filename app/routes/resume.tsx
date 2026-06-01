import { type MetaFunction, Link } from "react-router";
import { AsciiBackground } from "~/components/AsciiBackground";
import { Clock } from "~/components/Clock";
import { ThemeToggle } from "~/components/ThemeToggle";
import "~/styles/resume.css";

export const meta: MetaFunction = () => [
  { title: "Humza Khan — Resume" },
  {
    name: "description",
    content: "Resume · Product Engineer · AI, finance, distributed systems.",
  },
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
          <h1 className="hero-heading">Product Engineer</h1>
          <p className="hero-sub">
            AI<span>·</span>Finance<span>·</span>Distributed Systems
          </p>
          <a className="download-link" href="#" onClick={handleDownload}>
            ↓ DOWNLOAD ONE-PAGE PDF
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
                <li><span className="dot"></span><a href="mailto:hello@humza.io">hello@humza.io</a></li>
                <li><span className="dot"></span><a href="#">linkedin →</a></li>
                <li><span className="dot"></span><a href="#">github →</a></li>
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
                <li><span className="dot"></span>Consulting</li>
                <li><span className="dot"></span>Advisory</li>
                <li><span className="dot"></span>Full-time roles</li>
              </ul>
            </div>

          </aside>

          {/* Main content */}
          <main className="main">

            <section className="section">
              <p className="section-label">— INTRODUCTION</p>
              <p className="intro-text">
                I&#39;m a Product Engineer working at the intersection of AI and finance. Eight years of distributed systems experience, now applied to building AI-native developer tools and production agent infrastructure.
              </p>
              <p className="intro-text">
                I start from business outcomes — the &#34;why&#34; — and work backwards into architecture. Most useful when the problem is messy, the requirements are unclear, and the team needs someone who can translate between product, finance, and engineering.
              </p>
            </section>

            <section className="section">
              <p className="section-label">— EXPERIENCE</p>

              <article className="job">
                <h3 className="job-title">Senior Software Engineer</h3>
                <p className="job-meta">
                  <span className="org">Lookout Inc</span>
                  <span className="sep">·</span>
                  Aug 2022 — Present
                  <span className="sep">·</span>
                  3y+
                </p>
                <ul className="job-bullets">
                  <li>Core contributor in redesigning major ingestion service, <strong>saving $60K USD/year</strong> in operational costs.</li>
                  <li>Led automation of compliance activities, saving <strong>6–8 development hours per week</strong> per person across the team.</li>
                  <li>Boosted system observability by <strong>35–45%</strong> by developing DataDog-based monitoring infrastructure and integrating cross-channel alerts.</li>
                  <li>Improved client-facing API latency by <strong>−55%</strong> through batched requests, database partitioning, and other methodologies.</li>
                  <li>Reduced infrastructure costs by <strong>30%</strong> by optimizing core services to smartly utilize compute resources.</li>
                  <li>Maintained key logical units of services ingesting company-wide data from <strong>~12 million mobile devices</strong>.</li>
                </ul>
              </article>

              <article className="job">
                <h3 className="job-title">Full Stack Developer</h3>
                <p className="job-meta">
                  <span className="org">Revelate</span>
                  <span className="sep">·</span>
                  Mar 2019 — Jul 2022
                  <span className="sep">·</span>
                  3y 5m
                </p>
                <ul className="job-bullets">
                  <li>Developed and scaled a real-time Transactional Cost Analytics engine for financial markets, processing <strong>200–400M trade messages a day</strong> from NYSE, NASDAQ, TSX.</li>
                  <li>Reduced metrics delivery timeframe from <strong>30m to 12m</strong> by optimizing data store and underlying orchestration jobs.</li>
                  <li>Saved significant execution costs by implementing a <strong>circuit-breaker mechanism</strong> for the query engine.</li>
                  <li>Directly contributed to <strong>ARR</strong> by building a custom DataTable component for CME Group with real-time filtering and infinite scrolling.</li>
                  <li>Built orchestration jobs using Apache Airflow, AWS Athena &amp; Kudu to deliver analytics on a <strong>T-15 mins timeframe</strong>.</li>
                </ul>
              </article>

              <article className="job">
                <h3 className="job-title">Software Consultant</h3>
                <p className="job-meta">
                  <span className="org">Self-Employed</span>
                  <span className="sep">·</span>
                  Feb 2018 — Jan 2019
                  <span className="sep">·</span>
                  1y
                </p>
                <ul className="job-bullets">
                  <li>Helped a startup in Ed-Tech close their seed funding round by delivering technical guidance around their MVP.</li>
                  <li>Built new development teams from scratch with the best practices and tech stacks relevant to the use case.</li>
                  <li>Emphasized brainstorming subtle details and features required to ensure a seamless user experience.</li>
                </ul>
              </article>

              <article className="job">
                <h3 className="job-title">Full Stack Web Developer</h3>
                <p className="job-meta">
                  <span className="org">Muballigh Travels</span>
                  <span className="sep">·</span>
                  Nov 2016 — Jan 2018
                  <span className="sep">·</span>
                  1y 3m
                </p>
                <ul className="job-bullets">
                  <li>Worked closely with the core team to identify areas which could be managed digitally and implemented custom solutions.</li>
                  <li>Created RESTful API endpoints using Node.js and ASP.NET Web API following architectural best practices.</li>
                  <li>Developed a ReactJS web client to consume the API endpoints.</li>
                </ul>
              </article>

              <article className="job">
                <h3 className="job-title">Intern Web Developer</h3>
                <p className="job-meta">
                  <span className="org">Geneve Travel &amp; Tours</span>
                  <span className="sep">·</span>
                  May 2015 — Aug 2016
                  <span className="sep">·</span>
                  1y 4m
                </p>
                <ul className="job-bullets">
                  <li>Worked with the core team to assess client requirements and design digital implementations.</li>
                  <li>Designed responsive front-ends and worked on back-end services as per development requirements.</li>
                  <li>Refactored the UX of the core content management system to enhance user engagement.</li>
                </ul>
              </article>

            </section>

            <section className="section">
              <p className="section-label">— TECH STACK</p>

              <div className="stack-group">
                <p className="stack-group-label">Currently working with</p>
                <div className="stack-tags">
                  <span className="stack-tag">Go</span>
                  <span className="stack-tag">TypeScript</span>
                  <span className="stack-tag">Python</span>
                  <span className="stack-tag">Postgres</span>
                  <span className="stack-tag">React</span>
                  <span className="stack-tag">Next.js</span>
                  <span className="stack-tag">Tailwind</span>
                  <span className="stack-tag">ChromaDB</span>
                  <span className="stack-tag">LLM tooling</span>
                </div>
              </div>

              <div className="stack-group">
                <p className="stack-group-label">Significant experience</p>
                <div className="stack-tags">
                  <span className="stack-tag">Java</span>
                  <span className="stack-tag">Scala</span>
                  <span className="stack-tag">Kafka</span>
                  <span className="stack-tag">Spring Boot</span>
                  <span className="stack-tag">ElasticSearch</span>
                  <span className="stack-tag">GraphQL</span>
                  <span className="stack-tag">AWS</span>
                  <span className="stack-tag">Terraform</span>
                  <span className="stack-tag">Docker</span>
                  <span className="stack-tag">Redis</span>
                  <span className="stack-tag">Airflow</span>
                  <span className="stack-tag">Kudu</span>
                </div>
              </div>
            </section>

            <section className="section">
              <p className="section-label">— REFERENCES</p>
              <p className="references-text">Available on request.</p>
            </section>

          </main>

        </div>

        <footer className="footer">
          <span>humza.io — 2026</span>
          <span><a href="mailto:hello@humza.io">hello@humza.io</a></span>
        </footer>

      </div>
    </div>
  );
}
