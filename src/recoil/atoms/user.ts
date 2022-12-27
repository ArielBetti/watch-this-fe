import { atom } from "recoil";
import { TUser } from "../../interfaces";
import { localStorageEffect } from "../../utils";

export const atomUser = atom<TUser>({
  key: 'atomUser',
  default: undefined,
  effects: [localStorageEffect('atomUser')],
});

export const atomSignUpBody = atom<any>({
  key: "atomSignUpBody",
  default: undefined,
});

export const atomSignInBody = atom<any>({
  key: "atomSignInBody",
  default: undefined,
});
