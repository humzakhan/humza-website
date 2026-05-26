export function BuildingSection() {
  return (
    <section className="section" id="building">
      <div className="section-label">
        <span>— CURRENTLY BUILDING</span>
        <span className="section-label-right">01 FLAGSHIP</span>
      </div>
      <a className="flagship" href="#">
        <h3 className="flagship-name">[ Your flagship project ]</h3>
        <p className="flagship-line flagship-line--problem">[ the problem it kills — one line ]</p>
        <p className="flagship-line flagship-line--what">[ what you built + the AI angle — one line ]</p>
        <p className="flagship-line flagship-line--outcome">[ outcome / who it's for / a metric ]</p>
        <div className="building-meta">
          <span>[ stack ]</span>
          <span className="building-arrow">→</span>
        </div>
      </a>
      <p className="also-building">
        also building — <a href="#">WordStack</a> · <a href="#">Sendic</a>
      </p>
    </section>
  );
}
