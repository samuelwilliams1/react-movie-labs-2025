import { useState, useEffect, useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { getTopRatedMovies } from "../api/tmdb-api";
import Button from "@mui/material/Button";
import { MoviesContext } from "../contexts/moviesContext";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import IconButton from "@mui/material/IconButton";

const TopRatedMoviesPage = () => {
  const { addToFavorites: addFavorite } = useContext(MoviesContext);
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");
  const { addToMustWatch } = useContext(MoviesContext);

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
    getTopRatedMovies()
      .then(movies => {
        if (!Array.isArray(movies)) {
          throw new Error("Could not load top rated movies.");
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
    title="Top Rated Movies"
    movies={movies}
    action={(movie) => (
      <IconButton
        aria-label="Add to must watch"
        onClick={() => addToMustWatch(movie)}
      >
        <PlaylistAddIcon />
      </IconButton>
    )}
  />
);

};

export default TopRatedMoviesPage;