// pokeapi base url
const BASE = "https://pokeapi.co/api/v2";

// get a page of pokemon - just names and urls, no sprites or stats
export async function fetchPokemonList(offset = 0, limit = 20) {
  const res = await fetch(`${BASE}/pokemon?offset=${offset}&limit=${limit}`);
  if (!res.ok) throw new Error("Couldn't load pokemon list");
  return res.json();
}

// get full data for one pokemon by name or id number
export async function fetchPokemonDetail(nameOrId) {
  const res = await fetch(`${BASE}/pokemon/${nameOrId}`);
  if (!res.ok) throw new Error(`Couldn't load ${nameOrId}`);
  return res.json();
}

// get all pokemon of a given type (firee, water etc)
export async function fetchPokemonByType(type) {
  const res = await fetch(`${BASE}/type/${type}`);
  if (!res.ok) throw new Error(`Couldn't load type ${type}`);
  const data = await res.json();
  return data.pokemon;
}

// fetch a bunch of pokemon in parallel, skip any  that fail
export async function fetchPokemonBatch(names) {
  const results = await Promise.all(
    names.map((n) => fetchPokemonDetail(n).catch(() => null))
  );
  return results.filter(Boolean);
}

// get the best available sprite for a pokemon
export function getSpriteUrl(pokemon) {
  return (
    pokemon?.sprites?.other?.["official-artwork"]?.front_default ||
    pokemon?.sprites?.front_default ||
    null
  );
}

// turns 25 into "#0025"
export function formatPokemonNumber(id) {
  return `#${String(id).padStart(4, "0")}`;
}
