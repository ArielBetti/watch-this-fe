import { ENDPOINTS } from "../api/endpoints";
import { requester } from "../api/requester";
import { TEndpointUserLists } from "../interfaces";

export const getUserList = async (token: string): Promise<TEndpointUserLists[]> => {
  const { data } = await requester({
    baseURL: import.meta.env.VITE_WATCH_THIS_BASE_API,
    headers: {
      Authorization: token,
    },
  }).get(`${ENDPOINTS.getUserList}`);

  return data;
};
