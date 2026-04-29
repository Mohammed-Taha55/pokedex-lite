import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchPokemonDetail, getSpriteUrl, formatPokemonNumber } from "@/lib/api";
import { TYPE_COLORS, STAT_LABELS } from "@/lib/constants";

// generates <title> and meta description for each pokemon's page (good for SEO)
export async function generateMetadata({ params }) {
  const { id } = await params;
  try {
    const data = await fetchPokemonDetail(id);
    const name = data.name.charAt(0).toUpperCase() + data.name.slice(1);
    return {
      title: `${name} — Pokédex Lite`,
      description: `Stats, abilities and more for ${name}.`,
    };
  } catch {
    return { title: "Not found — Pokédex Lite" };
  }
}

// server component - data is fetched on the server before the page loads
export default async function PokemonPage({ params }) {
  const { id } = await params;

  let data;
  try {
    data = await fetchPokemonDetail(id);
  } catch {
    notFound();
  }

  const sprite = getSpriteUrl(data);
  const types = data.types || [];
  const mainType = types[0]?.type?.name || "normal";
  const typeColor = TYPE_COLORS[mainType]?.badge || "#A8A878";

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 pt-6">
        <Link href="/" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-red-500 transition">
          ← Back to Pokédex
        </Link>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6">
        <div className="rounded-3xl overflow-hidden shadow-md">

          {/* banner with pokemon sprite */}
          <div className="relative flex items-center justify-center py-10" style={{ backgroundColor: typeColor }}>
            <div className="relative w-40 h-40">
              {sprite && (
                <Image src={sprite} alt={data.name} fill sizes="160px" priority className="object-contain drop-shadow-2xl" />
              )}
            </div>
          </div>

          <div className="bg-white px-6 py-6 flex flex-col gap-5">

            {/* name, number, types */}
            <div>
              <p className="text-xs text-gray-400 font-mono">{formatPokemonNumber(data.id)}</p>
              <h1 className="text-3xl font-bold text-gray-800 capitalize">
                {data.name.replace(/-/g, " ")}
              </h1>
              <div className="flex gap-2 mt-2">
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

            {/* height / weight / base exp */}
            <div className="grid grid-cols-3 text-center bg-gray-50 rounded-2xl py-4 gap-2">
              <div>
                <p className="text-xs text-gray-400">Height</p>
                <p className="font-semibold text-gray-700">{(data.height / 10).toFixed(1)} m</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Weight</p>
                <p className="font-semibold text-gray-700">{(data.weight / 10).toFixed(1)} kg</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Base Exp</p>
                <p className="font-semibold text-gray-700">{data.base_experience ?? "—"}</p>
              </div>
            </div>

            {/* abilities */}
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">Abilities</p>
              <div className="flex flex-wrap gap-2">
                {data.abilities.map(({ ability, is_hidden }) => (
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

            {/* base stats */}
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Base Stats</p>
              <div className="flex flex-col gap-2">
                {data.stats.map(({ stat, base_stat }) => {
                  const pct = Math.min(100, Math.round((base_stat / 255) * 100));
                  return (
                    <div key={stat.name} className="flex items-center gap-3">
                      <span className="text-xs text-gray-500 font-mono w-14 shrink-0">
                        {STAT_LABELS[stat.name] || stat.name}
                      </span>
                      <span className="text-xs font-semibold text-gray-700 w-8 shrink-0 text-right">{base_stat}</span>
                      <div className="flex-1 bg-gray-100 rounded-full h-2 overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: typeColor }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}
