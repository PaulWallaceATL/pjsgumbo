"use client";

import * as React from "react";

const FAVORITES_KEY = "pjs-recipe-favorites";
const RECENT_KEY = "pjs-recipe-recent";
const MAX_RECENT = 8;

function readJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function useRecipePrefs() {
  const [favorites, setFavorites] = React.useState<string[]>([]);
  const [recent, setRecent] = React.useState<string[]>([]);
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    setFavorites(readJson<string[]>(FAVORITES_KEY, []));
    setRecent(readJson<string[]>(RECENT_KEY, []));
    setReady(true);
  }, []);

  const persistFavorites = React.useCallback((next: string[]) => {
    setFavorites(next);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(next));
  }, []);

  const persistRecent = React.useCallback((next: string[]) => {
    setRecent(next);
    localStorage.setItem(RECENT_KEY, JSON.stringify(next));
  }, []);

  const toggleFavorite = React.useCallback(
    (slug: string) => {
      persistFavorites(
        favorites.includes(slug)
          ? favorites.filter((s) => s !== slug)
          : [...favorites, slug],
      );
    },
    [favorites, persistFavorites],
  );

  const markViewed = React.useCallback(
    (slug: string) => {
      const next = [slug, ...recent.filter((s) => s !== slug)].slice(0, MAX_RECENT);
      persistRecent(next);
    },
    [recent, persistRecent],
  );

  const isFavorite = React.useCallback(
    (slug: string) => favorites.includes(slug),
    [favorites],
  );

  return { favorites, recent, ready, toggleFavorite, markViewed, isFavorite };
}
