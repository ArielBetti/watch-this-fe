import { useMutation } from "@tanstack/react-query";
import { postSignUp } from "../services";
import { TSignUpRequestBody } from "../interfaces/api";

export const useRegisterUserMutation = () => {
  // Queries
  return useMutation({
    mutationFn: (body?: TSignUpRequestBody | undefined) =>
      postSignUp(body),
  });
};
