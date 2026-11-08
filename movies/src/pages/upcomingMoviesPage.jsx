import { useState, useEffect } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { getUpcomingMovies } from "../api/tmdb-api";

const UpcomingMoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");

  const addToFavorites = (movieId) => {
    const selectedMovie = movies.find(movie => movie.id === movieId);
    if (!selectedMovie) return;

    const favorites = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );

    if (!favorites.some(movie => movie.id === movieId)) {
      localStorage.setItem(
        "favorites",
        JSON.stringify([
          ...favorites,
          { ...selectedMovie, favorite: true }
        ])
      );
    }

    setMovies(currentMovies =>
      currentMovies.map(movie =>
        movie.id === movieId
          ? { ...movie, favorite: true }
          : movie
      )
    );
  };

  useEffect(() => {
    getUpcomingMovies()
      .then(movies => {
        if (!Array.isArray(movies)) {
          throw new Error("Could not load upcoming movies.");
        }

        const favorites = JSON.parse(
          localStorage.getItem("favorites") || "[]"
        );

        setMovies(
          movies.map(movie => ({
            ...movie,
            favorite: favorites.some(
              favorite => favorite.id === movie.id
            )
          }))
        );
      })
      .catch(error => setError(error.message));
  }, []);

  if (error) {
    return <p role="alert">{error}</p>;
  }

  return (
    <PageTemplate
      title="Upcoming Movies"
      movies={movies}
      selectFavorite={addToFavorites}
    />
  );
};

export default UpcomingMoviesPage;