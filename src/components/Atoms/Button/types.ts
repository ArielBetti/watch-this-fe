import { ButtonHTMLAttributes, FC, ReactNode } from "react";

export type TButton = {
  children?: ReactNode;
  disabled?: boolean;
  onClick: (e?: any) => void | any;
} & ButtonHTMLAttributes<HTMLButtonElement>;
