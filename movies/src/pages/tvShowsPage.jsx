import { useEffect, useState } from "react";
import { getTVShows } from "../api/tmdb-api";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import StarRateIcon from "@mui/icons-material/StarRate";
import img from "../images/film-poster-placeholder.png";

const TVShowsPage = () => {
  const [shows, setShows] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    getTVShows()
      .then(results => {
        if (!Array.isArray(results)) {
          throw new Error("Could not load TV shows.");
        }
        setShows(results);
      })
      .catch(error => setError(error.message));
  }, []);

  if (error) return <p role="alert">{error}</p>;

  return (
    <>
      <Typography variant="h4" sx={{ margin: 2 }}>
        TV Shows
      </Typography>

      <Grid container spacing={3} sx={{ padding: 2 }}>
        {shows.map(show => (
          <Grid key={show.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Card>
              <CardHeader title={show.name} />

              <CardMedia
                component="img"
                sx={{ height: 500, objectFit: "cover" }}
                image={
                  show.poster_path
                    ? `https://image.tmdb.org/t/p/w500${show.poster_path}`
                    : img
                }
                alt={show.name}
              />

              <CardContent>
                <Typography>
                  <CalendarIcon fontSize="small" />{" "}
                  {show.first_air_date || "Date unavailable"}
                </Typography>

                <Typography>
                  <StarRateIcon fontSize="small" />{" "}
                  {show.vote_average}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default TVShowsPage;