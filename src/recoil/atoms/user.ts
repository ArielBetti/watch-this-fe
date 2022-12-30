import { atom } from "recoil";
import type { TUser } from "../../interfaces";
import { localStorageEffect } from "../../utils";
import { TSignInRequestBody, TSignUpRequestBody } from "../../interfaces/api";
import { TInputFeedback } from "../../components/Atoms/Input/types";

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

export const atomSignUpBody = atom<TSignUpRequestBody>({
  key: "atomSignUpBody",
  default: undefined,
});

export const atomSignInBody = atom<TSignInRequestBody>({
  key: "atomSignInBody",
  default: undefined,
});

export const atomSignUpFeedback = atom<TInputFeedback | undefined>({
  key: "atomSignUpFeedback",
  default: undefined,
});
