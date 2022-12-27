import { InputHTMLAttributes } from "react";

export type TInputFeedback = {
  message: string;
  type: "error" | "warning" | "success" | "info";
};

export type TInput = {
  label?: string;
  feedback?: TInputFeedback;
} & InputHTMLAttributes<HTMLInputElement>;
