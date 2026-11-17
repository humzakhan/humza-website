export function BuildingSection() {
  return (
    <section className="section" id="building">
      <div className="section-label">
        <span>— CURRENTLY BUILDING</span>
        <span className="section-label-right">01 FLAGSHIP</span>
      </div>
      <a className="flagship flagship--verstack" href="https://verstack.ai" target="_blank" rel="noreferrer">
        <h2 className="flagship-name">Verstack</h2>
        <p className="flagship-line flagship-line--problem">Inspection and maintenance coordination for residential property operators: capture the unit record on the walk, then route every repair to the right trade.</p>
        <div className="building-meta">
          <span className="building-link">verstack.ai</span>
          <span className="building-arrow">→</span>
        </div>
      </a>
      <div className="flagship flagship--models">
        <h2 className="flagship-name">Small specialist models</h2>
        <p className="flagship-line flagship-line--problem">Training and fine-tuning small open models to outperform frontier models on specialised business tasks, one domain at a time. First up: a family of models that read and categorise financial statements, trained on publicly available data from real Canadian and US businesses, and run fully offline.</p>
        <div className="building-meta">
          <span className="building-link">in training · coming soon</span>
        </div>
      </div>
    </section>
  );
}
