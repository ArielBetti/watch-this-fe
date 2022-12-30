import { FC, useEffect, useMemo, useState } from "react";
import { atomUser } from "../../../recoil/atoms";
import { useRecoilValue } from "recoil";
import {
  TAvatarAccessoires,
  TAvatarEyes,
  TAvatarEyesBrow,
  TAvatarMouth,
  TAvatarSkinColor,
  TCustomAvatarProps,
} from "./types";
import { createAvatar } from "@dicebear/avatars";
import * as style from "@dicebear/adventurer-neutral";
import AvatarOptionSelector from "../../Atoms/AvatarOptionSelector";
import {
  AVATAR_ACCESSOIRES,
  AVATAR_EYES,
  AVATAR_EYESBROWS,
  AVATAR_MOUTH,
  AVATAR_SKIN_COLOR,
} from "./options";
import { stringify } from "qs";

const CustomAvatar: FC<TCustomAvatarProps> = ({
  seed = "WatchThis",
  setConstructAvatar,
}) => {
  // CONSTANTS
  const AVATAR_BASE_URL = "https://avatars.dicebear.com/api/adventurer-neutral";

  // local: states
  const [eyes, setEyes] = useState<TAvatarEyes | any>([]);
  const [eyesBrows, setEyesBrows] = useState<TAvatarEyesBrow | any>([]);
  const [mouth, setMouth] = useState<TAvatarMouth | any>([]);
  const [skinColor, setSkinColor] = useState<TAvatarSkinColor | any>([]);
  const [accessoires, setAccessoires] = useState<TAvatarAccessoires | any>([]);

  // recoil: states
  const user = useRecoilValue(atomUser);

  const getAvatarSvg = () => {
    return createAvatar(style, {
      accessoires: accessoires?.[0] ? accessoires : ["birthmark"],
      accessoiresProbability: accessoires?.[0] ? 100 : 0,
      eyes: eyes || null,
      eyebrows: eyesBrows || null,
      mouth: mouth || null,
      seed: seed,
      backgroundColor: skinColor || null,
      base64: true,
      flip: true,
    });
  };

  const getAvatarUrl = () => {
    let params = stringify(
      {
        accessoires: accessoires?.[0] ? accessoires : ["birthmark"],
        accessoiresProbability: accessoires?.[0] ? 100 : 0,
        backgroundColor: skinColor || null,
        eyes: eyes || null,
        eyebrows: eyesBrows || null,
        mouth: mouth || null,
        flip: true,
      },
      {
        encodeValuesOnly: true,
        arrayFormat: "brackets",
      }
    );

    return `${AVATAR_BASE_URL}/${encodeURIComponent(seed || "watchThis")}.svg${
      params ? `?${params}` : null
    }`;
  };

  useEffect(() => {
    const avatarURL = getAvatarUrl();

    setConstructAvatar({
      accessoires: accessoires || null,
      backgroundColor: skinColor || null,
      eyes: eyes || null,
      eyebrows: eyesBrows || null,
      mouth: mouth || null,
      flip: true,
      url: avatarURL,
    });
  }, [eyes, eyesBrows, mouth, setConstructAvatar, skinColor]);

  useEffect(() => {
    if (user) {
      setSkinColor([user?.avatar?.backgroundColor?.[0]]);
      setEyes([user?.avatar?.eyes?.[0]]);
      setEyesBrows([user?.avatar?.eyebrows?.[0]]);
      setMouth([user?.avatar?.mouth?.[0]]);
      setAccessoires([user?.avatar?.accessoires?.[0]]);
    } else {
      getAvatarSvg();
    }
  }, [user]);

  console.log(getAvatarUrl());

  return (
    <div className="select-none md:max-w-xs p-5 bg-white border-zinc-300 dark:bg-zinc-800 rounded-md border dark:border-zinc-600 shadow-lg flex flex-col gap-2 items-center justify-center">
      <img
        draggable={false}
        className="w-44 h-44 rounded-lg shadow-lg"
        src={getAvatarSvg()}
        alt=""
      />
      <div className="flex pt-6 flex-wrap items-center justify-center gap-2">
        <AvatarOptionSelector
          label="Acessórios"
          setCurrentOption={setAccessoires}
          options={AVATAR_ACCESSOIRES}
          currentOption={accessoires}
        />
        <AvatarOptionSelector
          label="Olhos"
          setCurrentOption={setEyes}
          options={AVATAR_EYES}
          currentOption={eyes}
        />
        <AvatarOptionSelector
          label="Cor"
          setCurrentOption={setSkinColor}
          options={AVATAR_SKIN_COLOR}
          currentOption={skinColor}
        />
        <AvatarOptionSelector
          label="Sobrancelhas"
          setCurrentOption={setEyesBrows}
          options={AVATAR_EYESBROWS}
          currentOption={eyesBrows}
        />
        <AvatarOptionSelector
          label="Boca"
          setCurrentOption={setMouth}
          options={AVATAR_MOUTH}
          currentOption={mouth}
        />
      </div>
    </div>
  );
};

export default CustomAvatar;
