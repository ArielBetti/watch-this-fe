import { selector } from "recoil";
import { atomSignInBody, atomSignUpBody, atomToken } from "../atoms";
import { requester } from "../../api/requester";
import { ENDPOINTS } from "../../api/endpoints";
import {
  TTmdbMovies,
  TUserSignInSuccessResponse,
  TUserSignUpSuccessResponse,
} from "../../interfaces/api";
import { TEndpointUserLists } from "../../interfaces";
import { atomTmdbSearch } from "../atoms/tmdb";

export const selectorSendSignIn = selector({
  key: "selectorSendSignIn",
  get: async ({ get }): Promise<TUserSignInSuccessResponse | undefined> => {
    const userSignUp = get(atomSignInBody);

    if (!userSignUp) return;

    if (userSignUp) {
      const { data } = await requester({
        baseURL: import.meta.env.VITE_WATCH_THIS_BASE_API,
      }).post(ENDPOINTS.login, userSignUp);

      return data;
    }
  },
});

export const selectorSendSignUp = selector({
  key: "selectorSendSignUp",
  get: async ({ get }): Promise<TUserSignUpSuccessResponse | undefined> => {
    const userSignUp = get(atomSignUpBody);

    if (!userSignUp) return;

    if (userSignUp) {
      const { data } = await requester({
        baseURL: import.meta.env.VITE_WATCH_THIS_BASE_API,
      }).post(ENDPOINTS.register, userSignUp);

      return data;
    }
  },
});

export const selectorGetUserLists = selector({
  key: "selectorGetUserLists",
  get: async ({ get }): Promise<TEndpointUserLists[]> => {
    const { data } = await requester({
      baseURL: import.meta.env.VITE_WATCH_THIS_BASE_API,
      headers: {
        Authorization: get(atomToken),
      },
    }).get(ENDPOINTS.getUserList);

    return data;
  },
});

export const selectorGetTmdbByQuery = selector({
  key: "selectorGetTmdbByQuery",
  get: async ({ get }): Promise<TTmdbMovies | undefined> => {
    const query = get(atomTmdbSearch);

    if (!query) return;

    const { data } = await requester({
      baseURL: ENDPOINTS.baseUrl,
    }).get(
      `${ENDPOINTS.searchMovieByQuery}/?api_key=${
        import.meta.env.VITE_TMDB_API_KEY
      }&language=pt-br&query=${query}`
    );

    return data;
  },
});
