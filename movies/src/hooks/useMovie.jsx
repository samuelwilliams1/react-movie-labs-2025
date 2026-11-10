import { useQuery, useQueryClient } from "@tanstack/react-query";
import {getMovie} from '../api/tmdb-api'

const useMovie = id => {
    const queryClient = useQueryClient();

    const queryKey = ['movie', { id: String(id) }];

    const { data: movie = null } = useQuery({
        queryKey,
        queryFn: getMovie,
        enabled: Boolean(id), // Only run the query if id is truthy
    });

    const setMovie = value => 
        queryClient.setQueryData(queryKey, value);

  return [movie, setMovie];
};

export default useMovie;
