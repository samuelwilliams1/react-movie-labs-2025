import { useQuery } from "@tanstack/react-query";
import { getTVShows } from "../api/tmdb-api";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TVCard from "../components/tvCard";

const TVShowsPage = () => {
const {
  data: shows = [],
  error,
  isPending,
  isError,
} = useQuery({
  queryKey: ["tvShows"],
  queryFn: getTVShows,
});

if (isPending) {
  return <Typography>Loading TV shows...</Typography>;
}

if (isError) {
  return <p role="alert">{error.message}</p>;
}

  return (
    <>
      <Typography variant="h4" sx={{ margin: 2 }}>
        TV Shows
      </Typography>

      <Grid container spacing={3} sx={{ padding: 2 }}>
        {shows.map(show => (
          <Grid key={show.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
           <TVCard show={show} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default TVShowsPage;