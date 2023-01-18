import * as RadixScrollArea from '@radix-ui/react-scroll-area';
import type { TScrollAreaProps } from './types';

const ScrollArea = ({ children }: TScrollAreaProps) => {
  return (
    <RadixScrollArea.Root className="h-full max-h-full overflow-hidden">
      <RadixScrollArea.Viewport className="h-full w-full">{children}</RadixScrollArea.Viewport>
      <RadixScrollArea.Scrollbar
        orientation="vertical"
        className="flex w-2.5 touch-none select-none bg-gray-200 p-[2px] transition-colors duration-150 ease-out dark:bg-zinc-900"
      >
        <RadixScrollArea.Thumb className="before:content-[' '] relative flex-1 rounded-[10px] bg-zinc-400 before:absolute before:top-1/2 before:left-1/2 before:h-full before:min-h-[44px] before:w-full before:min-w-[22px] before:-translate-x-1/2 before:-translate-y-1/2 dark:bg-zinc-800" />
      </RadixScrollArea.Scrollbar>
    </RadixScrollArea.Root>
  );
};

export default ScrollArea;
