import type { TAvatar, TUser } from "..";

export type TUserSignInSuccessResponse = {
  message?: string;
  token: string;
  user: TUser;
};

export type TSignInRequestBody = {
  name: string;
  password: string;
};

export type TSignUpRequestBody = {
  name: string;
  password: string;
  avatar: TAvatar;
};

export type TUserSignUpSuccessResponse = {
  message: string;
};

export type TTmdbMovies = {
  page: number;
  results: TTmdbMoviesAndTvResult[];
  total_pages: number;
  total_results: number;
};

export type TTmdbTV = {
  results: TTmdbTVResult[];
} & TTmdbMovies;

export type TTmdbTVResult = {
  backdrop_path?: string;
  first_air_date?: string;
  genre_ids?: number[];
  id: number;
  name?: string;
  origin_country?: string[];
  original_language: string;
  original_name?: string;
  overview: string;
  popularity: number;
  poster_path?: string;
  vote_average: number;
  vote_count: number;
};

export type TTmdbResult = {
  adult?: boolean;
  backdrop_path?: string;
  genre_ids?: number[];
  id: number;
  original_language: string;
  original_title?: string;
  overview: string;
  popularity: number;
  poster_path?: string;
  release_date?: string;
  title?: string;
  video?: boolean;
  vote_average: number;
  vote_count: number;
};

export type TTmdbMoviesAndTvResult = {} & TTmdbTVResult & TTmdbResult;

export type TEndpointUserCreateList = {
  id: string;
  title: string;
  create_by: string;
  create_byId: string;
  avatar: TAvatar;
  list: TTmdbMoviesAndTvResult[];
  _id: string;
  __v: number;
};

export type TUserCreateListBody = {
  title: string;
  list: TTmdbMoviesAndTvResult[];
};
