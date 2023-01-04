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
      <Dialog.Overlay className="absolute left-0 top-0 flex min-h-screen w-screen items-center justify-center bg-slate-900/80 motion-safe:animate-blurIn">
        <div className="container mx-auto flex items-center justify-center px-4">
          <Dialog.Content className="relative min-h-[400px] w-full rounded-md border border-zinc-300 bg-white p-4 shadow-xl motion-safe:animate-fadeIn dark:border-zinc-600 dark:bg-zinc-900 md:max-w-2xl">
            <Dialog.Close className="absolute top-5 right-5">
              <XMarkIcon className="h-5 w-5" />
            </Dialog.Close>
            {children}
          </Dialog.Content>
        </div>
      </Dialog.Overlay>
    </Dialog.Root>
  );
};

export default Modal;
