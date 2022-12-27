import { selector } from "recoil";
import { atomSignInBody } from "../atoms";
import { requester } from "../../api/requester";
import { ENDPOINTS } from "../../api/endpoints";
import { TUserSignInSuccessResponse } from "../../interfaces";

export const selectorSendSignIn = selector({
  key: "selectorSendSignIn",
  get: async ({ get }): Promise<TUserSignInSuccessResponse | undefined> => {
    const userSignIn = get(atomSignInBody);

    if (!userSignIn) return;

    if (userSignIn) {
      const { data } = await requester({
        baseURL: import.meta.env.VITE_WATCH_THIS_BASE_API,
      }).post(ENDPOINTS.login, userSignIn);

      return data;
    }
  },
});
