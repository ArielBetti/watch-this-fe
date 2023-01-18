import { ENDPOINTS } from "../api/endpoints";
import { requester } from "../api/requester";
import { TEndPointUserDeleteListSuccessResponse } from "../interfaces/api";

export const deleteUserList = async (
  token: string,
  body: { id: string },
): Promise<TEndPointUserDeleteListSuccessResponse> => {

  const { data } = await requester({
    baseURL: import.meta.env.VITE_WATCH_THIS_BASE_API,
    headers: {
      Authorization: token,
    },
  }).delete<TEndPointUserDeleteListSuccessResponse>(`${ENDPOINTS.deleteUserList}`, body);

  return data;
};
