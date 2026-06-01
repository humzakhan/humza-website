export function BuildingSection() {
  return (
    <section className="section" id="building">
      <div className="section-label">
        <span>— CURRENTLY BUILDING</span>
        <span className="section-label-right">01 FLAGSHIP</span>
      </div>
      <a className="flagship flagship--verstack" href="#">
        <h3 className="flagship-name">Verstack</h3>
        <p className="flagship-line flagship-line--problem">Reverse ETL for the unstructured data your AI agents can&apos;t read yet.</p>
        <p className="flagship-line flagship-line--what">Co-founded the platform and lead its engineering as technical co-founder.</p>
        <p className="flagship-line flagship-line--outcome">Unstructured in, structured out. Agent-ready data, delivered reliably at scale.</p>
        <div className="building-meta">
          <span>[ stack ]</span>
          <span className="building-arrow">→</span>
        </div>
      </a>
      <a className="flagship flagship--syndic" href="#">
        <h3 className="flagship-name">Syndic</h3>
        <p className="flagship-line flagship-line--problem">Mobile control plane for AI coding agents, running on the subscriptions you already pay for.</p>
        <p className="flagship-line flagship-line--what">Built the entire platform solo, end to end.</p>
        <p className="flagship-line flagship-line--outcome">Move your agent workflow off the desktop. Plan, run, and ship from anywhere.</p>
        <div className="building-meta">
          <span>[ stack ]</span>
          <span className="building-arrow">→</span>
        </div>
      </a>
      <p className="also-building">
        also building — <a href="#">WordStack</a>
      </p>
    </section>
  );
}
