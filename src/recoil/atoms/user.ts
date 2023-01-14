import { atom } from "recoil";
import type { TEndpointUserEditList, TEndpointUserLists, TUser } from "../../interfaces";
import { localStorageEffect } from "../../utils";
import {
  TSignUpRequestBody,
  TSignInRequestBody,
  TUserCreateListBody,
  TTmdbMoviesAndTvResult,
} from "../../interfaces/api";
import { TInputFeedback } from "../../components/Atoms/Input/types";

export const atomUser = atom<TUser>({
  key: "atomUser",
  default: undefined,
  effects: [localStorageEffect("atomUser")],
});

export const atomToken = atom<string>({
  key: "atomToken",
  default: "",
  effects: [localStorageEffect("atomToken")],
});

export const atomSignInBody = atom<TSignInRequestBody>({
  key: "atomSignInBody",
  default: undefined,
});

export const atomSignUpFeedback = atom<TInputFeedback | undefined>({
  key: "atomSignUpFeedback",
  default: undefined,
});

export const atomUserLists = atom<TEndpointUserLists[]>({
  key: "atomUserLists",
  default: undefined,
});

export const atomUserCreateList = atom<TTmdbMoviesAndTvResult[]>({
  key: "atomUserCreateList",
  default: [],
});

export const atomUserEditListRequestBody = atom<TEndpointUserEditList>({
  key: "atomUserEditListRequestBody",
  default: undefined,
});

export const atomHashUserEditList = atom<number>({
  key: "atomHashEditList",
  default: 0,
});

export const atomUserListName = atom<string>({
  key: "atomUserListName",
  default: '',
});
