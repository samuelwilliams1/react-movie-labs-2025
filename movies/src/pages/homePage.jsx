import { getMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites';
import { useState } from "react";
import Pagination from "@mui/material/Pagination";
import Box from "@mui/material/Box";

const HomePage = () => {
  const [page, setPage] = useState(1);
  const [yearFilter, setYearFilter] = useState("");

  const { data, error, isPending, isError, isFetching } = useQuery({
    queryKey: ['discover', page, yearFilter],
    queryFn: () => getMovies(page, yearFilter),
    placeholderData: (previousData) => previousData,
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const movies = data.results;

  // Redundant, but necessary to avoid app crashing.
  const favorites = movies.filter(m => m.favorite);
  localStorage.setItem('favorites', JSON.stringify(favorites));
  const addToFavorites = (movieId) => true;

  return (
    <>
    <PageTemplate
  title="Discover Movies"
  movies={movies}
  action={(movie) => <AddToFavoritesIcon movie={movie} />}
  selectedYear={yearFilter}
  onYearChange={(year) => {
    setYearFilter(year);
    setPage(1);
  }}
/>

      <Box sx={{ display: "flex", justifyContent: "center", padding: 3 }}>
        <Pagination
          disabled={isFetching || data.total_pages === 0}
          count={Math.max(1, Math.min(data.total_pages, 500))}
          page={page}
          onChange={(_, value) => { setPage(value);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          color="primary"
          sx={{
            "& .MuiPaginationItem-root": {
                color: "white",
            },
        }}
        />
      </Box>
    </>
    );
};
export default HomePage;
