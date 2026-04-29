"use client";

import { useState, useEffect } from "react";

// keeps track of which pokemon the user has starred
// saves to localStorage so it survives a page refresh
export function useFavorites() {
  const [favorites, setFavorites] = useState(new Set());

  // load saved favorites when the component first mounts
  useEffect(() => {
    try {
      const saved = localStorage.getItem("pokedex-favorites");
      if (saved) {
        setFavorites(new Set(JSON.parse(saved)));
      }
    } catch {
      // storage might not be available in some browsers, just ignore
    }
  }, []);

  // save to localStorage whenever the favorites list changes
  useEffect(() => {
    try {
      localStorage.setItem("pokedex-favorites", JSON.stringify([...favorites]));
    } catch {
      // ignore
    }
  }, [favorites]);

  function toggleFav(id) {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  function isFavorite(id) {
    return favorites.has(id);
  }

  return { favorites, toggleFav, isFavorite };
}
