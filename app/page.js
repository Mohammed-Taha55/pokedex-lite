"use client";

import { useState, useEffect } from "react";
import { usePokemon } from "@/hooks/usePokemon";
import { useFavorites } from "@/hooks/useFavorites";
import { fetchPokemonBatch } from "@/lib/api";
import Navbar from "@/components/Navbar";
import TypeFilter from "@/components/TypeFilter";
import PokemonGrid from "@/components/PokemonGrid";
import Pagination from "@/components/Pagination";
import PokemonModal from "@/components/PokemonModal";
import SkeletonGrid from "@/components/SkeletonGrid";
import ErrorMessage from "@/components/ErrorMessage";

export default function HomePage() {
  const {
    pokemonList,
    loading,
    error,
    page,
    totalPages,
    setPage,
    searchQuery,
    setSearchQuery,
    selectedType,
    setSelectedType,
  } = usePokemon();

  const { favorites, toggleFav, isFavorite } = useFavorites();

  const [showFavOnly, setShowFavOnly] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  // when favorites view is active, fetch ALL favorited pokemon by their ids
  // (we can't just filter the current page — favs might be on other pages)
  const [favList, setFavList] = useState([]);
  const [favLoading, setFavLoading] = useState(false);

  useEffect(() => {
    if (!showFavOnly) {
      setFavList([]);
      return;
    }

    if (favorites.size === 0) {
      setFavList([]);
      return;
    }

    setFavLoading(true);
    fetchPokemonBatch([...favorites])
      .then((data) => setFavList(data))
      .catch(() => setFavList([]))
      .finally(() => setFavLoading(false));
  }, [showFavOnly, favorites]);

  function handlePageChange(newPage) {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function getStatusText() {
    if (showFavOnly) return `${favList.length} favorite(s)`;
    if (selectedType) return `Type: ${selectedType} — page ${page} of ${totalPages}`;
    if (searchQuery.trim()) return `${pokemonList.length} result(s) for "${searchQuery.trim()}"`;
    return `Page ${page} of ${totalPages}`;
  }

  // decide what to render in the main area
  const isLoading = showFavOnly ? favLoading : loading;
  const displayList = showFavOnly ? favList : pokemonList;

  return (
    <main>
      <Navbar
        searchQuery={searchQuery}
        onSearchChange={(val) => {
          setShowFavOnly(false); // exit favorites mode when user starts searching
          setSearchQuery(val);
        }}
        showFavOnly={showFavOnly}
        onToggleFav={() => setShowFavOnly((v) => !v)}
      />

      <div className="max-w-7xl mx-auto px-4 pt-4">
        <TypeFilter
          selectedType={selectedType}
          onTypeChange={(type) => {
            setShowFavOnly(false); // exit favorites mode when a type is picked
            setSelectedType(type);
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-4">
        {!isLoading && !error && (
          <p className="text-xs text-gray-400 mb-4">{getStatusText()}</p>
        )}

        {isLoading ? (
          <SkeletonGrid />
        ) : error && !showFavOnly ? (
          <ErrorMessage message={error} />
        ) : (
          <>
            <PokemonGrid
              pokemonList={displayList}
              favorites={favorites}
              onToggleFav={toggleFav}
              onSelectPokemon={setSelectedPokemon}
            />
            {/* hide pagination when viewing favorites */}
            {!showFavOnly && (
              <Pagination page={page} totalPages={totalPages} onPageChange={handlePageChange} />
            )}
          </>
        )}
      </div>

      <footer className="text-center text-xs text-gray-400 py-6 border-t border-gray-200 mt-4">
        Data from{" "}
        <a href="https://pokeapi.co" target="_blank" rel="noreferrer" className="text-red-400 hover:underline">
          PokéAPI
        </a>
        {" "}• Pokédex Lite
      </footer>

      {selectedPokemon && (
        <PokemonModal
          pokemon={selectedPokemon}
          isFavorite={isFavorite(selectedPokemon.id)}
          onToggleFav={toggleFav}
          onClose={() => setSelectedPokemon(null)}
        />
      )}
    </main>
  );
}
