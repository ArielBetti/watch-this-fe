import { type ReactNode, type Dispatch, type SetStateAction } from "react";

export type TSidebarProps = {
  triggerComponent: ReactNode;
  children: ReactNode;
  handleSubmit: () => void;
  setSideBarOpen: Dispatch<SetStateAction<boolean>>;
  open: boolean;
};
