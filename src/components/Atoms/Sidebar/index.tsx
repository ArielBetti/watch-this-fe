// icons
import { XMarkIcon } from '@heroicons/react/24/outline';

// radix: components
import * as Dialog from '@radix-ui/react-dialog';

// components
import { Button, ScrollArea } from '../..';

// types
import { TSidebarProps } from './types';

// ::
const Sidebar = ({
  children,
  triggerComponent,
  onSubmitList,
  open,
  onOpenChange,
}: TSidebarProps) => {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Trigger asChild>{triggerComponent}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-slate-900/80 motion-safe:animate-blurIn" />
        <Dialog.Content className="fixed top-16 bottom-0 right-0 z-10 h-full max-h-full w-full border-zinc-300 bg-gray-200 text-black shadow-xl dark:border-zinc-800 dark:bg-zinc-900 dark:text-white md:max-w-2xl md:border-l">
          <div className="flex w-full items-center justify-between border-b border-zinc-300 bg-white p-4 pb-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 dark:shadow-lg">
            <Dialog.Close className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-800">
              <XMarkIcon className="h-5 w-5" />
            </Dialog.Close>
            <Dialog.Close asChild className="flex">
              <Button onClick={onSubmitList}>Confirmar</Button>
            </Dialog.Close>
          </div>
          <ScrollArea>
            <div className="p-4 pb-40">{children}</div>
          </ScrollArea>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Sidebar;
