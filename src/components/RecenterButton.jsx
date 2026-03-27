function RecenterButton({ userLocation, onRecenter }) {
  if (!userLocation) return null;

  return (
    <button
      onClick={onRecenter}
      className="absolute right-4 top-4 z-[1001] flex items-center gap-2.5 rounded-2xl border border-white/30 bg-slate-900/50 px-4 py-2.5 text-slate-100 shadow-xl shadow-slate-900/35 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-900/60"
      title="Go to my location"
    >
      <span className="grid h-7 w-7 place-items-center rounded-full bg-sky-500/25 text-lg">📍</span>
      <span className="text-sm font-semibold tracking-wide">My Location</span>
    </button>
  );
}

export default RecenterButton;
