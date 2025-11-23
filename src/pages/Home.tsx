import { useState } from "react";
import { useGetList, useGetGenres } from "../proxy/api";
import { MovieCard } from "../components/MovieCard";
import { Pagination } from "../components/Pagination";

export function Home() {
  const [page, setPage] = useState(1);
  const { movies, totalPages, loading: loadingMovies } = useGetList(page);
  const { genres, loading: loadingGenres } = useGetGenres();

  if (loadingMovies || loadingGenres) return <p className="text-center text-white">Loading...</p>;

  return (
    <div className="p-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-6">
        {movies.map((movie: any) => (
          <MovieCard key={movie.id} movie={movie} genresMap={genres} />
        ))}
      </div>

      <Pagination page={page} totalPages={totalPages} setPage={setPage} />
    </div>
  );
}