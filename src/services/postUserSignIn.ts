import { ENDPOINTS } from "../api/endpoints";
import { requester } from "../api/requester";
import {
  TSignInRequestBody,
  TUserSignInSuccessResponse,
} from "../interfaces/api";

export const postSignIn = async (
  body: TSignInRequestBody | undefined
): Promise<TUserSignInSuccessResponse> => {
  const { data } = await requester({
    baseURL: import.meta.env.VITE_WATCH_THIS_BASE_API,
  }).post(`${ENDPOINTS.login}`, body);

  return data;
};
