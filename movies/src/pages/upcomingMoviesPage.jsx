import {useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../components/spinner";
import PageTemplate from "../components/templateMovieListPage";
import { getUpcomingMovies } from "../api/tmdb-api";
import { MoviesContext } from "../contexts/moviesContext";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import IconButton from "@mui/material/IconButton";

const UpcomingMoviesPage = () => {
  const { addToMustWatch } = useContext(MoviesContext);

   const {
    data: movies = [],
    error,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["upcomingMovies"],
    queryFn: getUpcomingMovies,
  });

  if (isPending) return <Spinner />;
  if (isError) return <p role="alert">{error.message}</p>;


return (
  <PageTemplate
    title="Upcoming Movies"
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

export default UpcomingMoviesPage;