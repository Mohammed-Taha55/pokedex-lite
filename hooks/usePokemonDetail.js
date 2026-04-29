"use client";

import { useState, useEffect } from "react";
import { fetchPokemonDetail } from "@/lib/api";

// loads the full detail for one pokemon when the modal opens
export function usePokemonDetail(nameOrId) {
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!nameOrId) {
      setDetail(null);
      return;
    }

    let canceled = false;
    setLoading(true);
    setError(null);

    fetchPokemonDetail(nameOrId)
      .then((d) => {
        if (!canceled) setDetail(d);
      })
      .catch((err) => {
        if (!canceled) setError(err.message || "Failed to load");
      })
      .finally(() => {
        if (!canceled) setLoading(false);
      });

    return () => { canceled = true; };
  }, [nameOrId]);

  return { detail, loading, error };
}
