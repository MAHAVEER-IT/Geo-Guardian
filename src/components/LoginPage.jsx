import { useState } from 'react';

function LoginPage({ onSubmit, onBack, error }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(email, password);
  };

  return (
    <section className="gg-login-wrap">
      <div className="gg-login-card">
        <p className="gg-landing-kicker">Admin Access</p>
        <h2 className="gg-login-title">Sign in to Geo-Guardian</h2>
        <p className="gg-login-subtitle">Master admin, admins, and volunteers can sign in using role-based credentials.</p>

        <form className="gg-login-form" onSubmit={handleSubmit}>
          <label className="gg-login-label" htmlFor="admin-email">Email</label>
          <input
            id="admin-email"
            type="email"
            className="gg-login-input"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="admin@gmail.com"
            required
          />

          <label className="gg-login-label" htmlFor="admin-password">Password</label>
          <input
            id="admin-password"
            type="password"
            className="gg-login-input"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="admin123"
            required
          />

          {error && <p className="gg-login-error">{error}</p>}

          <button type="submit" className="gg-btn gg-btn-primary gg-btn-block">Login</button>
        </form>

        <div className="gg-login-footer">
          <button type="button" className="gg-btn gg-btn-secondary gg-btn-block" onClick={onBack}>
            Back to Landing
          </button>
        </div>
      </div>
    </section>
  );
}

export default LoginPage;
