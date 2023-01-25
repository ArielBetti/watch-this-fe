import { type ReactNode } from 'react';

export type TSidebarProps = {
  triggerComponent: ReactNode;
  children: ReactNode;
  onSubmitList: () => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};
