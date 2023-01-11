export type TTapumeProps = {
  title: string;
  type?: "error" | "info" | 'empty';
  description?: string;
  handleButtonClick?: (() => void) | null;
  textButton?: string;
  open: boolean,
};
