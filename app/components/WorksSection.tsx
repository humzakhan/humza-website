import { Link } from "react-router";

export function WorksSection() {
  return (
    <section className="section" id="works">
      <div className="section-label">
        <span>— SELECTED WORK</span>
        <Link className="section-label-right" to="/works">browse all →</Link>
      </div>
      <p className="section-intro">Production systems at enterprise scale across market data, security, and finance.</p>
      <ul className="works-ledger">
        <li className="ledger-row">
          <span className="ledger-co">CME Group</span>
          <span className="ledger-what">Derivatives data platform</span>
          <span className="ledger-metric">55% lower API latency</span>
        </li>
        <li className="ledger-row">
          <span className="ledger-co">Provenant</span>
          <span className="ledger-what">Provenance chains for long-running financial agents</span>
          <span className="ledger-metric">Audit chain for financial agents</span>
        </li>
        <li className="ledger-row">
          <span className="ledger-co">Fauxbooks</span>
          <span className="ledger-what">Reconcilable synthetic financial datasets at scale</span>
          <span className="ledger-metric">Faster testing, faster ship</span>
        </li>
        <li className="ledger-row">
          <span className="ledger-co">Revelate</span>
          <span className="ledger-what">Real-time trade analytics</span>
          <span className="ledger-metric">400M messages/day</span>
        </li>
        <li className="ledger-row">
          <span className="ledger-co">Lookout</span>
          <span className="ledger-what">Ingestion for 12M devices</span>
          <span className="ledger-metric">30% infra cost cut</span>
        </li>
      </ul>
    </section>
  );
}
