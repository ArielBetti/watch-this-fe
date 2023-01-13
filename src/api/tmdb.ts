import axios from "axios";
import { ENDPOINTS } from './endpoints'

export const tmdbApi = axios.create({
  baseURL: ENDPOINTS.tmdbBaseUrl,
});

tmdbApi.interceptors.request.use((config) => {
  config.params = {
    ...config.params,
    api_key: import.meta.env.VITE_TMDB_API_KEY,
  }

  return config
});

tmdbApi.interceptors.response.use(
  (res) => res,
  (error) => {
    if (
      error.response.status === 401 &&
      window.location.pathname !== "/logout"
      ) {
        window.location.href = "/logout";
    }

    return Promise.reject(error);
  });