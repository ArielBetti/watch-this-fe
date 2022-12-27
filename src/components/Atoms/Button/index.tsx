import { FC } from "react";

// types
import type { IButton } from "./types";

// ::
const Button: FC<IButton> = ({ children, disabled, onClick, className }) => {
  return (
    <button
      className={`${className} transition-colors hover:bg-primary-dark-contrast p-2 rounded-md shadow-md flex gap-1 bg-primary border border-primary-light-contrast text-white  justify-center items-center`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
