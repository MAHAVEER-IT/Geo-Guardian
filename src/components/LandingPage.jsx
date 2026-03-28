import { useEffect, useState } from 'react';
import logo from '../../assets/Geo-Guardian.png';

function LandingPage({ onLaunch, onLogin }) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');
  const [showTopButton, setShowTopButton] = useState(false);

  useEffect(() => {
    const sectionIds = ['hero', 'features', 'workflow', 'launch'];

    const onScroll = () => {
      const scrollTop = window.scrollY;
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? (scrollTop / maxScroll) * 100 : 0;

      setScrollProgress(progress);
      setShowTopButton(scrollTop > 500);

      for (const id of sectionIds) {
        const section = document.getElementById(id);
        if (!section) continue;

        const rect = section.getBoundingClientRect();
        const isActive =
          rect.top <= window.innerHeight * 0.35 &&
          rect.bottom >= window.innerHeight * 0.35;

        if (isActive) {
          setActiveSection(id);
          break;
        }
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const navItems = [
    { id: 'hero', label: 'Overview' },
    { id: 'features', label: 'Features' },
    { id: 'workflow', label: 'Workflow' },
    { id: 'launch', label: 'Launch' },
  ];

  return (
    <section className="relative z-10 w-full overflow-hidden">
      <div className="landing-grid-overlay" />
      <div className="landing-progress-track">
        <div
          className="landing-progress-bar"
          style={{ width: `${Math.min(scrollProgress, 100)}%` }}
        />
      </div>

      <div className="relative w-full">
        <header className="sticky top-0 z-20 border-b border-cyan-300/20 bg-slate-950/55 px-6 py-4 backdrop-blur-sm md:px-10">
          <div className="mx-auto flex w-full max-w-7xl items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={logo} alt="Geo-Guardian" className="h-11 w-11 rounded-xl object-cover shadow-lg shadow-sky-400/35" />
              <div>
                <p className="font-heading text-lg font-bold text-white">Geo-Guardian</p>
                <p className="text-xs uppercase tracking-[0.2em] text-emerald-100/90">Admin Intelligence Platform</p>
              </div>
            </div>

            <nav className="hidden items-center gap-2 lg:flex">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`quick-nav-link ${
                    activeSection === item.id ? 'active' : ''
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <span className="hidden rounded-full border border-emerald-300/40 bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-100 sm:inline-flex">
                Live System
              </span>
              <button
                onClick={onLogin}
                className="rounded-xl border border-white/30 bg-slate-900/45 px-4 py-2 text-xs font-bold text-slate-100 shadow-lg shadow-slate-900/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-900/65"
              >
                Login
              </button>
              <button
                onClick={onLaunch}
                className="rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-4 py-2 text-xs font-bold text-white shadow-lg shadow-emerald-500/30 transition-all duration-300 hover:-translate-y-0.5"
              >
                Open Dashboard
              </button>
            </div>
          </div>
        </header>

        <aside className="section-rail" aria-hidden="true">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`section-rail-dot ${
                activeSection === item.id ? 'active' : ''
              }`}
              title={item.label}
            />
          ))}
        </aside>

        <div id="hero" className="landing-section hero-theme px-6 py-14 md:px-10 md:py-20">
          <div className="mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[1.05fr,0.95fr] lg:items-center">
            <div>
              <p className="animate-fade-up text-xs font-semibold uppercase tracking-[0.2em] text-emerald-200">
                Geo-Guardian Command Layer
              </p>
              <h1 className="animate-fade-up-delayed mt-4 font-heading text-4xl font-bold leading-[1.05] text-white md:text-6xl">
                Secure Every Route.
                <br />
                React in Real Time.
              </h1>
              <p className="animate-fade-up-delayed-2 mt-6 max-w-2xl text-base leading-relaxed text-slate-200">
                A mission-grade geospatial safety platform that transforms raw GPS movement into actionable alerts for your emergency operations team.
              </p>

              <div className="animate-fade-up-delayed-2 mt-8 flex flex-wrap items-center gap-3">
                <button
                  onClick={onLaunch}
                  className="group rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-3 text-sm font-bold text-white shadow-xl shadow-emerald-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-emerald-300/45"
                >
                  Launch Admin Dashboard
                </button>
                <button
                  onClick={() => scrollToSection('workflow')}
                  className="rounded-2xl border border-white/30 px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-white/10"
                >
                  View Workflow
                </button>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <div className="metric-chip">
                  <p className="metric-label">Warning Distance</p>
                  <p className="metric-value">{'<='} 50m</p>
                </div>
                <div className="metric-chip">
                  <p className="metric-label">Geo Cache TTL</p>
                  <p className="metric-value">30 min</p>
                </div>
                <div className="metric-chip">
                  <p className="metric-label">Alert Throttle</p>
                  <p className="metric-value">30 sec</p>
                </div>
              </div>
            </div>

            <div className="relative flex items-center justify-center py-6">
              <div className="pulse-orb" />
              <div className="hero-spotlight" />
              <img
                src={logo}
                alt="Geo-Guardian Shield"
                className="relative z-10 w-[250px] animate-logo-float drop-shadow-[0_18px_45px_rgba(20,184,166,0.45)] md:w-[350px]"
              />
            </div>
          </div>
        </div>

        <div id="features" className="landing-section feature-theme px-6 py-14 md:px-10 md:py-20">
          <div className="mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[0.9fr,1.1fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-200">Capability Matrix</p>
              <h2 className="mt-3 font-heading text-3xl font-bold text-white md:text-5xl">Designed for decisive operations</h2>
              <p className="mt-5 max-w-xl text-sm leading-relaxed text-slate-200 md:text-base">
                Every feature maps directly to safety outcomes: fast zone authoring, reliable proximity detection, and immediate response synchronization between mobile and admin channels.
              </p>

              <div className="mt-8 space-y-3">
                <div className="insight-row">
                  <span className="insight-dot" />
                  Geospatial polygon authoring with visual map editing
                </div>
                <div className="insight-row">
                  <span className="insight-dot" />
                  Near-zone early warning and in-zone danger escalation
                </div>
                <div className="insight-row">
                  <span className="insight-dot" />
                  Real-time admin broadcast through Socket.IO
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <article className="feature-grid-card">
                <p className="feature-icon">🗺️</p>
                <h3 className="feature-title">Polygon Zone Studio</h3>
                <p className="feature-desc">Create and maintain hazard boundaries with precise map controls.</p>
              </article>
              <article className="feature-grid-card">
                <p className="feature-icon">🚨</p>
                <h3 className="feature-title">Live Alert Stream</h3>
                <p className="feature-desc">Receive immediate high-visibility incident notifications on admin UI.</p>
              </article>
              <article className="feature-grid-card">
                <p className="feature-icon">📍</p>
                <h3 className="feature-title">Proximity Intelligence</h3>
                <p className="feature-desc">Evaluate nearest-risk distance continuously from user GPS updates.</p>
              </article>
              <article className="feature-grid-card">
                <p className="feature-icon">⚡</p>
                <h3 className="feature-title">Spatial Cache Engine</h3>
                <p className="feature-desc">Reduce repeat computations using TTL and movement-based invalidation.</p>
              </article>
            </div>
          </div>
        </div>

        <div id="workflow" className="landing-section workflow-theme px-6 py-14 md:px-10 md:py-20">
          <div className="mx-auto w-full max-w-7xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-200">Operational Workflow</p>
            <h2 className="mt-3 font-heading text-3xl font-bold text-white md:text-5xl">From mapping risk to broadcasting action</h2>

            <div className="mt-10 grid gap-4 lg:grid-cols-5">
              <article className="process-step">
                <span className="step-dot">1</span>
                <h3 className="process-title">Create Zone</h3>
                <p className="process-desc">Admin draws polygon and stores GeoJSON geometry in MongoDB.</p>
              </article>
              <article className="process-step">
                <span className="step-dot">2</span>
                <h3 className="process-title">Track User</h3>
                <p className="process-desc">Mobile starts GPS stream and refreshes spatial cache (30 min TTL).</p>
              </article>
              <article className="process-step">
                <span className="step-dot">3</span>
                <h3 className="process-title">Warn Early</h3>
                <p className="process-desc">At {'<='} 50m distance, warning mode starts for early user awareness.</p>
              </article>
              <article className="process-step">
                <span className="step-dot">4</span>
                <h3 className="process-title">Detect Entry</h3>
                <p className="process-desc">Inside polygon triggers danger state with vibration and continuous sound.</p>
              </article>
              <article className="process-step">
                <span className="step-dot">5</span>
                <h3 className="process-title">Notify Admin</h3>
                <p className="process-desc">Socket event is broadcast to admin panel for instant operational response.</p>
              </article>
            </div>
          </div>
        </div>

        <div id="launch" className="landing-section cta-theme px-6 py-16 md:px-10 md:py-24">
          <div className="mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[1.1fr,0.9fr] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-200">Ready to Monitor</p>
              <h2 className="mt-3 font-heading text-3xl font-bold text-white md:text-5xl">Deploy your control center in one click</h2>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-200 md:text-base">
                Launch the dashboard to map risk zones, monitor live movement intelligence, and coordinate immediate safety actions.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <div className="launch-note">
                  <p className="launch-note-title">Continuous Operations</p>
                  <p className="launch-note-desc">Stay connected with always-on socket event streaming.</p>
                </div>
                <div className="launch-note">
                  <p className="launch-note-title">Fast Decisioning</p>
                  <p className="launch-note-desc">Get context-rich alerts exactly when users cross risk boundaries.</p>
                </div>
              </div>
            </div>

            <div className="launch-panel">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-200">Mission Control</p>
              <p className="mt-3 text-sm leading-relaxed text-slate-100">
                Enter the admin workspace to start drawing zones, viewing map events, and running your full emergency workflow.
              </p>
              <button
                onClick={onLaunch}
                className="mt-6 w-full rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 px-7 py-3 text-sm font-bold text-white shadow-xl shadow-emerald-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-emerald-300/45"
              >
                Enter Dashboard
              </button>
            </div>
          </div>
        </div>

        {showTopButton && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="back-top-btn"
            title="Back to top"
          >
            ↑ Top
          </button>
        )}
      </div>
    </section>
  );
}

export default LandingPage;
