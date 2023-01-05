import { atom } from "recoil";

export const atomTmdbSearch = atom<string>({
  key: "atomTmdbSearch",
  default: '',
});
