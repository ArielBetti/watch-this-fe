import { Dispatch, SetStateAction } from "react";
import type { TAvatar } from "../../../interfaces";
import { TInputFeedback } from "../../Atoms/Input/types";

export type TCardSignUpProps = {
  isLoading?: boolean;
  avatar: TAvatar | undefined;
  setFeedback: Dispatch<SetStateAction<TInputFeedback>>;
  feedback: TInputFeedback,
};
