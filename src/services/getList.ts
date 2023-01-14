import { ENDPOINTS } from "../api/endpoints";
import { requester } from "../api/requester";
import { TEndpointUserLists } from "../interfaces";

export const getList = async (id: string | undefined): Promise<TEndpointUserLists | undefined> => {
  if (!id) return;

  const { data } = await requester({
    baseURL: import.meta.env.VITE_WATCH_THIS_BASE_API,

  }).get(`${ENDPOINTS.getList}?id=${id}`);

  return data;
};
