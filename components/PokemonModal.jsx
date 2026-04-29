"use client";

import { useEffect } from "react";
import Image from "next/image";
import { getSpriteUrl, formatPokemonNumber } from "@/lib/api";
import { TYPE_COLORS, STAT_LABELS } from "@/lib/constants";
import { usePokemonDetail } from "@/hooks/usePokemonDetail";
import LoadingSpinner from "./LoadingSpinner";

export default function PokemonModal({ pokemon, isFavorite, onToggleFav, onClose }) {
  const { detail, loading, error } = usePokemonDetail(pokemon?.name);

  // close on Escape key
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  // lock background scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  if (!pokemon) return null;

  const data = detail || pokemon;
  const sprite =
    detail?.sprites?.other?.["official-artwork"]?.front_default ||
    getSpriteUrl(pokemon);

  const types = data.types || [];
  const mainType = types[0]?.type?.name || "normal";
  const typeColor = TYPE_COLORS[mainType]?.badge || "#A8A878";

  return (
    <div
      id="modal-backdrop"
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn"
    >
      <div
        id="pokemon-modal"
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto animate-slideUp"
      >
        {/* colored header */}
        <div
          className="relative h-36 rounded-t-3xl"
          style={{ backgroundColor: typeColor }}
        >
          {/* close button */}
          <button
            id="modal-close-btn"
            onClick={onClose}
            className="absolute top-3 right-3 text-white/80 hover:text-white bg-black/20 hover:bg-black/30 rounded-full p-1.5 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* favorite toggle */}
          <button
            id={`modal-fav-btn-${data.id}`}
            onClick={() => onToggleFav(data.id)}
            className={`absolute top-3 left-3 p-1.5 rounded-full transition
              ${isFavorite ? "text-red-500 bg-white" : "text-white bg-black/20 hover:bg-black/30"}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={isFavorite ? "currentColor" : "none"} stroke="currentColor" strokeWidth={2} className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
          </button>

          {/* sprite overlaps the header */}
          <div className="absolute -bottom-14 left-1/2 -translate-x-1/2 w-28 h-28">
            {sprite && (
              <Image src={sprite} alt={data.name} fill sizes="112px" className="object-contain drop-shadow-xl" />
            )}
          </div>
        </div>

        {/* body */}
        <div className="pt-16 px-6 pb-6 flex flex-col gap-4">

          {/* name and types */}
          <div className="text-center">
            <p className="text-xs text-gray-400 font-mono">{formatPokemonNumber(data.id)}</p>
            <h2 className="text-2xl font-bold text-gray-800 capitalize">
              {data.name?.replace(/-/g, " ")}
            </h2>
            <div className="flex gap-2 justify-center mt-2">
              {types.map(({ type }) => (
                <span
                  key={type.name}
                  className="text-white text-xs px-3 py-1 rounded-full capitalize font-semibold"
                  style={{ backgroundColor: TYPE_COLORS[type.name]?.badge || "#ccc" }}
                >
                  {type.name}
                </span>
              ))}
            </div>
          </div>

          {/* height, weight, base exp */}
          {detail && (
            <div className="flex justify-around text-center bg-gray-50 rounded-2xl py-3">
              <div>
                <p className="text-xs text-gray-400">Height</p>
                <p className="font-semibold text-gray-700 text-sm">{(detail.height / 10).toFixed(1)} m</p>
              </div>
              <div className="w-px bg-gray-200" />
              <div>
                <p className="text-xs text-gray-400">Weight</p>
                <p className="font-semibold text-gray-700 text-sm">{(detail.weight / 10).toFixed(1)} kg</p>
              </div>
              <div className="w-px bg-gray-200" />
              <div>
                <p className="text-xs text-gray-400">Base Exp</p>
                <p className="font-semibold text-gray-700 text-sm">{detail.base_experience ?? "—"}</p>
              </div>
            </div>
          )}

          {/* abilities */}
          {detail?.abilities?.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1">Abilities</p>
              <div className="flex flex-wrap gap-2">
                {detail.abilities.map(({ ability, is_hidden }) => (
                  <span
                    key={ability.name}
                    className={`text-xs px-3 py-1 rounded-full capitalize border font-medium
                      ${is_hidden ? "border-dashed border-gray-400 text-gray-500" : "bg-gray-100 border-gray-200 text-gray-700"}`}
                  >
                    {ability.name.replace(/-/g, " ")}{is_hidden && " (hidden)"}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* base stats */}
          {loading && <LoadingSpinner />}
          {error && <p className="text-red-400 text-sm text-center">{error}</p>}
          {detail?.stats?.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">Base Stats</p>
              <div className="flex flex-col gap-2">
                {detail.stats.map(({ stat, base_stat }) => {
                  const pct = Math.min(100, Math.round((base_stat / 255) * 100));
                  return (
                    <div key={stat.name} className="flex items-center gap-3">
                      <span className="text-xs text-gray-500 font-mono w-14 shrink-0">
                        {STAT_LABELS[stat.name] || stat.name}
                      </span>
                      <span className="text-xs font-semibold text-gray-700 w-8 shrink-0 text-right">{base_stat}</span>
                      <div className="flex-1 bg-gray-100 rounded-full h-2 overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-700"
                          style={{ width: `${pct}%`, backgroundColor: typeColor }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
