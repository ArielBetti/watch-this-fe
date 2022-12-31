import { XMarkIcon } from "@heroicons/react/24/outline";
import { TModalProps } from "./types";

const Modal = ({ children, open, handleCloseButton }: TModalProps) => {
  if (!open) return null;

  return (
    <div className="absolute left-0 top-0 flex min-h-screen w-screen items-center justify-center bg-slate-900/80 motion-safe:animate-blurIn">
      <div className="container mx-auto flex items-center justify-center px-4">
        <div className="motion-safe:animate-fadeIn relative min-h-[400px] w-full rounded-md border border-zinc-300 bg-white p-4 shadow-xl dark:border-zinc-600 dark:bg-zinc-900 md:max-w-2xl">
          <button className="absolute top-5 right-5" onClick={() => handleCloseButton()}>
            <XMarkIcon className="h-5 w-5"  />
          </button>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
