import { useQuery } from "@tanstack/react-query";
import { getUserList } from "../services";
import { useToken } from "../stores";

export const useUserListsQuery = () => {
  const token = useToken();

  // Queries
  return useQuery({
    queryKey: ["user_lists"],
    queryFn: () => getUserList(token),
    staleTime: 1000 * 60 * 3, // 3 min
  });
};
