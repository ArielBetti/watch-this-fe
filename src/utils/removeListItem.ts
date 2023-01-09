import type { Dispatch, SetStateAction } from "react";

import { TTmdbMoviesAndTvResult } from "../interfaces/api";

type props = {
  item: TTmdbMoviesAndTvResult;
  state: TTmdbMoviesAndTvResult[];
  setState: Dispatch<SetStateAction<TTmdbMoviesAndTvResult[]>>;
};

export const removeListItem = ({ item, setState, state }: props) => {
  const isChecked = state.find((movie) => movie.id === item.id);

  if (isChecked) {
    if (Array.isArray(state)) {
      const index = state?.findIndex((IndexItem) => IndexItem?.id === item.id);

      if (index > -1) {
        setState((prev) => {
          const newValue = [...prev];
          newValue.splice(index, 1);
          return newValue;
        });
      }
    }
  }
};
