import { ENDPOINTS } from "../api/endpoints";
import { requester } from "../api/requester";
import { TTmdbMovies } from "../interfaces/api";

export const getTmdbByQuery = async (
  query?: string
): Promise<TTmdbMovies | undefined> => {
  const params = `?api_key=${
    import.meta.env.VITE_TMDB_API_KEY
  }&language=pt-br&adult=false&include_adult=false&query=`;

  if (!query) return;

  const { data } = await requester({
    baseURL: ENDPOINTS.baseUrl,
  }).get(
    `${ENDPOINTS.searchMovieByQuery}${params}${query}`
  );

  Promise.resolve(data);

  const tvSearch = await requester({
    baseURL: ENDPOINTS.baseUrl,
  }).get(`${ENDPOINTS.searchTvByQuery}${params}${query}`);

  const tvData = tvSearch?.data;

  return { ...data, results: [...data?.results, ...tvData?.results] };
};
