function LandingPage({ onLogin, onGuide }) {
  return (
    <section className="gg-landing-overlay">
      <p className="gg-landing-kicker">Geo-Guardian</p>
      <h1 className="gg-landing-title">Geospatial Safety Intelligence</h1>
      <p className="gg-landing-subtitle">
        Monitor danger zones, track live locations, and respond to critical incidents from one command surface.
      </p>

      <div className="gg-landing-actions">
        <button type="button" className="gg-btn gg-btn-primary" onClick={onLogin}>
          Login
        </button>
        <button type="button" className="gg-btn gg-btn-secondary" onClick={onGuide}>How To Use</button>
      </div>
    </section>
  );
}

export default LandingPage;
