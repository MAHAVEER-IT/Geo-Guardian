function DrawingControls({ onZoomIn, onZoomOut }) {
  const handleDrawPolygon = () => {
    const polygonBtn = document.querySelector('.leaflet-draw-draw-polygon');
    if (polygonBtn) polygonBtn.click();
  };

  return (
    <div className="absolute top-20 right-4 z-[1001] flex flex-col gap-2">
      {/* Draw Polygon Button */}
      <button
        onClick={handleDrawPolygon}
        className="backdrop-blur-md bg-gradient-to-br from-purple-500/10 to-pink-500/5 hover:from-purple-500/20 hover:to-pink-500/15 text-white rounded-xl shadow-2xl px-4 py-3 transition-all duration-300 hover:scale-105 hover:shadow-purple-500/50 border border-white/30 group flex items-center gap-2.5 min-w-[140px]"
        title="Draw Polygon Zone"
      >
        <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          <polygon points="12,2 4,8 6,16 18,16 20,8" fill="none" stroke="currentColor" strokeWidth="2.5"/>
        </svg>
        <span className="font-semibold">Polygon</span>
      </button>

      {/* Zoom Controls Row */}
      <div className="flex flex-row gap-2">
        {/* Zoom In Button */}
        <button
          onClick={onZoomIn}
          className="backdrop-blur-md bg-gradient-to-br from-green-500/10 to-emerald-500/5 hover:from-green-500/20 hover:to-emerald-500/15 text-white rounded-full shadow-2xl w-12 h-12 transition-all duration-300 hover:scale-110 hover:shadow-green-500/50 border border-white/30 group flex items-center justify-center"
          title="Zoom In"
        >
          <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
          </svg>
        </button>

        {/* Zoom Out Button */}
        <button
          onClick={onZoomOut}
          className="backdrop-blur-md bg-gradient-to-br from-amber-500/10 to-orange-500/5 hover:from-amber-500/20 hover:to-orange-500/15 text-white rounded-full shadow-2xl w-12 h-12 transition-all duration-300 hover:scale-110 hover:shadow-amber-500/50 border border-white/30 group flex items-center justify-center"
          title="Zoom Out"
        >
          <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM7 10h6" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default DrawingControls;
