"use client";

import { useState, useEffect } from "react";
import { fetchPokemonList, fetchPokemonBatch, fetchPokemonByType } from "@/lib/api";
import { PAGE_SIZE, TOTAL_POKEMON } from "@/lib/constants";

export function usePokemon() {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedType, setSelectedType] = useState(null);

  const [allItems, setAllItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // wait 400ms after the user stops typing before actually searching
  useEffect(() => {
    const t = setTimeout(() => {
      setDebouncedSearch(searchQuery.trim().toLowerCase());
    }, 400);
    return () => clearTimeout(t);
  }, [searchQuery]);

  // reset to page 1 when filter or search changes
  useEffect(() => {
    setPage(1);
  }, [selectedType, debouncedSearch]);

  useEffect(() => {
    let canceled = false;
    setLoading(true);
    setError(null);

    async function load() {
      try {
        let data = [];

        if (debouncedSearch) {
          // search: grab all pokemon names then filter which match
          const list = await fetchPokemonList(0, TOTAL_POKEMON);
          const matches = list.results
            .filter((p) => p.name.includes(debouncedSearch))
            .slice(0, 50);
          data = await fetchPokemonBatch(matches.map((p) => p.name));

        } else if (selectedType) {
          // type filter: the /type endpoint gives us all pokemon of that type
          const typeData = await fetchPokemonByType(selectedType);
          data = await fetchPokemonBatch(typeData.map((e) => e.pokemon.name));

        } else {
          // normal browse - just load the current page
          const offset = (page - 1) * PAGE_SIZE;
          const list = await fetchPokemonList(offset, PAGE_SIZE);
          data = await fetchPokemonBatch(list.results.map((p) => p.name));
        }

        if (!canceled) setAllItems(data);
      } catch (err) {
        if (!canceled) setError(err.message || "Something went wrong");
      } finally {
        if (!canceled) setLoading(false);
      }
    }

    load();
    return () => { canceled = true; };
  }, [page, selectedType, debouncedSearch]);

  // for search/type results we have everything in memory, so paginate here
  let pokemonList = allItems;
  let totalPages = 1;

  if (selectedType || debouncedSearch) {
    totalPages = Math.max(1, Math.ceil(allItems.length / PAGE_SIZE));
    const start = (page - 1) * PAGE_SIZE;
    pokemonList = allItems.slice(start, start + PAGE_SIZE);
  } else {
    totalPages = Math.ceil(TOTAL_POKEMON / PAGE_SIZE);
  }

  return {
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
  };
}
