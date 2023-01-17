import { useCallback, useMemo } from "react";

// types
import type { TAvatarOptionsSelector } from "./types";

// icons
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

// ::
const AvatarOptionSelector = <T,>({
  currentOption,
  label,
  options,
  setCurrentOption,
}: TAvatarOptionsSelector<T>) => {
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
    <div className="flex flex-col items-center justify-center rounded-md border border-zinc-300 bg-white p-2 dark:border-zinc-600 dark:bg-zinc-800">
      <p>{label}</p>
      <div className="flex items-center justify-between gap-2">
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
