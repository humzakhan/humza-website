export function BuildingSection() {
  return (
    <section className="section" id="building">
      <div className="section-label">
        <span>— CURRENTLY BUILDING</span>
        <span className="section-label-right">01 FLAGSHIP</span>
      </div>
      <a className="flagship flagship--verstack" href="https://verstack.ai" target="_blank" rel="noreferrer">
        <h3 className="flagship-name">Verstack</h3>
        <p className="flagship-line flagship-line--problem">AI-powered property inspections in minutes, with every record in one place.</p>
        <div className="building-meta">
          <span className="building-link">verstack.ai</span>
          <span className="building-arrow">→</span>
        </div>
      </a>
      <a className="flagship flagship--syndic" href="https://syndic.dev" target="_blank" rel="noreferrer">
        <h3 className="flagship-name">Syndic</h3>
        <p className="flagship-line flagship-line--problem">Run cloud coding agents with goals, templates, and schedules built in.</p>
        <div className="building-meta">
          <span className="building-link">syndic.dev</span>
          <span className="building-arrow">→</span>
        </div>
      </a>
    </section>
  );
}
