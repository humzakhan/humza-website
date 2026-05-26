export function WorksSection() {
  return (
    <section className="section" id="works">
      <div className="section-label">
        <span>— WORKS</span>
        <a className="section-label-right" href="/works">browse all →</a>
      </div>
      <div>
        <a className="works-row" href="#">
          <div>
            <h3 className="works-title">TCA — Transaction Cost Analytics</h3>
            <p className="works-desc">Real-time trade analytics for NYSE, NASDAQ, TSX.</p>
            <p className="works-metric">400M messages/day · delivery time cut 60%</p>
          </div>
          <div className="works-meta">Revelate<br />2019–2022</div>
        </a>
        <a className="works-row" href="#">
          <div>
            <h3 className="works-title">Lookout Ingestion Service</h3>
            <p className="works-desc">Redesigned ingestion across 12M mobile devices.</p>
            <p className="works-metric">$60K saved annually · 30% infra cost reduction</p>
          </div>
          <div className="works-meta">Lookout<br />2022–2024</div>
        </a>
        <a className="works-row" href="#">
          <div>
            <h3 className="works-title">Derivatives Data Monetisation</h3>
            <p className="works-desc">Web distribution platform for derivatives data.</p>
            <p className="works-metric">55% API latency reduction · ARR contribution</p>
          </div>
          <div className="works-meta">CME Group<br />2022</div>
        </a>
        <a className="works-row" href="#">
          <div>
            <h3 className="works-title">RepoMap</h3>
            <p className="works-desc">CLI that maps any codebase into an interactive architecture diagram.</p>
            <p className="works-metric">Open source · MIT</p>
          </div>
          <div className="works-meta">Personal<br />2024</div>
        </a>
      </div>
    </section>
  );
}
