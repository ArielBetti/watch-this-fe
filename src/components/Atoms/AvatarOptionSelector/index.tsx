import React, { FC, useCallback, useMemo } from "react";
import { TAvatarOptionSelector } from "./types";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { ArrowRightIcon } from "@heroicons/react/24/solid";

const AvatarOptionSelector: FC<TAvatarOptionSelector> = ({
  currentOption,
  label,
  options,
  setCurrentOption,
}) => {
  // memo: states
  const getIndex = useMemo(() => {
    const getCurrntIndex = options.findIndex(
      (index) => index === currentOption[0]
    );

    if (getCurrntIndex === -1) {
      setCurrentOption([options[0]]);
      return 1;
    }

    return getCurrntIndex;
  }, [currentOption, options, setCurrentOption]);

  const onNextOptionChange = useCallback(() => {
    const changed = options[getIndex + 1];
    const changedIndex = options.findIndex((index) => index === changed);

    if (changedIndex > options?.length + 1 || changedIndex === -1) {
      return setCurrentOption([options[0]]);
    }

    setCurrentOption([options[changedIndex]]);
  }, [getIndex, options, setCurrentOption]);

  const onBackOptionChange = useCallback(() => {
    const changed = options[getIndex - 1];
    const changedIndex = options.findIndex((index) => index === changed);

    if (changedIndex === -1) {
      return setCurrentOption([options[options.length - 1]]);
    }

    const changedOption = [options[changedIndex]];

    setCurrentOption(changedOption);
  }, [getIndex, options, setCurrentOption]);

  return (
    <div className="flex flex-col bg-white border justify-center items-center border-zinc-300 rounded-md dark:bg-zinc-800 dark:border-zinc-600 p-2">
      <p>{label}</p>
      <div className="flex gap-2 items-center justify-between">
        <button onClick={() => onBackOptionChange()}>
          <ArrowLeftIcon className="h-6 w-6" />
        </button>
        <p>{`${getIndex}/${options?.length - 1}`}</p>
        <button onClick={() => onNextOptionChange()}>
          <ArrowRightIcon className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

export default AvatarOptionSelector;
