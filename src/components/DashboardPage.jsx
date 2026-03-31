import { Toaster } from 'react-hot-toast';
import AdminMap from './AdminMap';

function DashboardPage({ currentUser, onLogout, onManageUsers }) {
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
            <p className="mt-0.5 text-xs font-semibold uppercase tracking-[0.18em] text-slate-200/90">
              {currentUser?.role === 'volunteer' ? 'Volunteer' : 'Admin'}
            </p>
          </div>
        </div>
      </div>

      <button
        onClick={onLogout}
        className="absolute left-4 top-28 z-[1001] rounded-xl border border-white/30 bg-slate-900/45 px-3 py-2 text-xs font-semibold text-slate-100 shadow-lg shadow-slate-900/30 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-900/60"
      >
        Logout
      </button>

      {['master_admin', 'admin'].includes(currentUser?.role) && (
        <button
          onClick={onManageUsers}
          className="absolute left-4 top-40 z-[1001] rounded-xl border border-cyan-200/35 bg-cyan-500/20 px-3 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-cyan-100 shadow-lg shadow-cyan-900/25 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-cyan-500/30"
        >
          Manage Team
        </button>
      )}

      <AdminMap />
    </div>
  );
}

export default DashboardPage;
