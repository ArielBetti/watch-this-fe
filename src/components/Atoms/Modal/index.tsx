// icons
import { XMarkIcon } from "@heroicons/react/24/outline";

// types
import type { TModalProps } from "./types";

// radix: components
import * as Dialog from "@radix-ui/react-dialog";

// ::
const Modal = ({ children, modalTrigger, open, setModalOpen }: TModalProps) => {
  return (
    <Dialog.Root open={open} onOpenChange={setModalOpen}>
      <Dialog.Trigger asChild>{modalTrigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-slate-900/80 motion-safe:animate-blurIn" />
        <Dialog.Content className="container fixed top-0 left-0 mx-auto flex min-h-screen items-center justify-center px-4 text-black dark:text-white">
          <div className="relative min-h-[400px] w-full rounded-md border border-zinc-300 bg-white p-4 shadow-xl motion-safe:animate-fadeIn dark:border-zinc-600 dark:bg-zinc-900 md:max-w-2xl">
            <Dialog.Close className="absolute top-5 right-5">
              <XMarkIcon className="h-5 w-5" />
            </Dialog.Close>
            {children}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Modal;
