function InstructionsPanel() {
  return (
    <div className="absolute bottom-4 left-4 z-[1001] max-w-sm rounded-2xl border border-white/30 bg-slate-900/50 p-5 shadow-xl shadow-slate-900/35 backdrop-blur-md transition-all duration-300 hover:bg-slate-900/60 hover:shadow-2xl">
      <div className="mb-3 flex items-center gap-2">
        <span className="text-xl">🗺️</span>
        <h3 className="font-heading text-base font-bold text-white">Quick Guide</h3>
      </div>
      <ul className="space-y-2.5 text-xs text-slate-200/90">
        <li className="flex items-start gap-2 group">
          <span className="mt-0.5 font-bold text-cyan-300 transition-transform group-hover:scale-125">▸</span>
          <span className="leading-relaxed">Click <span className="font-semibold text-white">Polygon</span> button to draw danger zones</span>
        </li>
        <li className="flex items-start gap-2 group">
          <span className="mt-0.5 font-bold text-cyan-300 transition-transform group-hover:scale-125">▸</span>
          <span className="leading-relaxed">Click zones to view <span className="font-semibold text-white">details</span> and delete them</span>
        </li>
        <li className="flex items-start gap-2 group">
          <span className="mt-0.5 font-bold text-cyan-300 transition-transform group-hover:scale-125">▸</span>
          <span className="leading-relaxed"><span className="font-semibold text-white">Real-time alerts</span> when users enter zones</span>
        </li>
      </ul>

      <a
        href="https://github.com/MAHAVEER-IT/Geo-Guardian-App/releases/tag/Geo-Guardian-APK"
        target="_blank"
        rel="noreferrer"
        className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-cyan-300/40 bg-cyan-500/15 px-2.5 py-1.5 text-[11px] font-semibold text-cyan-100 transition-all duration-300 hover:-translate-y-0.5 hover:bg-cyan-500/25"
      >
        <span>Install APK</span>
        <span aria-hidden="true">↗</span>
      </a>
    </div>
  );
}

export default InstructionsPanel;
