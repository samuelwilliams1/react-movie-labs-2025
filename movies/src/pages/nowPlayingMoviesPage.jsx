import {useContext } from "react";
import {useQuery } from "@tanstack/react-query";
import Spinner from "../components/spinner";
import PageTemplate from "../components/templateMovieListPage";
import { getNowPlayingMovies } from "../api/tmdb-api";
import { MoviesContext } from "../contexts/moviesContext";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import IconButton from "@mui/material/IconButton";

const NowPlayingMoviesPage = () => {
  const { addToMustWatch } = useContext(MoviesContext);

    const {
      data: movies = [],
      error,
      isPending,
      isError,
    } = useQuery({
      queryKey: ["nowPlayingMovies"],
      queryFn: getNowPlayingMovies,
    });

  if (isPending) return <Spinner />;
  if (isError) return <p role="alert">{error.message}</p>;

return (
  <PageTemplate
    title="Now Playing Movies"
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

export default NowPlayingMoviesPage;