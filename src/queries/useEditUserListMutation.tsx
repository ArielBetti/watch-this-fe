import { useMutation } from "@tanstack/react-query";
import { putUserListEdit } from "../services";
import { TUserCreateListBody } from "../interfaces/api";
import { useToken } from "../stores";

export const useEditUserListMutation = () => {
  const token = useToken();

  // Queries
  return useMutation({
    mutationFn: (body: TUserCreateListBody | undefined) =>
      putUserListEdit(token, body),
  });
};
