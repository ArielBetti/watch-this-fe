import { type MutableRefObject, useRef } from "react";
import { Link } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";

// icons
import {
  ArrowTopRightOnSquareIcon,
  LinkIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";

// paths
import { PATHS } from "../../../core/paths";

// constants
import { IMAGE_URL } from "../../../constants";

import { useDraggable } from "react-use-draggable-scroll";

// types
import type { TCardListProps } from "./types";

// components
import { Card, ProfilePicture } from "../..";
import { usePushNotification } from "../../../hooks/usePushNotification";

// ::
const CardList = ({ list }: TCardListProps) => {
  const pushNotification = usePushNotification();

  const listUrl = `${import.meta.env.VITE_WATCH_THIS_FE_BASE_URL}${
    PATHS.list
  }/${list.id}`;

  // refs
  const ref = useRef<HTMLDivElement>() as MutableRefObject<HTMLInputElement>;
  const { events } = useDraggable(ref); // Now we pass the reference to the useDraggable hook:

  if (list.list.length === 0) return null;
  const [firstItem] = list.list;

  return (
    <Card
      className="flex w-full flex-col gap-2 p-4 motion-safe:animate-fadeIn lg:max-w-xl gap-y-4"
      image={`${IMAGE_URL}${firstItem.poster_path}`}
    >
      <Link
        className="text-[#FFF] transition-all"
        to={`${PATHS.list}/${list.id}`}
      >
        <h2 className="max-w-[180px] truncate whitespace-nowrap text-[#FFF] text-sm md:text-lg font-bold md:max-w-md hover:text-primary-dark-contrast hover:underline">
          {list?.title}
        </h2>
      </Link>
      <div className="flex items-center justify-between gap-5">
        <div
          {...events}
          ref={ref}
          className="inline-flex max-w-sm select-none gap-2 overflow-hidden"
        >
          {list.list.map((item) =>
            item.poster_path ? (
              <img
                className="h-16 w-16 shadow-sm"
                key={item.id}
                draggable={false}
                src={`${IMAGE_URL}${item.poster_path}`}
              />
            ) : (
              <div key={item.id} className="h-16 w-16 bg-primary shadow-sm" />
            )
          )}
        </div>
      </div>      
      <div>
        <div className="flex gap-5">
          <div className="flex items-center gap-2">
            <ProfilePicture fallback={list.create_by} url={list?.avatar?.url} />
            <p className="max-w-[180px] truncate whitespace-nowrap text-[#FFF] text-sm md:text-lg md:max-w-md">
              {list.create_by}
            </p>
          </div>
          <CopyToClipboard
            text={listUrl}
            onCopy={() =>
              pushNotification({
                title: `Lista ${list.title} copiada com sucesso!`,
                message: "Link copiado para área de transferência",
              })
            }
          >
            <button className="flex items-center gap-2 text-[#FFF] transition-all hover:text-primary-dark-contrast  hover:underline text-xs sm:text-lg">
              <LinkIcon className="h-3 w-3 sm:h-5 sm:w-5" />
              Compartilhar
            </button>
          </CopyToClipboard>
          <Link
            className="flex items-center gap-2 text-[#FFF] transition-all hover:text-primary-dark-contrast hover:underline text-xs sm:text-lg"
            to={`${PATHS.editList}/${list.id}`}
          >
            <PencilIcon className="h-3 w-3 sm:h-5 sm:w-5" />
            Editar
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default CardList;
