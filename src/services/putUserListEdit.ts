import { ENDPOINTS } from "../api/endpoints";
import { requester } from "../api/requester";
import { TEndpointUserCreateList, TUserCreateListBody } from "../interfaces/api";

export const putUserListEdit = async (
  token: string,
  body: TUserCreateListBody | undefined,
): Promise<TEndpointUserCreateList> => {

  const { data } = await requester({
    baseURL: import.meta.env.VITE_WATCH_THIS_BASE_API,
    headers: {
      Authorization: token,
    },
  }).put<TEndpointUserCreateList>(`${ENDPOINTS.putUserList}`, body);

  return data;
};
