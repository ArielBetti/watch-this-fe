import { Dispatch, SetStateAction } from "react";

export type TAvatarOptionSelector = {
  options: string[];
  currentOption: string[];
  setCurrentOption: Dispatch<SetStateAction<any>>;
  label: string;
};
