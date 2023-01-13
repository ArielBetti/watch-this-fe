import { selector, selectorFamily } from "recoil";

// atoms
import {
  atomHashTmdbSearch,
  atomHashUserCreateList,
  atomSignInBody,
  atomSignUpBody,
  atomTmdbSearch,
  atomToken,
  atomUserCreateListRequestBody,
  atomUserEditListRequestBody,
} from "../atoms";

// api
import { watchthisApi, tmdbApi, ENDPOINTS } from "../../api";

// types
import type {
  TEndpointUserCreateList,
  TTmdbMovies,
  TUserSignInSuccessResponse,
  TUserSignUpSuccessResponse,
} from "../../interfaces/api";
import { TEndpointUserLists } from "../../interfaces";
import { atomHashList } from "../atoms/list";

export const selectorSendSignIn = selector({
  key: "selectorSendSignIn",
  get: async ({ get }): Promise<TUserSignInSuccessResponse | undefined> => {
    const userSignUp = get(atomSignInBody);

    if (!userSignUp) return;

    if (userSignUp) {
      const { data } = await watchthisApi.post(ENDPOINTS.login, userSignUp);

      return data;
    }
  },
});

export const selectorSendSignUp = selector({
  key: "selectorSendSignUp",
  get: async ({ get }): Promise<TUserSignUpSuccessResponse | undefined> => {
    const userSignUp = get(atomSignUpBody);

    if (!userSignUp) return;

    const { data } = await watchthisApi.post(ENDPOINTS.register, userSignUp);

    return data;
  },
});

export const selectorGetUserLists = selector({
  key: "selectorGetUserLists",
  get: async ({ get }): Promise<TEndpointUserLists[]> => {
    get(atomHashUserCreateList);

    const { data } = await watchthisApi.get(ENDPOINTS.getUserList, {
      headers: {
        Authorization: get(atomToken),
      },
    });

    return data;
  },
});

export const selectorGetTmdbByQuery = selector({
  key: "selectorGetTmdbByQuery",
  get: async ({ get }): Promise<TTmdbMovies | undefined> => {
    get(atomHashTmdbSearch);
    const query = get(atomTmdbSearch);

    if (!query) return;

    const { data } = await tmdbApi.get(
      `${ENDPOINTS.searchMovieByQuery}?language=pt-br&query=${query}`
    );

    const tvSearch = await tmdbApi.get(
      `${ENDPOINTS.searchTvByQuery}?language=pt-br&query=${query}`
    );

    const tvData = tvSearch?.data;

    return { ...data, results: [...data?.results, ...tvData?.results] };
  },
});

export const selectorSendUserCreateList = selector({
  key: "selectorSendUserCreateList",
  get: async ({ get }): Promise<TEndpointUserCreateList | undefined> => {
    const list = get(atomUserCreateListRequestBody);

    if (!list || list?.list.length === 0) return;

    const { data } = await watchthisApi.post(ENDPOINTS.createList, list, {
      headers: {
        Authorization: get(atomToken),
      },
    });

    return data;
  },
});

export const selectorGetList = selectorFamily({
  key: "selectorGetList",
  get:
    (id: string) =>
    async ({ get }): Promise<TEndpointUserLists | undefined> => {
      get(atomHashList);
      if (!id) return;

      const { data } = await watchthisApi.get(`${ENDPOINTS.getList}/?id=${id}`);

      return data;
    },
});

export const selectorPutUserEditList = selector({
  key: "selectorPutUserEditList",
  get: async ({ get }): Promise<TEndpointUserCreateList | undefined> => {
    const list = get(atomUserEditListRequestBody);

    if (!list || list?.list.length === 0) return;

    const { data } = await watchthisApi.put(ENDPOINTS.putUserList, list, {
      headers: {
        Authorization: get(atomToken),
      },
    });

    return data;
  },
});
