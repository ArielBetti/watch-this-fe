import { useEffect, useMemo, useState } from 'react';
import { createAvatar } from '@dicebear/avatars';
import { stringify } from 'qs';
import * as style from '@dicebear/adventurer-neutral';

// types
import type {
  TAvatarAccessoires,
  TAvatarEyes,
  TAvatarEyesBrow,
  TAvatarMouth,
  TAvatarSkinColor,
  TCustomAvatarProps,
} from './types';

// zustand: hooks
import { useUser } from '../../../stores';

// recoil: atoms
import AvatarOptionSelector from '../../Atoms/AvatarOptionSelector';

// constants
import {
  AVATAR_ACCESSOIRES,
  AVATAR_EYES,
  AVATAR_EYESBROWS,
  AVATAR_MOUTH,
  AVATAR_SKIN_COLOR,
} from './options';

// ::
const CustomAvatar = ({ seed = 'WatchThis', setConstructAvatar }: TCustomAvatarProps) => {
  // CONSTANTS
  const AVATAR_BASE_URL = 'https://avatars.dicebear.com/api/adventurer-neutral';

  // local: states
  const [eyes, setEyes] = useState<TAvatarEyes>([]);
  const [eyesBrows, setEyesBrows] = useState<TAvatarEyesBrow>([]);
  const [mouth, setMouth] = useState<TAvatarMouth>([]);
  const [skinColor, setSkinColor] = useState<TAvatarSkinColor>([]);

  // TODO: Passar tipagem correta
  const [accessoires, setAccessoires] = useState<TAvatarAccessoires | any[]>([]);

  // zustand: states
  const user = useUser();

  // memo: states
  const accessoiresProbability = useMemo(() => (accessoires?.[0] ? 100 : 0), [accessoires]);

  const getAvatarSvg = () => {
    return createAvatar(style, {
      accessoires: accessoires,
      accessoiresProbability,
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
    const params = stringify(
      {
        accessoires: accessoires?.[0] ? accessoires : ['birthmark'],
        accessoiresProbability,
        backgroundColor: skinColor || null,
        eyes: eyes || null,
        eyebrows: eyesBrows || null,
        mouth: mouth || null,
        flip: true,
      },
      {
        encodeValuesOnly: true,
        arrayFormat: 'brackets',
      }
    );

    return `${AVATAR_BASE_URL}/${encodeURIComponent(seed || 'watchThis')}.svg${
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eyes, eyesBrows, mouth, setConstructAvatar, skinColor, accessoires]);

  useEffect(() => {
    if (user) {
      setSkinColor([user?.avatar?.backgroundColor?.[0]]);
      setEyes([user?.avatar?.eyes?.[0]]);
      setEyesBrows([user?.avatar?.eyebrows?.[0]]);
      setMouth([user?.avatar?.mouth?.[0]]);
      setAccessoires(user?.avatar?.accessoires?.[0] ? [user?.avatar?.accessoires?.[0]] : []);
    } else {
      getAvatarSvg();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div className="flex select-none flex-col items-center justify-center gap-2 rounded-md border border-zinc-300 bg-white p-5 shadow-lg dark:border-zinc-600 dark:bg-zinc-800 md:max-w-xs">
      <img
        draggable={false}
        className="h-44 w-44 rounded-lg shadow-lg"
        src={getAvatarSvg()}
        alt=""
      />
      <div className="flex flex-wrap items-center justify-center gap-2 pt-6">
        <AvatarOptionSelector
          label="Acessórios"
          setCurrentOption={setAccessoires}
          options={['', ...AVATAR_ACCESSOIRES]}
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
