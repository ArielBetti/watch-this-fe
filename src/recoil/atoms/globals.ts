import { atom } from "recoil";
import { TToastNotificationProps } from "../../components/Atoms/Toast/types";

export const atomConfettiState = atom<boolean>({
  key: "atomConfettiState",
  default: false,
});

export const atomNotifications = atom<TToastNotificationProps[]>({
  key: "atomNotifications",
  default: [],
});
