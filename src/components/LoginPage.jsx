import { useMemo, useState } from 'react';

const TEMP_EMAIL = 'admin@gmail.com';
const TEMP_PASSWORD = 'admin123';

function LoginPage({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const canSubmit = useMemo(() => email.trim() && password.trim(), [email, password]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const normalizedEmail = email.trim().toLowerCase();

    if (normalizedEmail === TEMP_EMAIL && password === TEMP_PASSWORD) {
      setError('');
      onLoginSuccess();
      return;
    }

    setError('Invalid credentials. Use the temporary admin login below.');
  };

  return (
    <section className="login-page min-h-screen w-full px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-5xl">
        <div className="login-layout grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="login-intro rounded-3xl p-6 sm:p-8 lg:p-10">
            <span className="login-badge">Admin Access</span>
            <h1 className="font-heading mt-4 text-4xl font-bold leading-tight text-white sm:text-5xl">
              Secure entry for the Geo-Guardian control center
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-200">
              This is a temporary login gate for demo and testing. Enter the credentials shown in the panel to
              unlock the landing page and live dashboard.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <div className="login-point">Live danger alerts</div>
              <div className="login-point">Real-time map monitoring</div>
              <div className="login-point">Polygon zone management</div>
              <div className="login-point">Socket-powered updates</div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="login-card rounded-3xl p-6 sm:p-8">
            <h2 className="font-heading text-2xl font-semibold text-white">Login</h2>
            <p className="mt-2 text-sm text-slate-300">Use the temporary admin credentials to continue.</p>

            <div className="mt-6 space-y-4">
              <label className="block">
                <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-emerald-100">
                  Email
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Enter your email"
                  className="login-input w-full"
                  autoComplete="email"
                  required
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-emerald-100">
                  Password
                </span>
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter your password"
                  className="login-input w-full"
                  autoComplete="current-password"
                  required
                />
              </label>
            </div>

            {error && <p className="mt-4 rounded-xl border border-red-300/40 bg-red-900/25 px-3 py-2 text-sm text-red-100">{error}</p>}

            <button
              type="submit"
              disabled={!canSubmit}
              className="mt-6 w-full rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-4 py-3 text-sm font-bold uppercase tracking-[0.12em] text-white shadow-lg shadow-emerald-900/35 transition-all duration-300 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default LoginPage;
