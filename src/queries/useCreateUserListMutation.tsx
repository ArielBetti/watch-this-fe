import { useMutation } from "@tanstack/react-query";
import { postUserCreateList } from "../services";
import { TUserCreateListBody } from "../interfaces/api";
import { useToken } from "../stores";

export const useCreateUserListMutation = () => {
  const token = useToken()

  // Queries
  return useMutation({
    mutationFn: (body: TUserCreateListBody | undefined) => postUserCreateList(token, body),
  });
};
