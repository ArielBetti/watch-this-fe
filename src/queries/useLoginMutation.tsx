import { useMutation } from "@tanstack/react-query";
import { TSignInRequestBody } from "../interfaces/api";
import { postSignIn } from "../services/postUserSignIn";
import { useSetRecoilState } from "recoil";
import { atomToken, atomUser } from "../recoil/atoms";
import { useNavigate } from "react-router";
import { PATHS } from "../core/paths";

export const useLoginMutation = () => {
  const navigate = useNavigate();

  // recoil: states
  const setUser = useSetRecoilState(atomUser);
  const setToken = useSetRecoilState(atomToken);

  // Queries
  return useMutation({
    mutationFn: (body?: TSignInRequestBody | undefined) => postSignIn(body),
    onSuccess: (data) => {
      setToken(data.token);
      setUser(data.user);
      navigate(PATHS.home);
    },
  });
};
