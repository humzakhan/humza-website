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
            <h3 className="interest-title">Long-running agents that audit themselves</h3>
            <p className="interest-desc">
              Agents across finance and productivity that run for hours or days, check their own
              work, and produce outputs backed by provenance chains you can trust.
            </p>
          </div>
        </li>
        <li className="interest">
          <span className="interest-num">02</span>
          <div>
            <h3 className="interest-title">Agent infrastructure that lives off your machine</h3>
            <p className="interest-desc">
              Cloud agents and remote workspaces that lift the work off your laptop and run it
              anywhere, at scale, on the compute you already have.
            </p>
          </div>
        </li>
        <li className="interest">
          <span className="interest-num">03</span>
          <div>
            <h3 className="interest-title">The context fabric for AI agents</h3>
            <p className="interest-desc">
              Centralizing the knowledge trapped in people&apos;s heads and feeding each agent exactly
              the right context for the task, picked automatically. Not for one kind of agent, but
              all of them: coding harnesses, long-running business agents, and beyond.
            </p>
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
