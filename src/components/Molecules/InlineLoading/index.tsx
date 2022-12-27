import { FC } from "react";
import { TInlineLoadingProps } from "./types";
import LoadingStatus from "../../Atoms/LoadingStatus";

const InlineLoading: FC<TInlineLoadingProps> = ({ text, isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className="flex gap-2 items-center justify-start">
      <LoadingStatus />
      {text}
    </div>
  );
};

export default InlineLoading;
