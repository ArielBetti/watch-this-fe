import { ButtonHTMLAttributes, ReactNode } from "react";

export type TButton = {
  children?: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;
