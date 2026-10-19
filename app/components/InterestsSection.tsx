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
            <h2 className="interest-title">Autonomous workflows with provenance</h2>
            <p className="interest-desc">
              Agents that can execute multi-step business tasks while tracking what they used,
              what changed, what failed, and why the final answer should be trusted.
            </p>
            <a className="interest-proof" href="https://provenant.sh">
              <span className="interest-proof-mark" aria-hidden="true">↳</span>
              <span className="interest-proof-kicker">eg</span>
              <span className="interest-proof-name">provenant.sh</span>
              <span className="interest-proof-icon" aria-hidden="true">↗</span>
              <span className="interest-proof-desc interest-proof-desc--long">verifiable financial agent outputs</span>
              <span className="interest-proof-desc interest-proof-desc--short">financial agent outputs</span>
            </a>
          </div>
        </li>
        <li className="interest">
          <span className="interest-num">02</span>
          <div>
            <h2 className="interest-title">Specialised local models</h2>
            <p className="interest-desc">
              Fine-tuning small open models for narrow, high-stakes tasks, and measuring them
              honestly against frontier baselines.
            </p>
            <div className="interest-proof interest-proof--muted">
              <span className="interest-proof-mark" aria-hidden="true">↳</span>
              <span className="interest-proof-name">in progress</span>
              <span className="interest-proof-desc interest-proof-desc--long">bank-statement extraction, EN/FR</span>
              <span className="interest-proof-desc interest-proof-desc--short">bank-statement extraction</span>
            </div>
          </div>
        </li>
        <li className="interest">
          <span className="interest-num">03</span>
          <div>
            <h2 className="interest-title">AI safety &amp; security for agents</h2>
            <p className="interest-desc">
              Agents that stay controllable when their inputs are hostile: untrusted content
              treated as data, approvals bound to the exact action, and evals that measure how
              often those defenses actually hold.
            </p>
            <div className="interest-proof interest-proof--muted">
              <span className="interest-proof-mark" aria-hidden="true">↳</span>
              <span className="interest-proof-name">in production</span>
              <span className="interest-proof-desc interest-proof-desc--long">injection-hardened multimodal agent pipeline</span>
              <span className="interest-proof-desc interest-proof-desc--short">injection-hardened agent pipeline</span>
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
