import { useState } from "react";
import { useParams } from "react-router";
import { useRecoilState } from "recoil";
import { BackdropLoader, Card, Tapume } from "../../components";

import { CardMovie } from "../../components";
import { usePushNotification } from "../../hooks/usePushNotification";
import * as Avatar from "@radix-ui/react-avatar";
import CopyToClipboard from "react-copy-to-clipboard";
import { LinkIcon } from "@heroicons/react/24/outline";
import { PATHS } from "../../core/paths";
import { atomHashList } from "../../recoil/atoms/list";
import { useGetListQuery } from "../../queries";

const List = () => {
  const { id } = useParams();
  const pushNotification = usePushNotification();

  const getList = useGetListQuery({
    id,
    onError: (error) => {
      if (error?.response?.status === 404) {
        const errorMessage =
          error?.response?.data?.message || "Occoreu um erro.";
        setError({
          title: "Ops!",
          description: errorMessage,
          status: true,
          retry: false,
        });
      } else {
        setError({
          ...error,
          title: "Ops!",
          description: "Ocorreu um erro.",
          status: true,
          retry: true,
        });
      }
    },
  });

  // local: states
  const [error, setError] = useState({
    title: "",
    description: "",
    status: false,
     retry: false,
  });

  // recoil: states
  const [hashList, setHashList] = useRecoilState(atomHashList);

  const listUrl = `${import.meta.env.VITE_WATCH_THIS_FE_BASE_URL}${
    PATHS.list
  }/${getList.data?.id}`;

  const handleRetryGetList = () => {
    getList.refetch();
  };

  if (getList.isError) {
    return (
      <div className="container mx-auto px-4">
        <Tapume
          open
          type="error"
          title={error.title}
          description={error.description}
          handleButtonClick={error.retry ? () => handleRetryGetList() : null}
        />
      </div>
    );
  }

  if (!getList.data) return null;

  return (
    <div className="container mx-auto flex flex-col gap-5 px-4 py-5">
      <BackdropLoader open={getList.isFetching} />
      <CopyToClipboard
        text={listUrl}
        onCopy={() =>
          pushNotification({
            title: `Lista ${getList.data.title} copiada com sucesso!`,
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
            src={getList.data.avatar.url}
            alt={`user profile picture`}
          />
          <Avatar.Fallback
            className="flex h-full w-full items-center justify-center bg-primary font-bold text-white"
            delayMs={600}
          >
            {getList.data.create_by}
          </Avatar.Fallback>
        </Avatar.Root>
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold">{getList.data.title}</h1>
          <p className="font-semibold">{getList.data.create_by}</p>
        </div>
      </div>

      <Card className="flex select-none flex-wrap items-center justify-center">
        <div className="flex flex-wrap items-center justify-center gap-5 px-4 py-8">
          {getList.data.list.map((item) => (
            <CardMovie
              key={item.id}
              title={`${item.title || item.name}`}
              image={item.poster_path}
            />
          ))}
        </div>
      </Card>
    </div>
  );
};

export default List;
