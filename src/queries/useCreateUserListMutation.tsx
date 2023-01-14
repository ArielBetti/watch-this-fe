import { useMutation } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import { atomToken } from "../recoil/atoms";
import { postUserCreateList } from "../services";
import { TUserCreateListBody } from "../interfaces/api";

export const useCreateUserListMutation = () => {
  const token = useRecoilValue(atomToken);

  // Queries
  return useMutation({
    mutationFn: (body: TUserCreateListBody | undefined) => postUserCreateList(token, body),
  });
};
