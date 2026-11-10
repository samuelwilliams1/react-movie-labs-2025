import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router";
import { getTVShow } from "../api/tmdb-api";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TVDetails from "../components/tvDetails";
import img from "../images/film-poster-placeholder.png";

export default function TVDetailsPage() {
  const { id } = useParams();

  const {
    data: show,
    error,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["tv", { id: String(id) }],
    queryFn: () => getTVShow(id),
    enabled: Boolean(id),
  });

  if (isError) {
    return <Typography role="alert">{error.message}</Typography>;
  }

  if (isPending) {
    return <Typography>Loading TV details...</Typography>;
  }
  
  return (
    <>
      <Paper sx={{ padding: 2, marginBottom: 2, textAlign: "center" }}>
        <Button component={Link} to="/tv">Back to TV Shows</Button>
        <Typography variant="h4" component="h1">{show.name}</Typography>
        {show.tagline && <Typography variant="h6">{show.tagline}</Typography>}
      </Paper>
      <Grid container spacing={3} sx={{ padding: 2 }}>
        <Grid size={{ xs: 12, md: 3 }}>
          <img
            src={show.poster_path ? `https://image.tmdb.org/t/p/w500${show.poster_path}` : img}
            alt={show.name}
            style={{ width: "100%", display: "block" }}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 9 }}>
          <TVDetails show={show} />
        </Grid>
      </Grid>
    </>
  );
}

