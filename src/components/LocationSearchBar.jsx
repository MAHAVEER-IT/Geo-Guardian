function LocationSearchBar({ searchQuery, setSearchQuery, onSearch }) {
  return (
    <form
      onSubmit={onSearch}
      className="absolute left-1/2 top-4 z-[1001] w-[92%] max-w-xl -translate-x-1/2 rounded-2xl border border-white/30 bg-slate-900/50 shadow-xl shadow-slate-900/35 backdrop-blur-md transition-all duration-300 hover:bg-slate-900/60 hover:shadow-2xl"
    >
      <div className="flex items-center gap-2 px-3 py-2 md:px-4 md:py-3">
        <svg className="h-5 w-5 text-slate-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search location by name..."
          className="w-full bg-transparent text-sm font-medium text-white outline-none placeholder:text-slate-300/80"
        />
        <button
          type="submit"
          className="rounded-xl bg-gradient-to-r from-sky-600 to-cyan-500 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-sky-300/40 transition-all duration-300 hover:-translate-y-0.5 hover:from-sky-700 hover:to-cyan-600"
        >
          Search
        </button>
      </div>
    </form>
  );
}

export default LocationSearchBar;
