export type TTapumeProps = {
  title: string;
  type?: "error" | "info" | 'empty';
  description?: string;
  handleButtonClick?: () => void;
  textButton?: string;
  open: boolean,
};
