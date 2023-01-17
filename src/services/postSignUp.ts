import { ENDPOINTS } from "../api/endpoints";
import { requester } from "../api/requester";
import {
  TSignUpRequestBody,
  TUserSignUpSuccessResponse,
} from "../interfaces/api";

export const postSignUp = async (
  body: TSignUpRequestBody | undefined
): Promise<TUserSignUpSuccessResponse> => {
  const { data } = await requester({
    baseURL: import.meta.env.VITE_WATCH_THIS_BASE_API,
  }).post<TUserSignUpSuccessResponse>(`${ENDPOINTS.register}`, body);

  return data;
};
