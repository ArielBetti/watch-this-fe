import { FC } from "react";

// components
import { LoadingStatus } from "../..";

// types
import type { TInlineLoadingProps } from "./types";

// ::
const InlineLoading: FC<TInlineLoadingProps> = ({ text, isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className="flex gap-2 items-center justify-start">
      <LoadingStatus />
      <p className="dark:text-zinc-300 text-zinc-600">{text}</p>
    </div>
  );
};

export default InlineLoading;
