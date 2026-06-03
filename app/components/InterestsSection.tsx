export function InterestsSection() {
  return (
    <section className="section" id="interests">
      <div className="section-label">
        <span>— WHAT I&apos;M INTO</span>
      </div>
      <p className="section-intro">
        The problems I want to spend the next years on. If these resonate, we&apos;ll work well together.
      </p>
      <ol className="interests-list">
        <li className="interest">
          <span className="interest-num">01</span>
          <div>
            <h3 className="interest-title">Autonomous workflows with provenance</h3>
            <p className="interest-desc">
              Agents that can execute multi-step business tasks while tracking what they used,
              what changed, what failed, and why the final answer should be trusted.
            </p>
            <a className="interest-proof" href="https://provenant.dev">
              <span className="interest-proof-mark" aria-hidden="true">↳</span>
              <span className="interest-proof-kicker">eg</span>
              <span className="interest-proof-name">provenant</span>
              <span className="interest-proof-icon" aria-hidden="true">↗</span>
              <span className="interest-proof-desc">verifiable financial agent outputs</span>
            </a>
          </div>
        </li>
        <li className="interest">
          <span className="interest-num">02</span>
          <div>
            <h3 className="interest-title">Vertical agent harnesses for business teams</h3>
            <p className="interest-desc">
              Custom agents for analysts, operators, founders, and enterprise teams that encode
              the workflow, data access, checks, and approvals of a specific business process.
            </p>
            <a className="interest-proof" href="https://syndic.dev">
              <span className="interest-proof-mark" aria-hidden="true">↳</span>
              <span className="interest-proof-kicker">eg</span>
              <span className="interest-proof-name">syndic.dev</span>
              <span className="interest-proof-icon" aria-hidden="true">↗</span>
              <span className="interest-proof-desc">vertical agent systems</span>
            </a>
          </div>
        </li>
        <li className="interest">
          <span className="interest-num">03</span>
          <div>
            <h3 className="interest-title">Context infrastructure for reliable agents</h3>
            <p className="interest-desc">
              Routing, ranking, and packaging the exact knowledge an agent needs from internal
              systems before it acts, so execution is grounded instead of generic.
            </p>
            <div className="interest-proof interest-proof--muted">
              <span className="interest-proof-mark" aria-hidden="true">↳</span>
              <span className="interest-proof-name">coming soon</span>
              <span className="interest-proof-desc">context infrastructure</span>
            </div>
          </div>
        </li>
      </ol>
      <p className="interests-outro">
        If any of these areas spark your interest, we should talk.{" "}
        <a href="mailto:hello@humza.io">Feel free to reach out.</a>
      </p>
    </section>
  );
}
