import { useEffect, useMemo, useState } from 'react';
import { io } from 'socket.io-client';
import { Toaster, toast } from 'react-hot-toast';
import AdminMap from './components/AdminMap';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';

// Connect to the backend Socket.io server
const socket = io('https://geo-guardian-backend.onrender.com');

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState('landing');
  const [socketConnected, setSocketConnected] = useState(socket.connected);
  const [liveAlerts, setLiveAlerts] = useState([]);
  const [alertFocusLocation, setAlertFocusLocation] = useState(null);
  const [tick, setTick] = useState(Date.now());

  const recentAlertCount = useMemo(
    () =>
      liveAlerts.filter(
        (alert) => Date.now() - alert.receivedAt < 5 * 60 * 1000
      ).length,
    [liveAlerts, tick]
  );

  const formatTimeAgo = (timestamp) => {
    const deltaSeconds = Math.max(1, Math.floor((Date.now() - timestamp) / 1000));
    if (deltaSeconds < 60) return `${deltaSeconds}s ago`;

    const deltaMinutes = Math.floor(deltaSeconds / 60);
    if (deltaMinutes < 60) return `${deltaMinutes}m ago`;

    const deltaHours = Math.floor(deltaMinutes / 60);
    return `${deltaHours}h ago`;
  };

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setTick(Date.now());
    }, 15000);

    return () => window.clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const handleConnect = () => {
      setSocketConnected(true);
    };

    const handleDisconnect = () => {
      setSocketConnected(false);
    };

    const handleAdminAlert = (data) => {
      const message = data?.message || 'Danger zone breach reported.';
      const lat = Number(data?.location?.lat);
      const lng = Number(data?.location?.lng);
      const hasLocation = Number.isFinite(lat) && Number.isFinite(lng);

      setLiveAlerts((prev) => [
        {
          id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
          message,
          location: hasLocation ? { lat, lng } : null,
          receivedAt: Date.now(),
        },
        ...prev,
      ].slice(0, 15));

      if (hasLocation) {
        setAlertFocusLocation([lat, lng]);
      }

    // Listen for admin alerts from mobile devices
      // Show urgent toast notification
      toast.error(
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl animate-pulse">🚨</span>
            <span className="font-extrabold text-xl tracking-tight">DANGER ALERT</span>
          </div>
          <span className="text-base font-medium mt-1">{message}</span>
          {hasLocation && (
            <span className="text-xs mt-2 opacity-90 font-mono bg-white/20 px-2 py-1 rounded">
              📍 {lat.toFixed(4)}, {lng.toFixed(4)}
            </span>
          )}
        </div>,
        {
          duration: 8000,
          position: 'top-center',
          style: {
            background: 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)',
            color: '#fff',
            padding: '20px 24px',
            borderRadius: '12px',
            minWidth: '380px',
            boxShadow: '0 20px 25px -5px rgba(220, 38, 38, 0.3), 0 10px 10px -5px rgba(220, 38, 38, 0.2)',
            border: '2px solid rgba(255, 255, 255, 0.2)'
          },
          icon: null
        }
      );
    };

    socket.on('connect', handleConnect);
    socket.on('disconnect', handleDisconnect);
    socket.on('admin_alert', handleAdminAlert);

    // Cleanup on unmount
    return () => {
      socket.off('connect', handleConnect);
      socket.off('disconnect', handleDisconnect);
      socket.off('admin_alert', handleAdminAlert);
    };
  }, []);

  return (
    <div
      className={`relative w-screen admin-shell ${
        currentView === 'dashboard'
          ? 'h-screen overflow-hidden'
          : 'min-h-screen overflow-x-hidden overflow-y-auto'
      }`}
    >
      <div className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-emerald-400/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 top-1/4 h-72 w-72 rounded-full bg-teal-300/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-orange-300/20 blur-3xl" />

      {/* Toast Notifications */}
      <Toaster
        toastOptions={{
          style: {
            fontFamily: 'Manrope, system-ui, sans-serif',
          },
        }}
      />

      {currentView === 'login' ? (
        <LoginPage
          onLoginSuccess={() => {
            setIsAuthenticated(true);
            setCurrentView('dashboard');
          }}
        />
      ) : currentView === 'landing' ? (
        <LandingPage
          onLaunch={() => {
            if (isAuthenticated) {
              setCurrentView('dashboard');
            } else {
              setCurrentView('login');
            }
          }}
          onLogin={() => {
            setCurrentView('login');
          }}
        />
      ) : (
        <>
          {/* Header */}
          <div className="absolute top-4 left-4 z-[1001] rounded-2xl border border-white/30 bg-slate-900/45 px-6 py-4 shadow-xl shadow-slate-900/35 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-900/55 hover:shadow-2xl">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-400 text-white shadow-md shadow-emerald-300/40">
                <span className="text-lg">🛡️</span>
              </div>
              <div>
                <h1 className="font-heading text-2xl font-bold tracking-tight text-white">Geo-Guardian Admin</h1>
                <p className="mt-0.5 text-xs font-semibold uppercase tracking-[0.18em] text-slate-200/90">Danger Zone Control Center</p>
              </div>
            </div>
          </div>

          <button
            onClick={() => setCurrentView('landing')}
            className="absolute left-4 top-28 z-[1001] rounded-xl border border-white/30 bg-slate-900/45 px-3 py-2 text-xs font-semibold text-slate-100 shadow-lg shadow-slate-900/30 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-900/60"
          >
            Back to Landing
          </button>

          <button
            onClick={() => {
              setIsAuthenticated(false);
              setCurrentView('landing');
            }}
            className="absolute left-4 top-40 z-[1001] rounded-xl border border-white/30 bg-slate-900/45 px-3 py-2 text-xs font-semibold text-slate-100 shadow-lg shadow-slate-900/30 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-900/60"
          >
            Logout
          </button>

          <div className="absolute bottom-4 right-4 z-[1001] w-[92vw] max-w-md rounded-2xl border border-white/30 bg-slate-900/55 p-4 text-slate-100 shadow-xl shadow-slate-900/35 backdrop-blur-md">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-heading text-base font-bold tracking-tight text-white">Live Incident Feed</p>
                <p className="mt-1 text-[11px] uppercase tracking-[0.14em] text-slate-300">Real-time admin alerts</p>
              </div>
              <span
                className={`inline-flex items-center gap-2 rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] ${
                  socketConnected
                    ? 'border-emerald-300/45 bg-emerald-500/20 text-emerald-100'
                    : 'border-red-300/45 bg-red-500/20 text-red-100'
                }`}
              >
                <span className={`h-1.5 w-1.5 rounded-full ${socketConnected ? 'bg-emerald-400 animate-pulse' : 'bg-red-400'}`} />
                {socketConnected ? 'Connected' : 'Offline'}
              </span>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2">
              <div className="rounded-xl border border-white/20 bg-slate-900/45 px-3 py-2">
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-300">Last 5 min</p>
                <p className="mt-1 text-lg font-bold text-white">{recentAlertCount}</p>
              </div>
              <div className="rounded-xl border border-white/20 bg-slate-900/45 px-3 py-2">
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-300">Total (session)</p>
                <p className="mt-1 text-lg font-bold text-white">{liveAlerts.length}</p>
              </div>
            </div>

            <div className="mt-3 max-h-56 space-y-2 overflow-y-auto pr-1">
              {liveAlerts.length === 0 ? (
                <div className="rounded-xl border border-dashed border-white/25 bg-slate-900/35 px-3 py-3 text-xs text-slate-300">
                  Waiting for incoming danger alerts...
                </div>
              ) : (
                liveAlerts.map((alert) => (
                  <div key={alert.id} className="rounded-xl border border-white/20 bg-slate-900/45 px-3 py-2">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-xs font-semibold leading-relaxed text-slate-100">{alert.message}</p>
                      <span className="shrink-0 text-[10px] font-semibold uppercase tracking-[0.1em] text-slate-300">
                        {formatTimeAgo(alert.receivedAt)}
                      </span>
                    </div>
                    {alert.location && (
                      <p className="mt-1 text-[11px] font-mono text-cyan-200">
                        📍 {alert.location.lat.toFixed(4)}, {alert.location.lng.toFixed(4)}
                      </p>
                    )}
                  </div>
                ))
              )}
            </div>

            {liveAlerts.length > 0 && (
              <button
                onClick={() => setLiveAlerts([])}
                className="mt-3 w-full rounded-xl border border-white/25 bg-slate-900/50 px-3 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-slate-100 transition-all duration-300 hover:bg-slate-900/70"
              >
                Clear Feed
              </button>
            )}
          </div>

          {/* Map Component */}
          <AdminMap socket={socket} liveFocusLocation={alertFocusLocation} />
        </>
      )}
    </div>
  );
}

export default App;
