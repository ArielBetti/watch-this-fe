import { atom } from "recoil";
import type { TSignInRequestBody, TUser } from "../../interfaces";
import { localStorageEffect } from "../../utils";

export const atomUser = atom<TUser>({
  key: 'atomUser',
  default: undefined,
  effects: [localStorageEffect('atomUser')],
});

export const atomToken = atom<string>({
  key: 'atomToken',
  default: '',
  effects: [localStorageEffect('atomToken')],
});

export const atomSignUpBody = atom<any>({
  key: "atomSignUpBody",
  default: undefined,
});

export const atomSignInBody = atom<TSignInRequestBody>({
  key: "atomSignInBody",
  default: undefined,
});
