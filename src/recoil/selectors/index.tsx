import { selector } from "recoil";

// atoms
import {
  atomHashTmdbSearch,
  atomHashUserCreateList,
  atomSignInBody,
  atomSignUpBody,
  atomTmdbSearch,
  atomToken,
  atomUserCreateListRequestBody,
} from "../atoms";

// api
import { requester } from "../../api/requester";
import { ENDPOINTS } from "../../api/endpoints";

// types
import type {
  TEndpointUserCreateList,
  TTmdbMovies,
  TUserSignInSuccessResponse,
  TUserSignUpSuccessResponse,
} from "../../interfaces/api";
import { TEndpointUserLists } from "../../interfaces";

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

    const { data } = await requester({
      baseURL: import.meta.env.VITE_WATCH_THIS_BASE_API,
    }).post(ENDPOINTS.register, userSignUp);

    return data;
  },
});

export const selectorGetUserLists = selector({
  key: "selectorGetUserLists",
  get: async ({ get }): Promise<TEndpointUserLists[]> => {
    get(atomHashUserCreateList);

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
    get(atomHashTmdbSearch);
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

export const selectorSendUserCreateList = selector({
  key: "selectorSendUserCreateList",
  get: async ({ get }): Promise<TEndpointUserCreateList | undefined> => {
    const list = get(atomUserCreateListRequestBody);

    if (list.list.length === 0) return;

    const { data } = await requester({
      baseURL: import.meta.env.VITE_WATCH_THIS_BASE_API,
      headers: {
        Authorization: get(atomToken),
      },
    }).post(ENDPOINTS.createList, list);

    return data;
  },
});
