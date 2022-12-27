import { InputHTMLAttributes } from "react";
import type { TFeedbackType } from "../../../interfaces";

export type TInputFeedback = {
  message: string;
  type: TFeedbackType;
};

export type TInput = {
  label?: string;
  feedback?: TInputFeedback;
} & InputHTMLAttributes<HTMLInputElement>;
