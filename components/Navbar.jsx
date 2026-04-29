"use client";

// navbar with the logo, search bar and favorites toggle

export default function Navbar({ searchQuery, onSearchChange, showFavOnly, onToggleFav }) {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col sm:flex-row items-center gap-3">

        {/* logo */}
        <div className="flex items-center gap-2 shrink-0">
          {/* pokeball icon built with css divs */}
          <div className="w-8 h-8 rounded-full border-2 border-gray-800 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-red-500" />
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-white" />
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-800 -translate-y-1/2" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-white rounded-full border-2 border-gray-800 z-10" />
          </div>
          <h1 className="text-xl font-bold text-gray-900 tracking-tight"> 
            Pokédex <span className="text-red-500">Lite</span>
          </h1>
        </div>

        {/* search box */}
        <div className="flex-1 w-full sm:max-w-md">
          <input
            id="search-input"
            type="text"
            placeholder="Search Pokémon by name..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full px-4 py-2 rounded-full border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition"
          />
        </div>

        {/* favorites filter toggle */}
        <button
          id="fav-toggle-btn"
          onClick={onToggleFav}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium border transition-all
            ${showFavOnly
              ? "bg-red-500 text-white border-red-500"
              : "bg-white text-gray-600 border-gray-300 hover:border-red-400 hover:text-red-500"
            }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={showFavOnly ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth={2}
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>
          Favorites
        </button>

      </div>
    </header>
  );
}
