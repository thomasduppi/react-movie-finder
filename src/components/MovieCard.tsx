import { useState } from "react";
import type { Movie } from "../types/Movie";
import { useFavorites } from "../contexts/FavoritesContext";

interface MovieCardProps {
  movie: Movie;
  genresMap: Record<number, string>;
}

export function MovieCard({ movie, genresMap }: MovieCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { isFavorite, toggleFavorite } = useFavorites();

  const hasPoster = Boolean(movie.poster_path);
  const posterUrl = hasPoster
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : null;

  const genres = movie.genre_ids
    .map((id) => genresMap[id])
    .filter(Boolean)
    .join(", ");

  const fav = isFavorite(movie.id);

  return (
    <div className="w-48 transition-transform duration-200 hover:scale-105">
      <div className="relative" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        <button
          type="button"
          aria-label={fav ? "Remove from favorites" : "Add to favorites"}
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(movie);
          }}
          className={`absolute right-2 top-2 z-10 rounded-full px-2 py-1 text-sm shadow 
            ${fav ? "bg-red-600 text-white" : "bg-gray-900/80 text-white hover:bg-gray-800"}`}
        >
          {fav ? "♥" : "♡"}
        </button>

        {!hasPoster ? (
          <div className="bg-black/90 text-white p-3 rounded-lg overflow-y-auto h-72 text-sm">
            <p className="text-gray-300">{movie.overview}</p>
          </div>
        ) : (
          <>
            <img src={posterUrl!} alt={movie.title} className="rounded-lg shadow-md w-full h-auto"/>
            {isHovered && (
              <div className="absolute inset-0 bg-black/90 text-white p-3 pt-8 text-sm rounded-lg overflow-y-auto">
                <p className="text-gray-300">{movie.overview}</p>
              </div>
            )}
          </>
        )}
      </div>

      <h3 className="text-black font-semibold mt-2 text-sm">{movie.title}</h3>
      <p className="text-gray-400 text-xs">{movie.release_date?.slice(0, 4)}</p>
      <p className="text-xs text-blue-300">{genres}</p>
      <p className="font-bold text-yellow-400 mb-1">
        Rating : {Math.round(movie.vote_average * 10) / 10}/10 ⭐
      </p>
    </div>
  );
}
