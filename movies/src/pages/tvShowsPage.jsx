import { useQuery } from "@tanstack/react-query";
import { getTVShows } from "../api/tmdb-api";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TVCard from "../components/tvCard";
import { useState } from "react";
import Pagination from "@mui/material/Pagination";
import Box from "@mui/material/Box";

const TVShowsPage = () => {
const [page, setPage] = useState(1);
const { data, error, isPending, isError,} = useQuery({
  queryKey: ["tvShows", page],
  queryFn: () => getTVShows(page),
});

if (isPending) {
  return <Typography>Loading TV shows...</Typography>;
}

if (isError) {
  return <p role="alert">{error.message}</p>;
}

const shows = data.results;

  return (
    <>
      <Typography variant="h4" sx={{ margin: 2, color: "white", fontWeight: 700 }}>
        TV Shows
      </Typography>

      <Grid container spacing={3} sx={{ padding: 2 }}>
        {shows.map(show => (
          <Grid key={show.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
           <TVCard show={show} />
          </Grid>
        ))}
      </Grid>

      <Box sx={{ display: "flex", justifyContent: "center", padding: 3 }}>
        <Pagination
          count={Math.min(data.total_pages, 500)}
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

export default TVShowsPage;