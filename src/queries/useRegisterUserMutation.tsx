import { useMutation } from "@tanstack/react-query";
import { postSignUp } from "../services";

export const useRegisterUserMutation = () => {
  // Queries
  return useMutation({
    mutationFn: postSignUp,
  });
};
