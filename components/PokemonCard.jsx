"use client";

import Image from "next/image";
import { getSpriteUrl, formatPokemonNumber } from "@/lib/api";
import { TYPE_COLORS } from "@/lib/constants";

export default function PokemonCard({ pokemon, isFavorite, onToggleFav, onSelect }) {
  const sprite = getSpriteUrl(pokemon);
  const types = pokemon.types || [];
  const mainType = types[0]?.type?.name || "normal";
  const typeColor = TYPE_COLORS[mainType]?.badge || "#A8A878";

  return (
    <div
      id={`card-${pokemon.id}`}
      onClick={() => onSelect(pokemon)}
      className="relative group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-200 cursor-pointer hover:-translate-y-1 overflow-hidden"
    >
      {/* colored tint at the top based on pokemon's main type */}
      <div
        className="absolute inset-x-0 top-0 h-20 opacity-20"
        style={{ backgroundColor: typeColor }}
      />

      {/* heart button to save/unsave as favorite */}
      <button
        id={`fav-btn-${pokemon.id}`}
        onClick={(e) => {
          e.stopPropagation(); // don't open modal when clicking heart
          onToggleFav(pokemon.id);
        }}
        className={`absolute top-2 right-2 z-10 p-1.5 rounded-full transition-all
          ${isFavorite ? "text-red-500 bg-red-50" : "text-gray-300 bg-white hover:text-red-400"}`}
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill={isFavorite ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth={2}
          className="w-4 h-4"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
        </svg>
      </button>

      <div className="p-4 flex flex-col items-center gap-2">
        <span className="text-xs text-gray-400 font-mono self-start">
          {formatPokemonNumber(pokemon.id)}
        </span>

        <div className="relative w-24 h-24 group-hover:scale-110 transition-transform duration-300">
          {sprite ? (
            <Image
              src={sprite}
              alt={pokemon.name}
              fill
              sizes="96px"
              className="object-contain drop-shadow-md"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-300 text-3xl">?</div>
          )}
        </div>

        <p className="font-semibold text-gray-800 text-sm capitalize text-center leading-tight">
          {pokemon.name.replace(/-/g, " ")}
        </p>

        <div className="flex gap-1 flex-wrap justify-center">
          {types.map(({ type }) => (
            <span
              key={type.name}
              className="text-white text-xs px-2 py-0.5 rounded-full capitalize font-medium"
              style={{ backgroundColor: TYPE_COLORS[type.name]?.badge || "#ccc" }}
            >
              {type.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
