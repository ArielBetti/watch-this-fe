import { Dispatch, SetStateAction } from "react";
import type { TAvatar } from "../../../interfaces";

export type TCardSignUpProps = {
  isLoading: boolean;
  avatar: TAvatar | undefined;
  signUpModalOpen: boolean;
  setSignUpModalOpen: Dispatch<SetStateAction<boolean>>
};
