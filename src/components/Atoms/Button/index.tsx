import { forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";

// types
import type { TButton } from "./types";

// ::
const Button = forwardRef<HTMLButtonElement, TButton>(
  ({ children, asChild = false, className, ...rest }, ref) => {
    const Component = asChild ? Slot : "button";
    return (
      <Component
        {...rest}
        ref={ref}
        className={`${className} flex cursor-pointer items-center justify-center gap-1 rounded-md border border-primary-light-contrast bg-primary p-2 text-white shadow-md  transition-colors hover:bg-primary-dark-contrast`}
      >
        {children}
      </Component>
    );
  }
);

export default Button;
