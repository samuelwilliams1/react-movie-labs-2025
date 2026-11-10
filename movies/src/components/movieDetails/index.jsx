import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationIcon from "@mui/icons-material/MonetizationOn";
import StarRate from "@mui/icons-material/StarRate";
import NavigationIcon from "@mui/icons-material/Navigation";
import Fab from "@mui/material/Fab";
import Typography from "@mui/material/Typography";
import { useState, useEffect} from "react";
import {useQuery } from "@tanstack/react-query";
import Drawer from "@mui/material/Drawer";
import MovieReviews from "../movieReviews"
import { getMovieWatchProviders } from "../../api/tmdb-api";



const root = {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: 1.5,
    margin: 0,
};
const chip = { margin: 0.5 };

const MovieDetails = ({ movie }) => {  
const [drawerOpen, setDrawerOpen] = useState(false);
const {
    data: providersResults,
    isPending: providersLoading,
    error: providerError,
} = useQuery({
    queryKey: ["movieWatchProviders", { id: String(movie.id) }],
    queryFn: () => getMovieWatchProviders(movie.id),
    enabled: Boolean(movie.id), // Only run the query if movie.id is truthy
});

const providers = providersResults?.IE ?? null; // Get the Ireland watch providers or null if not available
const providersError = providerError?.message || "Error fetching watch providers"; // Get the error message if available

useEffect(() => {
    let active = true;

    setProviders(null);
    setProvidersLoading(true);
    setProvidersError("");

    getMovieWatchProviders(movie.id)
        .then(results => {
           if (active) setProviders(results?.IE ?? null);
        })
        .catch(error => {
            if (active) setProvidersError(error.message);
        })
        .finally(() => {
            if (active) setProvidersLoading(false);
        });

    return () => {
        active = false;
    };
}, [movie.id]);

  return (
    <>
      <Typography variant="h5" component="h3">
        Overview
      </Typography>

      <Typography variant="h6" component="p">
        {movie.overview}
      </Typography>

      <Paper 
        component="ul" 
        sx={{...root}}
      >
        <li>
          <Chip label="Genres" sx={{...chip}} color="primary" />
        </li>
        {movie.genres.map((g) => (
          <li key={g.name}>
            <Chip label={g.name} sx={{...chip}} />
          </li>
        ))}
      </Paper>
      <Paper component="ul" sx={{...root}}>
        <Chip icon={<AccessTimeIcon />} label={`${movie.runtime} min.`} />
        <Chip
          icon={<MonetizationIcon />}
          label={`${movie.revenue.toLocaleString()}`}
        />
        <Chip
          icon={<StarRate />}
          label={`${movie.vote_average} (${movie.vote_count})`}
        />
        <Chip label={`Released: ${movie.release_date}`} />
      </Paper>
      <Paper component="ul" sx={{...root}}>
        <li>
          <Chip label="Production Countries" sx={{...chip}} color="primary" />
        </li>
        {movie.production_countries?.map((country) => (
          <li key={country.iso_3166_1}>
            <Chip label={country.name} sx={{...chip}} />
          </li>
        ))}
      </Paper>

      <Paper sx={{ padding: 2, marginTop: 2 }}>
        <Typography variant="h5" component="h3">
            Where to Watch - Ireland
        </Typography>
        
        {providersLoading ? (
            <Typography>Loading watch providers...</Typography>
        ) : providersError ? (
            <Typography role="alert">{providersError}</Typography>
        ) : (
            <>
             {[
        ["flatrate", "Subscription"],
        ["rent", "Rent"],
        ["buy", "Buy"],
        ["free", "Free"],
        ["ads", "With ads"],
      ].map(([type, label]) =>
        providers?.[type]?.length > 0 ? (
          <div key={type}>
            <Typography variant="subtitle1">{label}</Typography>

            {providers[type].map(provider => (
              <Chip
                key={provider.provider_id}
                label={provider.provider_name}
                sx={{ ...chip }}
              />
            ))}
          </div>
        ) : null
      )}

      {!["flatrate", "rent", "buy", "free", "ads"].some(
        type => providers?.[type]?.length > 0
      ) && (
        <Typography>
          No watch availability listed for Ireland.
        </Typography>
      )}

      {providers?.link && (
        <Typography sx={{ marginTop: 1 }}>
          <a
            href={providers.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            View watch options on TMDB
          </a>
        </Typography>
      )}
    </>
  )}

  <Typography variant="caption" display="block" sx={{ marginTop: 1 }}>
    Watch availability provided by JustWatch.
  </Typography>
</Paper>


        
        <Fab
        color="secondary"
        variant="extended"
        onClick={() =>setDrawerOpen(true)}
        sx={{
          position: 'fixed',
          bottom: '1em',
          right: '1em'
        }}
      >
        <NavigationIcon />
        Reviews
      </Fab>
      <Drawer anchor="top" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <MovieReviews movie={movie} />
      </Drawer>
      </>

      
  );
};
export default MovieDetails ;


