import "./index.css";
import TVDetailsPage from "./pages/tvDetailsPage";
import AddMovieReviewPage from './pages/addMovieReviewPage'
import SiteHeader from './components/siteHeader'
import MovieReviewPage from "./pages/movieReviewPage";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes} from "react-router";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import FavoriteMoviesPage from "./pages/favoriteMoviesPage";
import UpcomingMoviesPage from "./pages/upcomingMoviesPage";
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import MoviesContextProvider from "./contexts/moviesContext";
import TVShowsPage from "./pages/tvShowsPage";
import NowPlayingMoviesPage from "./pages/nowPlayingMoviesPage";
import TopRatedMoviesPage from "./pages/topRatedMoviesPage";
import MustWatchMoviesPage from "./pages/mustWatchMoviesPage";
import { createTheme, ThemeProvider } from "@mui/material/styles";


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000, 
      refetchOnWindowFocus: false
    },
  },
});

const theme = createTheme({
  palette: {
    primary: {
      main: "#d32f2f",
    },
  },
   components: {
    MuiChip: {
      styleOverrides: {
        root: {
          color: "#ffffff",
        },
        icon: {
          color: "#ffffff",
        },
      },
    },
  },
  typography: {
    fontFamily: '"Montserrat", sanss-serif',
    h1: { fontWeight: 700},
    h2: {fontweight: 700},
    h3: {fontweight: 700},
    h4: {fontweight: 700},
    h5: {fontweight: 700},
    h6: {fontweight: 700}
  },
});



const App = () => {
  return (
    <ThemeProvider theme={theme}> <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <SiteHeader />
       <MoviesContextProvider>
         <Routes>
          <Route path="/movies/favorites" element={<FavoriteMoviesPage />} />
          <Route path="/movies/upcoming" element={<UpcomingMoviesPage />} />
          <Route path="/reviews/:id" element={ <MovieReviewPage /> } />
          <Route path="/movies/:id" element={<MoviePage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={ <Navigate to="/" /> } />
          <Route path="/reviews/form" element={ <AddMovieReviewPage /> } />
          <Route path="/tv" element={<TVShowsPage />} />
          <Route path="/movies/now-playing" element={<NowPlayingMoviesPage />} />
          <Route path="/movies/top-rated" element={<TopRatedMoviesPage />} />
          <Route path="/tv/:id" element={<TVDetailsPage />} />
          <Route path="/movies/mustwatch" element={<MustWatchMoviesPage />} />
        </Routes>
       </MoviesContextProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
    </ThemeProvider>
  );
};

const rootElement = createRoot( document.getElementById("root") )
rootElement.render(<App />);
