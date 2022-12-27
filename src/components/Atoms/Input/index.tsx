import { FC, useId } from "react";
import type { TInput } from "./types";

const Input: FC<TInput> = ({ label, feedback, ...rest }) => {
  const inputId = useId();

  return (
    <div className="flex flex-col justify-start items-start w-full gap-2">
      {label && (
        <label className="" htmlFor={inputId}>
          {label}
        </label>
      )}
      <input
        className="w-full p-2 outline-none focus:dark:bg-black focus:border-primary border dark:border-zinc-700 dark:bg-zinc-900 dark:placeholder:text-zinc-400 rounded-md shadow-md bg-white placeholder:text-zinc-600 border-zinc-300"
        {...rest}
        id={inputId}
        name={inputId}
      />
      {feedback && (
        <p className={`text-sm text-feedback-${feedback.type}`}>{feedback.message}</p>
      )}
    </div>
  );
};

export default Input;
