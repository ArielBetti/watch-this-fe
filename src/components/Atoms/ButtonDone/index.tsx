import { forwardRef } from "react";

// icons
import { CheckIcon } from "@heroicons/react/24/outline";

// components
import Tooltip from "../Tooltip";

// types
import type { TButtonDoneProps } from "./types";

// ::
const ButtonDone = forwardRef<HTMLButtonElement, TButtonDoneProps>(
  ({ counter = 0, ...rest }, ref) => (
    <Tooltip
      message="Finalizar lista"
      children={
        <button
          ref={ref}
          disabled={!counter}
          {...rest}
          className="fixed bottom-10 right-10 z-10 flex"
        >
          <div className="relative flex h-10 w-10 items-center justify-center rounded-full border border-primary-light-contrast bg-primary-dark-contrast text-white shadow-lg">
            <div className="absolute -top-3 -right-3 flex h-6 w-6 items-center justify-center rounded-full bg-secondary">
              {counter}
            </div>
            <CheckIcon className="h-6 w-6" />
          </div>
        </button>
      }
    />
  )
);

export default ButtonDone;
