import { useFavorites } from "../contexts/FavoritesContext";
import {MovieCard} from "../components/MovieCard";
import { useGetGenres } from "../proxy/api";

export function FavoritesPage() {
  const { favorites } = useFavorites();
    const { genres, loading, error } = useGetGenres();

  if (loading) return <p className="p-4">Loading…</p>;
  if (error) return <p className="p-4">Error loading genres.</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-4">My Favorites</h1>

      {favorites.length === 0 ? (
        <p className="text-gray-500">No favorites yet. Add some from the Home page ♥</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {favorites.map((m) => (
            <MovieCard key={m.id} movie={m} genresMap={genres} />
          ))}
        </div>
      )}
    </div>
  );
}
