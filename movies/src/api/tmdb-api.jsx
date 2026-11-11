const readJSON = async (response) => {
  const json = await response.json();

  if (!response.ok || json.success === false) {
    throw new Error(
      json.status_message || "Could not load TMDB data."
    );
  }

  return json;
};


export const getMovies = () => {
  return fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=1`
  ).then((response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });  
    }
    return response.json();
  })
  .catch((error) => {
      throw error
  });
};


export const getMovie = (args) => {
  //console.log(args)
  const [, idPart] = args.queryKey;
  const { id } = idPart;
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_TMDB_KEY}`
  ).then((response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    return response.json();
  })
  .catch((error) => {
    throw error
 });
};


export const getUpcomingMovies = id => {
  return fetch(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=${import.meta.env.VITE_TMDB_KEY}`
  )
    .then(readJSON)
    .then(json => json.results);
};

export const getGenres = () => {
  return fetch(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${import.meta.env.VITE_TMDB_KEY}`
  )
    .then(readJSON)
    .then(json => json.genres);
};

  export const getMovieImages = ({ queryKey }) => {
    const [, idPart] = queryKey;
    const { id } = idPart;
    return fetch(
      `https://api.themoviedb.org/3/movie/${id}/images?api_key=${import.meta.env.VITE_TMDB_KEY}`
    ).then( (response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.status_message || "Something went wrong");
        });
      }
      return response.json();
    })
    .catch((error) => {
      throw error
   });
  };

  export const getMovieReviews = ({ queryKey }) => {
    const [, idPart] = queryKey;
    const { id } = idPart;
    return fetch(
      `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${import.meta.env.VITE_TMDB_KEY}`
    ).then( (response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.status_message || "Something went wrong");
        });
      }
      return response.json();
    })
    .catch((error) => {
      throw error
   });
  };

  export const getTVShows = () => {
  return fetch(
    `https://api.themoviedb.org/3/discover/tv?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&sort_by=popularity.desc&page=1`
  )
    .then(readJSON)
    .then(json => json.results);
};

export const getNowPlayingMovies = () => {
  return fetch(
    `https://api.themoviedb.org/3/movie/now_playing?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&page=1`
  )
    .then(readJSON)
    .then(json => json.results);
};

export const getTopRatedMovies = () => {
  return fetch(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&page=1`
  )
    .then(readJSON)
    .then(json => json.results);
};

export const getMovieWatchProviders = (id) => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&page=1`
  ).then(async (res) => {
    const json = await res.json();

    console.log("Watch providers movie ID:", id);
    console.log("Watch providers response:", json);

    if (!res.ok || json.success === false) {
      throw new Error(
        json.status_message || "Could not load watch providers."
      );
    }

    return json.results;
  });
};

export const getTVWatchProviders = (id) => {
  return fetch(
    `https://api.themoviedb.org/3/tv/${id}/watch/providers?api_key=${import.meta.env.VITE_TMDB_KEY}`
  )
    .then(res => {
      if (!res.ok) {
        throw new Error("Could not load TV watch providers.");
      }
      return res.json();
    })
    .then(json => json.results);
};

export const getTVShow = (id) => {
  return fetch(
    `https://api.themoviedb.org/3/tv/${id}?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US`
  ).then(res => {
    if (!res.ok) {
      throw new Error("Could not load TV show details.");
    }
    return res.json();
  });
};
