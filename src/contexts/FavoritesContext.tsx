import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Movie } from "../types/Movie";

type Ctx = {
  favorites: Movie[];
  isFavorite: (id: number) => boolean;
  addFavorite: (movie: Movie) => void;
  removeFavorite: (id: number) => void;
  toggleFavorite: (movie: Movie) => void;
};

const FavoritesContext = createContext<Ctx | null>(null);
const STORAGE_KEY = "favorites";

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<Movie[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const ids = useMemo(() => new Set(
    favorites.map(f => f.id)
  ), [favorites]);

  const isFavorite = (id: number) => ids.has(id);

  const addFavorite = (movie: Movie) => {
    setFavorites(prev => (prev.some(m => m.id === movie.id) ? prev : [...prev, movie]));
  };

  const removeFavorite = (id: number) => {
    setFavorites(prev => prev.filter(m => m.id !== id));
  };

  const toggleFavorite = (movie: Movie) => {
    setFavorites(prev =>
      prev.some(m => m.id === movie.id)
        ? prev.filter(m => m.id !== movie.id)
        : [...prev, movie]
    );
  };

  const value = useMemo(() => (
    { favorites, isFavorite, addFavorite, removeFavorite, toggleFavorite }
  ), [favorites]);

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error("useFavorites must be used inside <FavoritesProvider>");
  return ctx;
}
