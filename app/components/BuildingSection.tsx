import { Link } from "react-router";

export function BuildingSection() {
  return (
    <section className="section" id="building">
      <div className="section-label">
        <span>— CURRENTLY BUILDING</span>
        <span className="section-label-right">01 FLAGSHIP</span>
      </div>
      <Link className="flagship flagship--stealth" to="/works">
        <h3 className="flagship-name">Stealth</h3>
        <p className="flagship-line flagship-line--problem">Spatial intelligence for the physical world: mapping and understanding real spaces, so less work has to happen inside them.</p>
        <div className="building-meta">
          <span className="building-link">in stealth</span>
          <span className="building-arrow">→</span>
        </div>
      </Link>
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
