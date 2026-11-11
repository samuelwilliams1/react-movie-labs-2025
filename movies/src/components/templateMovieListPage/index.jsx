import { useState } from "react";
import Header from "../headerMovieList";
import FilterCard from "../filterMoviesCard";
import MovieList from "../movieList";
import Grid from "@mui/material/Grid";

function MovieListPageTemplate({ movies, title, action }) {
  const [nameFilter, setNameFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");
  const [ratingFilter, setRatingFilter] = useState("0")
  const [yearFilter, setYearfilter] = useState("");

  // Year options from the movies Loaded on this page.
  const years = [...new Set(
    movies
     .map((movie) => movie.release_date?.slice(0, 4))
     .filter(Boolean) 
  )].sort((a, b) => Number(b) - Number(a));

  const genreId = Number(genreFilter);

const displayedMovies = movies
  .filter((movies) =>
    movies.title.toLowerCase().includes(nameFilter.toLowerCase())
)
.filter((movie) =>
    genreId > 0 ? movie.genre_ids.includes(genreId) : true
)
.filter((movie) =>
    genreId > 0 ? movie.genre_ids.includes(genreId) : true
)
.filter((movie) =>
    Number(ratingFilter) === 0 ||
    movie.vote_average >= Number(ratingFilter)
)
.filter((movie) =>
    yearFilter == "" ||
    movie.release_date?.slice(0,4) === yearFilter
);

const handleChange = (type, value) => {
    if (type === "name") setNameFilter(value);
    else if (type === "genre") setGenreFilter(value);
    else if (type === "rating") setRatingFilter(value);
    else if (type === "year") setYearfilter(value);
};


  return (
    <Grid container>
      <Grid size={12}>
        <Header title={title} />
      </Grid>
      <Grid container sx={{flex: "1 1 500px"}}>
        <Grid 
          key="find" 
          size={{xs: 12, sm: 6, md: 4, lg: 3, xl: 2}} 
          sx={{padding: "20px"}}
        >
          <FilterCard
            onUserInput={handleChange}
            titleFilter={nameFilter}
            genreFilter={genreFilter}
            ratingFilter={ratingFilter}
            yearFilter={yearFilter}
            years={years}
          />
        </Grid>
        <MovieList action={action} movies={displayedMovies}></MovieList>
      </Grid>
    </Grid>
  );
}
export default MovieListPageTemplate;
