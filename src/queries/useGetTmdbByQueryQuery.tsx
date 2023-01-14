import { useQuery } from "@tanstack/react-query";
import { getTmdbByQuery } from "../services";
import { TTmdbMovies } from "../interfaces/api";

type TOptions = (data: TTmdbMovies) => void;

export const useGetTmdbByQueryQuery = (
  query?: string,
  onSuccess?: TOptions
) => {
  // Queries
  return useQuery({
    queryKey: ["tmdb_query", query],
    queryFn: () => getTmdbByQuery(query),
    refetchOnWindowFocus: false,
    onSuccess,
    enabled: !!query,
  });
};
