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
          <span className="ledger-what">Real-time DataTable, built at Revelate</span>
          <span className="ledger-metric">drove ARR</span>
        </li>
        <li className="ledger-row">
          <span className="ledger-co">Revelate</span>
          <span className="ledger-what">Real-time trade analytics</span>
          <span className="ledger-metric">200–400M messages/day</span>
        </li>
        <li className="ledger-row">
          <span className="ledger-co">Lookout</span>
          <span className="ledger-what">Ingestion for 12M devices</span>
          <span className="ledger-metric">$60K/yr saved</span>
        </li>
      </ul>
    </section>
  );
}
