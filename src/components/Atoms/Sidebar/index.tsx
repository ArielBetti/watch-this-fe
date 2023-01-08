// icons
import { XMarkIcon } from "@heroicons/react/24/outline";

// radix: components
import * as Dialog from "@radix-ui/react-dialog";

// components
import { Button } from "../..";

// types
import { TSidebarProps } from "./types";

// ::
const Sidebar = ({
  children,
  triggerComponent,
  handleSubmit,
  open,
  setSideBarOpen,
}: TSidebarProps) => {
  return (
    <Dialog.Root open={open} onOpenChange={setSideBarOpen}>
      <Dialog.Trigger asChild>{triggerComponent}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-10 items-start justify-end bg-slate-900/80 motion-safe:animate-blurIn"></Dialog.Overlay>
        <div className="fixed top-24 right-0 z-10 flex max-h-full w-full items-end justify-end md:max-w-sm">
          <Dialog.Content className="flex w-full border-l border-zinc-300 bg-gray-200 p-4 text-black shadow-xl motion-safe:animate-downSlide dark:border-zinc-600 dark:bg-zinc-900 dark:text-white md:max-w-2xl">
            <div className="absolute top-0 left-0 flex w-full items-center justify-between border-b border-zinc-300 bg-white p-4 pb-5 dark:border-zinc-600 dark:bg-zinc-900">
              <Dialog.Close className="flex">
                <XMarkIcon className="h-5 w-5" />
              </Dialog.Close>
              <Dialog.Close className="flex">
                <Button onClick={() => handleSubmit()}>Confirmar</Button>
              </Dialog.Close>
            </div>
            <div className="min-h-screen w-full pt-20">
              <div className="h-[80vh] w-full overflow-y-scroll scrollbar-hide">
                {children}
              </div>
            </div>
          </Dialog.Content>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Sidebar;
