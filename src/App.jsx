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
    <div className="relative h-screen w-screen overflow-hidden bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900">
      {/* Toast Notifications */}
      <Toaster 
        toastOptions={{
          style: {
            fontFamily: 'system-ui, -apple-system, sans-serif'
          }
        }}
      />

      {/* Header */}
      <div className="absolute top-4 left-4 z-[1001] backdrop-blur-md bg-gradient-to-br from-white/10 to-white/5 rounded-xl shadow-2xl px-8 py-4 border border-white/30 transition-all duration-300 hover:shadow-xl">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent flex items-center gap-3">
          🛡️ Geo-Guardian
        </h1>
        <p className="text-xs font-medium text-white/80 mt-1.5 tracking-wide">Danger Zone Management System</p>
      </div>

      {/* Map Component */}
      <AdminMap socket={socket} />
    </div>
  );
}

export default App;
