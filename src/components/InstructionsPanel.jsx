function InstructionsPanel() {
  return (
    <div className="absolute bottom-4 left-4 z-[1001] backdrop-blur-md bg-gradient-to-br from-white/10 to-white/5 rounded-xl shadow-2xl p-5 max-w-sm border border-white/30 transition-all duration-300 hover:shadow-xl">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xl">🗺️</span>
        <h3 className="font-bold text-white text-base">Quick Guide</h3>
      </div>
      <ul className="text-xs text-white/80 space-y-2.5">
        <li className="flex items-start gap-2 group">
          <span className="text-purple-400 font-bold mt-0.5 group-hover:scale-125 transition-transform">▸</span>
          <span className="leading-relaxed">Click <span className="font-semibold text-purple-400">Polygon</span> button to draw danger zones</span>
        </li>
        <li className="flex items-start gap-2 group">
          <span className="text-blue-400 font-bold mt-0.5 group-hover:scale-125 transition-transform">▸</span>
          <span className="leading-relaxed">Click zones to view <span className="font-semibold text-blue-300">details</span> and delete them</span>
        </li>
        <li className="flex items-start gap-2 group">
          <span className="text-cyan-400 font-bold mt-0.5 group-hover:scale-125 transition-transform">▸</span>
          <span className="leading-relaxed"><span className="font-semibold text-cyan-400">Real-time alerts</span> when users enter zones</span>
        </li>
      </ul>
    </div>
  );
}

export default InstructionsPanel;
