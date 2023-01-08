import { Dispatch, SetStateAction, type ReactNode } from "react";

export type TModalProps = {
  children: ReactNode,
  modalTrigger?: ReactNode,
  setModalOpen: Dispatch<SetStateAction<boolean>>,
  open: boolean,
};
