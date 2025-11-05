import { useState } from "react";

interface Movie {
  id: number;
  poster_path: string | null;
  title: string;
  release_date: string;
  vote_average: number;
  overview: string;
  genre_ids: number[];
}

interface MovieCardProps {
  movie: Movie;
  genresMap: Record<number, string>;
}

export function MovieCard({ movie, genresMap }: MovieCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Image";

  const genres = movie.genre_ids
    .map((id) => genresMap[id])
    .filter(Boolean)
    .join(", ");

  return (
    <div className="w-48 cursor-pointer transition-transform duration-200 hover:scale-105">
      <div className="relative" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        <img src={posterUrl} alt={movie.title} className="rounded-lg shadow-md w-full h-auto"/>
        {isHovered && (
          <div className="absolute inset-0 bg-black/90 text-white p-3 text-sm rounded-lg overflow-y-auto">
            <p className="text-gray-300">{movie.overview}</p>
            <p className="font-bold text-yellow-400 mb-1">Rating : {movie.vote_average} ⭐</p>
          </div>
        )}
      </div>

      <h3 className="text-black font-semibold mt-2 text-sm">{movie.title}</h3>
      <p className="text-gray-400 text-xs">{movie.release_date?.slice(0, 4)}</p>
      <p className="text-xs text-blue-300">{genres}</p>
    </div>
  );
}
