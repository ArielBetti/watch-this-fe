
export type TCardMovieProps = {
  title: string;
  selected?: boolean;
  image?: string;
  handleClick?: () => void;
  onAddMovie?: () => void;
  onDeleteMovie?: () => void;
};
