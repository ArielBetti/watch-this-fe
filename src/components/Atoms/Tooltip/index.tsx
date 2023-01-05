// radix: components
import * as RadixTooltip from "@radix-ui/react-tooltip";

// types
import type { TTooltipProps } from "./type";

// ::
const Tooltip = ({ children, message }: TTooltipProps) => {
  return (
    <RadixTooltip.Provider>
      <RadixTooltip.Root>
        <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>
        <RadixTooltip.Portal>
          <RadixTooltip.Content
            className="rounded-md bg-primary-dark-contrast/80 p-2 text-white shadow-lg backdrop-blur-sm"
            sideOffset={5}
          >
            {message}
            <RadixTooltip.Arrow className="fill-primary-dark-contrast/80" />
          </RadixTooltip.Content>
        </RadixTooltip.Portal>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  );
};

export default Tooltip;
