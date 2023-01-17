import { TButton } from "../components/Atoms/Button/types";
import { TAvatarAccessoires, TAvatarEyes, TAvatarEyesBrow, TAvatarMouth, TAvatarSkinColor } from "../components/Molecules/CustomAvatar/types";
import { TTmdbMoviesAndTvResult } from "./api";

export type RecursivePartial<T> = {
  [P in keyof T]?:
    T[P] extends (infer U)[] ? RecursivePartial<U>[] :
    T[P] extends object ? RecursivePartial<T[P]> :
    T[P];
};

export type TUser = {
  avatar: TAvatar;
  name: string;
};

export type TAvatar = {
  accessoires?: TAvatarAccessoires;
  backgroundColor: TAvatarSkinColor;
  eyes: TAvatarEyes;
  eyebrows: TAvatarEyesBrow;
  mouth: TAvatarMouth;
  flip: boolean;
  url: string;
};

export type TEndpointUserEditList = {
  id: string;
  title: string;
  list: TTmdbMoviesAndTvResult[];
}

export type TEndpointUserLists = {
  id: string;
  title: string;
  create_by: string;
  create_byId: string;
  avatar: TAvatar,
  list: TTmdbMoviesAndTvResult[];
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
  title?: string;
  name?: string;
  vote_average: string;
};

export type TFeedbackType = "error" | "warning" | "success" | "info";

export type TButtons = TButton[];
