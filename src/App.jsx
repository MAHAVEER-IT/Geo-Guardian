import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { Toaster, toast } from 'react-hot-toast';
import AdminMap from './components/AdminMap';

// Connect to the backend Socket.io server
const socket = io('https://geo-guardian-backend.onrender.com');

function App() {
  useEffect(() => {
    // Listen for admin alerts from mobile devices
    socket.on('admin_alert', (data) => {
      // Show urgent toast notification
      toast.error(
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl animate-pulse">🚨</span>
            <span className="font-extrabold text-xl tracking-tight">DANGER ALERT</span>
          </div>
          <span className="text-base font-medium mt-1">{data.message}</span>
          {data.location && (
            <span className="text-xs mt-2 opacity-90 font-mono bg-white/20 px-2 py-1 rounded">
              📍 {data.location.lat?.toFixed(4)}, {data.location.lng?.toFixed(4)}
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
    });

    // Cleanup on unmount
    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('admin_alert');
    };
  }, []);

  return (
    <div className="relative h-screen w-screen overflow-hidden admin-shell">
      <div className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-sky-400/25 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 top-1/4 h-72 w-72 rounded-full bg-cyan-300/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-amber-300/20 blur-3xl" />

      {/* Toast Notifications */}
      <Toaster
        toastOptions={{
          style: {
            fontFamily: 'Manrope, system-ui, sans-serif',
          },
        }}
      />

      {/* Header */}
      <div className="absolute top-4 left-4 z-[1001] rounded-2xl border border-white/30 bg-slate-900/45 px-6 py-4 shadow-xl shadow-slate-900/35 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-900/55 hover:shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-sky-500 to-cyan-400 text-white shadow-md shadow-sky-300/50">
            <span className="text-lg">🛡️</span>
          </div>
          <div>
            <h1 className="font-heading text-2xl font-bold tracking-tight text-white">Geo-Guardian Admin</h1>
            <p className="mt-0.5 text-xs font-semibold uppercase tracking-[0.18em] text-slate-200/90">Danger Zone Control Center</p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 right-4 z-[1001] rounded-xl border border-emerald-300/40 bg-emerald-950/40 px-3 py-2 text-xs font-semibold text-emerald-100 shadow-lg shadow-emerald-900/30 backdrop-blur-md">
        <span className="inline-flex items-center gap-2">
          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
          Live monitoring active
        </span>
      </div>

      {/* Map Component */}
      <AdminMap socket={socket} />
    </div>
  );
}

export default App;
