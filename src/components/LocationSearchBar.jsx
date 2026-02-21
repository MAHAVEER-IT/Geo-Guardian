function LocationSearchBar({ searchQuery, setSearchQuery, onSearch }) {
  return (
    <form onSubmit={onSearch} className="absolute top-4 left-1/2 transform -translate-x-1/2 z-[1001] backdrop-blur-md bg-gradient-to-br from-white/10 to-white/5 rounded-xl shadow-2xl border border-white/30 transition-all duration-300 hover:shadow-xl">
      <div className="flex items-center gap-2 px-4 py-3">
        <svg className="w-5 h-5 text-white/60" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search location by name..."
          className="bg-transparent text-white placeholder-white/50 outline-none w-64 text-sm font-medium"
        />
        <button
          type="submit"
          className="bg-gradient-to-r from-green-500/20 to-emerald-500/15 hover:from-green-500/30 hover:to-emerald-500/25 text-white px-4 py-1.5 rounded-lg transition-all duration-300 text-sm font-semibold border border-white/20 hover:scale-105"
        >
          Search
        </button>
      </div>
    </form>
  );
}

export default LocationSearchBar;
