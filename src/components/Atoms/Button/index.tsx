import { forwardRef } from "react";

// types
import type { TButton } from "./types";

// ::
const Button = forwardRef<HTMLButtonElement, TButton>(
  ({ children, className, ...rest }, ref) => {
    return (
      <button
        ref={ref}
        {...rest}
        className={`${className} flex cursor-pointer items-center justify-center gap-1 rounded-md border border-primary-light-contrast bg-primary p-2 text-white shadow-md  transition-colors hover:bg-primary-dark-contrast`}
      >
        {children}
      </button>
    );
  }
);

export default Button;
