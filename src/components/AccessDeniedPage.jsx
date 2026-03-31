function AccessDeniedPage({ onBack }) {
  return (
    <section className="gg-login-wrap">
      <div className="gg-login-card">
        <p className="gg-landing-kicker">Access Restricted</p>
        <h2 className="gg-login-title">Permission denied</h2>
        <p className="gg-login-subtitle">Only master admin can manage volunteer/admin accounts.</p>
        <button
          type="button"
          className="gg-btn gg-btn-primary gg-btn-block"
          onClick={onBack}
        >
          Back to Dashboard
        </button>
      </div>
    </section>
  );
}

export default AccessDeniedPage;
