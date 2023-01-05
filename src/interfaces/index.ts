import { TButton } from "../components/Atoms/Button/types";

export type TUser = {
  avatar: TAvatar;
  name: string;
};

export type TAvatar = {
  accessoires: string[];
  backgroundColor: string;
  eyes: string[];
  eyebrows: string[];
  mouth: string[];
  flip: boolean;
  url: string;
};

export type TEndpointUserLists = {
  id: string;
  title: string;
  create_by: string;
  create_byId: string;
  avatar: TAvatar,
  list: TEndpointUserList[];
};

export type TEndpointUserList = {
  adult: boolean;
  backdrop_path: string;
  genres: [
    {
      id: number;
      name: string;
    }
  ];
  id: string;
  imdb_id: string;
  overview: string;
  poster_path: string;
  title: string;
  vote_average: string;
};

export type TFeedbackType = "error" | "warning" | "success" | "info";

export type TButtons = TButton[];
