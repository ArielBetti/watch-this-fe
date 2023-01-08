import { atom } from "recoil";
import type { TEndpointUserLists, TUser } from "../../interfaces";
import { localStorageEffect } from "../../utils";
import {
  TSignUpRequestBody,
  TSignInRequestBody,
  TTmdbResult,
  TUserCreateListBody,
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

export const atomSignUpBody = atom<TSignUpRequestBody>({
  key: "atomSignUpBody",
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

export const atomUserCreateList = atom<TTmdbResult[]>({
  key: "atomUserCreateList",
  default: [],
});

export const atomUserCreateListRequestBody = atom<TUserCreateListBody>({
  key: "atomUserCreateListRequestBody",
  default: undefined,
});

export const atomHashUserCreateList = atom<number>({
  key: "atomHashUserCreateList",
  default: 0,
});

export const atomUserListName = atom<string>({
  key: "atomUserListName",
  default: '',
});
