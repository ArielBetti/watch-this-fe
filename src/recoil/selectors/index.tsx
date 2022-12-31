import { selector } from "recoil";
import { atomSignInBody, atomSignUpBody } from "../atoms";
import { requester } from "../../api/requester";
import { ENDPOINTS } from "../../api/endpoints";
import { TUserSignInSuccessResponse, TUserSignUpSuccessResponse } from "../../interfaces/api";

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
