import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useRecoilValueLoadable } from "recoil";
import { selectorGetList } from "../../recoil/selectors";
import { BackdropLoader, Card, ProfilePicture } from "../../components";
import { TEndpointUserLists } from "../../interfaces";

import { CardMovie } from "../../components";
import { usePushNotification } from "../../hooks/usePushNotification";
import * as Avatar from "@radix-ui/react-avatar";
import CopyToClipboard from "react-copy-to-clipboard";
import { LinkIcon } from "@heroicons/react/24/outline";
import { PATHS } from "../../core/paths";

const List = () => {
  const { id } = useParams();
  const pushNotification = usePushNotification();

  // local: states
  const [list, setList] = useState<TEndpointUserLists>();

  // recoil: lodables
  const getListLodable = useRecoilValueLoadable(selectorGetList(`${id}`));

  const listUrl = `${import.meta.env.VITE_WATCH_THIS_FE_BASE_URL}${
    PATHS.list
  }/${list?.id}`;

  useEffect(() => {
    if (
      getListLodable.state === "hasValue" &&
      getListLodable.contents !== undefined
    ) {
      setList(getListLodable.contents);
    }
  }, [getListLodable.state, getListLodable.contents]);

  if (getListLodable.state === "loading") {
    return <BackdropLoader open />;
  }

  return (
    <div className="container mx-auto flex flex-col gap-5 px-4 py-5">
      <CopyToClipboard
        text={listUrl}
        onCopy={() =>
          pushNotification({
            title: `Lista ${list?.title} copiada com sucesso!`,
            message: "Link copiado para área de transferência",
          })
        }
      >
        <button className="flex items-center gap-2 text-primary transition-all hover:text-primary-dark-contrast">
          <LinkIcon className="w--5 h-5" />
          Compartilhar lista
        </button>
      </CopyToClipboard>
      <div className="flex flex-wrap items-center justify-start gap-3">
        <Avatar.Root className="flex h-20 w-20 select-none items-center overflow-hidden rounded-lg align-middle">
          <Avatar.Image
            className="h-full w-full object-cover shadow-lg"
            src={list?.avatar.url}
            alt={`user profile picture`}
          />
          <Avatar.Fallback
            className="flex h-full w-full items-center justify-center bg-primary font-bold text-white"
            delayMs={600}
          >
            {list?.create_by}
          </Avatar.Fallback>
        </Avatar.Root>
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold">{list?.title}</h1>
          <p className="font-semibold">{list?.create_by}</p>
        </div>
      </div>

      <Card className="flex select-none flex-wrap items-center justify-center">
        <div className="flex items-center justify-center flex-wrap gap-5 px-4 py-8">
          {list?.list.map((item) => (
            <CardMovie title={item.title} image={item.poster_path} />
          ))}
        </div>
      </Card>
    </div>
  );
};

export default List;
