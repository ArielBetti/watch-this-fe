import { useMutation } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import { atomToken } from "../recoil/atoms";
import { putUserListEdit } from "../services";
import { TUserCreateListBody } from "../interfaces/api";

export const useEditUserListMutation = () => {
  const token = useRecoilValue(atomToken);

  // Queries
  return useMutation({
    mutationFn: (body: TUserCreateListBody | undefined) =>
      putUserListEdit(token, body),
  });
};
