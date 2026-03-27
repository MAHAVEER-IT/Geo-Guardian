function DrawingControls({ onZoomIn, onZoomOut }) {
  const handleDrawPolygon = () => {
    const polygonBtn = document.querySelector('.leaflet-draw-draw-polygon');
    if (polygonBtn) polygonBtn.click();
  };

  return (
    <div className="absolute right-4 top-20 z-[1001] flex flex-col gap-2">
      {/* Draw Polygon Button */}
      <button
        onClick={handleDrawPolygon}
        className="group flex min-w-[148px] items-center gap-2.5 rounded-2xl border border-white/30 bg-slate-900/50 px-4 py-3 text-slate-100 shadow-xl shadow-slate-900/35 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-900/60"
        title="Draw Polygon Zone"
      >
        <svg className="h-6 w-6 text-sky-600 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          <polygon points="12,2 4,8 6,16 18,16 20,8" fill="none" stroke="currentColor" strokeWidth="2.5"/>
        </svg>
        <span className="text-sm font-semibold">Polygon</span>
      </button>

      {/* Zoom Controls Row */}
      <div className="flex flex-row gap-2">
        {/* Zoom In Button */}
        <button
          onClick={onZoomIn}
          className="group flex h-11 w-11 items-center justify-center rounded-xl border border-white/30 bg-slate-900/50 text-slate-100 shadow-lg shadow-slate-900/35 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-900/60"
          title="Zoom In"
        >
          <svg className="h-5 w-5 text-emerald-600 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
          </svg>
        </button>

        {/* Zoom Out Button */}
        <button
          onClick={onZoomOut}
          className="group flex h-11 w-11 items-center justify-center rounded-xl border border-white/30 bg-slate-900/50 text-slate-100 shadow-lg shadow-slate-900/35 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-900/60"
          title="Zoom Out"
        >
          <svg className="h-5 w-5 text-amber-600 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM7 10h6" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default DrawingControls;
