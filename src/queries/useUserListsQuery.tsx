import { useQuery } from "@tanstack/react-query";
import { getUserList } from "../services";
import { useRecoilValue } from "recoil";
import { atomToken } from "../recoil/atoms";

export const useUserListsQuery = () => {
  const token = useRecoilValue(atomToken);

  // Queries
  return useQuery({
    queryKey: ["user_lists"],
    queryFn: () => getUserList(token),
  });
};
