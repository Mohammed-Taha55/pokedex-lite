"use client";

import PokemonCard from "./PokemonCard";

export default function PokemonGrid({ pokemonList, favorites, onToggleFav, onSelectPokemon }) {
  if (pokemonList.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3 text-center">
        <span className="text-5xl">🔍</span>
        <p className="text-gray-600 font-semibold">No Pokémon found</p>
        <p className="text-gray-400 text-sm">Try a different search or remove the active filter.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {pokemonList.map((pokemon) => (
        <PokemonCard
          key={pokemon.id}
          pokemon={pokemon}
          isFavorite={favorites.has(pokemon.id)}
          onToggleFav={onToggleFav}
          onSelect={onSelectPokemon}
        />
      ))}
    </div>
  );
}
