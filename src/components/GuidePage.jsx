function GuidePage({ onBack, onLogin }) {
  return (
    <main className="gg-guide-root">
      <section className="gg-guide-shell">
        <div className="gg-guide-head gg-guide-head-hero">
          <div>
            <p className="gg-guide-kicker">Application Guide</p>
            <h1 className="gg-guide-title">How to use Geo-Guardian</h1>
            <p className="gg-guide-subtitle">
              A practical workflow for setup, role management, zone operations, and incident monitoring.
            </p>

            <div className="gg-guide-pills">
              <span className="gg-guide-pill">Role-Based Access</span>
              <span className="gg-guide-pill">Live Map Operations</span>
              <span className="gg-guide-pill">Danger Zone Monitoring</span>
            </div>
          </div>
          <div className="gg-guide-actions">
            <button type="button" className="gg-btn gg-btn-secondary" onClick={onBack}>
              Back
            </button>
            <button type="button" className="gg-btn gg-btn-primary" onClick={onLogin}>
              Login
            </button>
          </div>
        </div>

        <div className="gg-guide-highlight-row">
          <article className="gg-guide-highlight-card">
            <p className="gg-guide-highlight-label">Main Goal</p>
            <p className="gg-guide-highlight-value">Manage risk zones and respond fast</p>
          </article>
          <article className="gg-guide-highlight-card">
            <p className="gg-guide-highlight-label">Roles</p>
            <p className="gg-guide-highlight-value">Admin (Master + Admin) and Volunteer</p>
          </article>
          <article className="gg-guide-highlight-card">
            <p className="gg-guide-highlight-label">Core Modules</p>
            <p className="gg-guide-highlight-value">User Control + Live Geospatial Map</p>
          </article>
        </div>

        <div className="gg-guide-grid">
          <article className="gg-guide-card">
            <h2 className="gg-guide-card-title">Quick Start</h2>
            <ul className="gg-guide-list">
              <li>Open landing page and click Login.</li>
              <li>Sign in with assigned role credentials.</li>
              <li>Successful login routes you to the map dashboard.</li>
              <li>Both Master Admin and Admin get access to Manage Team.</li>
            </ul>
          </article>

          <article className="gg-guide-card">
            <h2 className="gg-guide-card-title">Master Admin Capabilities</h2>
            <ul className="gg-guide-list">
              <li>Same management permissions as Admin role.</li>
              <li>Create volunteer accounts with unique credentials.</li>
              <li>Promote volunteer to admin and demote admin to volunteer.</li>
              <li>Remove accounts and maintain access policy.</li>
              <li>Use all map controls and zone management features.</li>
            </ul>
          </article>

          <article className="gg-guide-card">
            <h2 className="gg-guide-card-title">Admin Capabilities</h2>
            <ul className="gg-guide-list">
              <li>Same management permissions as Master Admin role.</li>
              <li>Create volunteer accounts with unique credentials.</li>
              <li>Promote volunteer to admin and demote admin to volunteer.</li>
              <li>Remove user accounts (except own logged-in account).</li>
              <li>Draw, edit, and remove map danger zones.</li>
              <li>Use search, recenter, and zoom for map operations.</li>
              <li>Monitor live map state and alerts.</li>
              <li>Can access Manage Team page.</li>
            </ul>
          </article>

          <article className="gg-guide-card">
            <h2 className="gg-guide-card-title">Volunteer Capabilities</h2>
            <ul className="gg-guide-list">
              <li>Use dashboard for field-oriented zone updates.</li>
              <li>Draw and manage polygons in assigned workflow.</li>
              <li>View current map context and operational zones.</li>
              <li>Cannot manage users or change roles.</li>
            </ul>
          </article>

          <article className="gg-guide-card gg-guide-card-wide">
            <h2 className="gg-guide-card-title">Recommended Operational Workflow</h2>
            <ol className="gg-guide-list gg-guide-ordered">
              <li>Admin (Master or Admin role) validates active team accounts before shift start.</li>
              <li>Create or update volunteer/admin accounts as needed.</li>
              <li>Open map dashboard and draw or refresh zone boundaries.</li>
              <li>Track live activity and monitor risk-zone changes.</li>
              <li>Close session with logout to keep account access secure.</li>
            </ol>
          </article>

          <article className="gg-guide-card gg-guide-card-wide">
            <h2 className="gg-guide-card-title">Important Restrictions</h2>
            <ul className="gg-guide-list">
              <li>Logged-in admin users cannot delete their own account.</li>
              <li>Master admin account cannot be removed or role-changed from user management APIs.</li>
              <li>Volunteer users cannot access Manage Team controls.</li>
            </ul>
          </article>

          <article className="gg-guide-card gg-guide-card-wide">
            <h2 className="gg-guide-card-title">Mobile App Download</h2>
            <p className="gg-guide-subtitle">
              Download the latest Geo-Guardian mobile app release from GitHub.
            </p>
            <div className="gg-guide-actions" style={{ marginTop: '12px' }}>
              <a
                className="gg-btn gg-btn-primary"
                href="https://github.com/MAHAVEER-IT/Geo-Guardian-App/releases"
                target="_blank"
                rel="noreferrer"
              >
                Open Mobile App Releases
              </a>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}

export default GuidePage;
