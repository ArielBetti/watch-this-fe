import { atom } from "recoil";

export const atomConfettiState = atom<boolean>({
  key: "atomConfettiState",
  default: false,
});
