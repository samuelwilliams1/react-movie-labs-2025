
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import StarRate from "@mui/icons-material/StarRate";
import TVWatchProviders from "../tvWatchProviders";

const root = {
  display: "flex", justifyContent: "center", flexWrap: "wrap",
  listStyle: "none", padding: 1.5, margin: 0,
};
const chip = { margin: 0.5 };

export default function TVDetails({ show }) {
  return (
    <>
      <Typography variant="h5" component="h3">Overview</Typography>
      <Typography variant="h6" component="p">
        {show.overview || "No overview available."}
      </Typography>
      <Paper component="ul" sx={root}>
        <li><Chip label="Genres" sx={chip} color="primary" /></li>
        {show.genres?.map(genre => (
          <li key={genre.id}><Chip label={genre.name} sx={chip} /></li>
        ))}
      </Paper>
      <Paper sx={root}>
        {show.episode_run_time?.length > 0 && (
          <Chip sx={chip} icon={<AccessTimeIcon />}
            label={`${show.episode_run_time.join(" / ")} min. per episode`} />
        )}
        <Chip sx={chip} label={`${show.number_of_seasons} seasons`} />
        <Chip sx={chip} label={`${show.number_of_episodes} episodes`} />
        <Chip sx={chip} icon={<StarRate />}
          label={`${show.vote_average} (${show.vote_count})`} />
        <Chip sx={chip} label={`First aired: ${show.first_air_date || "Unknown"}`} />
      </Paper>
      <Paper component="ul" sx={root}>
        <li><Chip label="Production Countries" sx={chip} color="primary" /></li>
        {show.production_countries?.map(country => (
          <li key={country.iso_3166_1}><Chip label={country.name} sx={chip} /></li>
        ))}
      </Paper>
      <TVWatchProviders key={show.id} show={show} />
    </>
  );
}

