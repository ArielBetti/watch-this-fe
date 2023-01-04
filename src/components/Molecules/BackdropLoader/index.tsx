// components
import { LoadingStatus } from "../../";

// types
import type { TBackdropLoaderProps } from "./types";

// ::
const BackdropLoader = ({ open }: TBackdropLoaderProps) => {
  if (!open) return null;

  return (
    <div className="absolute top-0 left-0 flex min-h-full w-full items-center justify-center bg-slate-900/80 backdrop-blur-sm">
      <LoadingStatus size={60} />
    </div>
  );
};

export default BackdropLoader;
