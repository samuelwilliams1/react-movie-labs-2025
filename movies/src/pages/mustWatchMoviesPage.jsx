import { useContext } from "react";
import { useQueries } from "@tanstack/react-query";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { getMovie } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import RemoveFromMustWatch from "../components/cardIcons/removeFromMustWatch";

const MustWatchMoviesPage = () => {
  const { mustWatch: movieIds } = useContext(MoviesContext);

  const movieQueries = useQueries({
    queries: movieIds.map((movieId) => ({
      queryKey: ["movie", { id: String(movieId) }],
      queryFn: getMovie,
    })),
  });

  if (movieQueries.some((query) => query.isPending)) {
    return <Spinner />;
  }

  const failedQuery = movieQueries.find((query) => query.isError);

  if (failedQuery) {
    return (
      <p role="alert">
        {failedQuery.error?.message || "Could not load your must watch movies."}
      </p>
    );
  }

  const movies = movieQueries.map(({ data }) => ({
    ...data,
    genre_ids: data.genres.map((genre) => genre.id),
  }));

  return (
    <>
      {movieIds.length === 0 && (
        <p>Add movies using the Must Watch button on a movie card.</p>
      )}

      <PageTemplate
        title="Must Watch Movies"
        movies={movies}
        action={(movie) => <RemoveFromMustWatch movie={movie} />}
      />
    </>
  );
};

export default MustWatchMoviesPage;