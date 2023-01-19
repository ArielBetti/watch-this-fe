import type { TEndpointUserLists } from "../../../interfaces";

export type TCardListHandleRemoveListProps = {
  id: string,
  title: string,
}

export type TCardListProps = {
  list: TEndpointUserLists;
  handleRemoveList: ({ id, title }: TCardListHandleRemoveListProps) => void,
};
