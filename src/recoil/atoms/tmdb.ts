import { atom } from "recoil";

export const atomTmdbSearch = atom<string>({
  key: "atomTmdbSearch",
  default: '',
});

export const atomHashTmdbSearch = atom<number>({
  key: "atomHashTmdbSearch",
  default: 0,
});
