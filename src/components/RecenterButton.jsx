function RecenterButton({ userLocation, onRecenter }) {
  if (!userLocation) return null;

  return (
    <button
      onClick={onRecenter}
      className="absolute top-4 right-4 z-[1001] backdrop-blur-md bg-gradient-to-r from-blue-500/10 to-cyan-500/5 hover:from-blue-500/20 hover:to-cyan-500/15 text-white rounded-xl shadow-2xl px-5 py-3 transition-all duration-300 flex items-center gap-2.5 hover:scale-105 hover:shadow-blue-500/50 border border-white/30 group"
      title="Go to my location"
    >
      <span className="text-xl group-hover:scale-110 transition-transform duration-200">📍</span>
      <span className="font-semibold tracking-wide">My Location</span>
    </button>
  );
}

export default RecenterButton;
