export function BuildingSection() {
  return (
    <section className="section" id="building">
      <div className="section-label">
        <span>— CURRENTLY BUILDING</span>
        <span className="section-label-right">02 ACTIVE</span>
      </div>
      <div className="building-grid">
        <a className="building-card" href="#">
          <h3 className="building-name">WordStack</h3>
          <p className="building-desc">[ one-line description of WordStack — what it is and who it's for ]</p>
          <div className="building-meta">
            <span>[ stack ]</span>
            <span className="building-arrow">→</span>
          </div>
        </a>
        <a className="building-card" href="#">
          <h3 className="building-name">Sendic</h3>
          <p className="building-desc">[ one-line description of Sendic — what it is and who it's for ]</p>
          <div className="building-meta">
            <span>[ stack ]</span>
            <span className="building-arrow">→</span>
          </div>
        </a>
      </div>
    </section>
  );
}
