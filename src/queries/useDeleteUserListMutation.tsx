import { useMutation } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import { atomToken } from "../recoil/atoms";
import { deleteUserList } from "../services";

export const useDeleteUserList = () => {
  const token = useRecoilValue(atomToken);

  // Queries
  return useMutation({
    mutationFn: (body: { id: string }) => deleteUserList(token, body),
  });
};
