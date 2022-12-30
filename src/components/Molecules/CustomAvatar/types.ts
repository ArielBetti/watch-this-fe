import { Dispatch, SetStateAction } from "react";
import { TAvatar } from "../../../interfaces";

export type TCustomAvatarProps = {
  seed?: string;
  setConstructAvatar: Dispatch<SetStateAction<TAvatar | undefined>>;
}

export type TAvatarEyes =
  | "variant26"
  | "variant25"
  | "variant24"
  | "variant23"
  | "variant22"
  | "variant21"
  | "variant20"
  | "variant19"
  | "variant18"
  | "variant17"
  | "variant16"
  | "variant15"
  | "variant14"
  | "variant13"
  | "variant12"
  | "variant11"
  | "variant10"
  | "variant09"
  | "variant08"
  | "variant07"
  | "variant06"
  | "variant05"
  | "variant04"
  | "variant03"
  | "variant02"
  | "variant01";

export type TAvatarSkinColor =
  | "variant02"
  | "variant03"
  | "variant04"
  | "variant05";

export type TAvatarEyesBrow =
  | "variant10"
  | "variant09"
  | "variant08"
  | "variant07"
  | "variant06"
  | "variant05"
  | "variant04"
  | "variant03"
  | "variant02"
  | "variant01";

export type TAvatarMouth =
  | "variant30"
  | "variant29"
  | "variant28"
  | "variant27"
  | "variant26"
  | "variant25"
  | "variant24"
  | "variant23"
  | "variant22"
  | "variant21"
  | "variant20"
  | "variant19"
  | "variant18"
  | "variant17"
  | "variant16"
  | "variant15"
  | "variant14"
  | "variant13"
  | "variant12"
  | "variant11"
  | "variant10"
  | "variant09"
  | "variant08"
  | "variant07"
  | "variant06"
  | "variant05"
  | "variant04"
  | "variant03"
  | "variant02"
  | "variant01";

export type TAvatarAccessoires =
  | "sunglasses"
  | "glasses"
  | "smallGlasses"
  | "mustache"
  | "blush"
  | "birthmark";
