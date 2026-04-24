import { Toaster } from 'react-hot-toast';
import AdminMap from './AdminMap';

function DashboardPage() {
  return (
    <div className="relative h-screen w-screen overflow-hidden admin-shell">
      <Toaster
        toastOptions={{
          style: {
            fontFamily: 'Manrope, system-ui, sans-serif',
          },
        }}
      />

      <div className="absolute left-4 top-4 z-[1001] rounded-2xl border border-white/30 bg-slate-900/45 px-6 py-4 shadow-xl shadow-slate-900/35 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-sky-500 to-blue-500 text-white shadow-md shadow-blue-300/30">
            <span className="text-lg">🛡️</span>
          </div>
          <div>
            <h1 className="font-heading text-2xl font-bold tracking-tight text-white">Geo-Guardian Admin</h1>
            <p className="mt-0.5 text-xs font-semibold uppercase tracking-[0.18em] text-slate-200/90">Dashboard</p>
          </div>
        </div>
      </div>

      <AdminMap />
    </div>
  );
}

export default DashboardPage;
