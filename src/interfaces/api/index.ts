import type { TAvatar, TUser } from "..";

export type TUserSignInSuccessResponse = {
  message?: string,
  token: string,
  user: TUser,
};

export type TSignInRequestBody = {
  name: string;
  password: string;
};

export type TSignUpRequestBody = {
  name: string,
  password: string,
  avatar: TAvatar,
}

export type TUserSignUpSuccessResponse = {
  message: string,
}
