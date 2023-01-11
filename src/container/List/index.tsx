import { useState, useEffect, useMemo } from "react";
import {
  useRecoilState,
  useRecoilValueLoadable,
  useResetRecoilState,
  useSetRecoilState,
} from "recoil";

// icons
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

// components
import {
  BackdropLoader,
  Button,
  ButtonDone,
  CardMovie,
  InlineLoading,
  Input,
  Modal,
  MovieList,
  Sidebar,
  Tapume,
} from "../../components";

// types
import type { TTmdbMoviesAndTvResult } from "../../interfaces/api";

// recoil: selectors
import {
  selectorGetList,
  selectorGetTmdbByQuery,
  selectorPutUserEditList,
  selectorSendUserCreateList,
} from "../../recoil/selectors";

// recoil: atoms
import {
  atomHashTmdbSearch,
  atomHashUserCreateList,
  atomTmdbSearch,
  atomUserCreateList,
  atomUserCreateListRequestBody,
  atomUserEditListRequestBody,
  atomUserListName,
} from "../../recoil/atoms";

// utils
import { removeListItem } from "../../utils/removeListItem";
import { usePushNotification } from "../../hooks/usePushNotification";
import { useNavigate, useParams } from "react-router";
import { PATHS } from "../../core/paths";
import { TContainerListProps } from "./type";
import { TEndpointUserLists } from "../../interfaces";

// ::
const ContainerList = ({ type }: TContainerListProps) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const notify = usePushNotification();

  // local: states
  const [oldList, setOldList] = useState<TEndpointUserLists>();
  const [search, setSearch] = useState("");
  const [sendError, setSendError] = useState(false);
  const [movieList, setMovieList] = useState<
    TTmdbMoviesAndTvResult[] | undefined
  >(undefined);
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const [feedBack, setFeedback] = useState("");

  // recoil: states
  const [listname, setListName] = useRecoilState(atomUserListName);
  const [newList, setNewList] = useRecoilState(atomUserCreateList);
  const setQuery = useSetRecoilState(atomTmdbSearch);
  const [hashQuery, setHashQuery] = useRecoilState(atomHashTmdbSearch);
  const setCreateListRequestBody = useSetRecoilState(
    atomUserCreateListRequestBody
  );
  const setEditListRequestBody = useSetRecoilState(atomUserEditListRequestBody);
  const [hashUserList, setHashUserList] = useRecoilState(
    atomHashUserCreateList
  );

  // recoil: resets
  const resetListName = useResetRecoilState(atomUserListName);
  const resetNewList = useResetRecoilState(atomUserCreateList);
  const resetCreateListRequestBody = useResetRecoilState(
    atomUserCreateListRequestBody
  );
  const resetEditListRequestBody = useResetRecoilState(
    atomUserEditListRequestBody
  );
  // recoil: lodables
  const getQueryMoviesLodable = useRecoilValueLoadable(selectorGetTmdbByQuery);
  const sendUserListLoadable = useRecoilValueLoadable(
    selectorSendUserCreateList
  );
  const getListLodable = useRecoilValueLoadable(selectorGetList(`${id}`));
  const putListEditLoadable = useRecoilValueLoadable(selectorPutUserEditList);

  // memo: states
  const isLoading = useMemo(() => {
    return (
      sendUserListLoadable.state === "loading" ||
      getListLodable.state === "loading" ||
      putListEditLoadable.state === "loading"
    );
  }, [
    sendUserListLoadable.state,
    getListLodable.state,
    putListEditLoadable.state,
  ]);

  const handleSearch = () => {
    setHashQuery(hashQuery + 1);
    setQuery(search);
  };

  const handleClickMovie = (selectedMovie: TTmdbMoviesAndTvResult) => {
    const isChecked = newList.find((movie) => movie.id === selectedMovie.id);

    if (isChecked) {
      removeListItem({
        item: selectedMovie,
        setState: setNewList,
        state: newList,
      });
    } else {
      setNewList([...newList, selectedMovie]);
    }
  };

  const handleSubmitList = () => {
    if (listname && newList.length > 0) {
      if (type === "create") {
        setCreateListRequestBody({
          title: listname,
          list: newList,
        });
      } else {
        setEditListRequestBody({
          id: `${oldList?.id}`,
          title: listname,
          list: newList,
        });
      }
    } else {
      setFeedback("Escolha um nome para a lista!");
    }
  };

  const onChangeListName = (name: string) => {
    setFeedback("");
    setListName(name);
  };

  const handleErrorRetry = () => {
    if (type === "edit") {
      setHashUserList(hashUserList + 1);
    }
    setSendError(false);
  };

  useEffect(() => {
    if (
      getQueryMoviesLodable.state === "hasValue" &&
      getQueryMoviesLodable.contents !== undefined
    ) {
      setMovieList(getQueryMoviesLodable.contents.results);
    }
  }, [getQueryMoviesLodable.state, getQueryMoviesLodable.contents]);

  useEffect(() => {
    if (
      sendUserListLoadable.state === "hasValue" &&
      sendUserListLoadable.contents !== undefined
    ) {
      const listId = sendUserListLoadable.contents.id;

      notify({
        message: `Lista ${listname} criada com sucesso`,
        title: "Sucesso!",
      });

      setSideBarOpen(false);
      setHashUserList(hashUserList + 1);

      resetCreateListRequestBody();
      resetNewList();
      resetListName();

      navigate(`${PATHS.list}/${listId}`);
    }

    if (sendUserListLoadable.state === "hasError") {
      setSendError(true);
    }
  }, [sendUserListLoadable.state, sendUserListLoadable.contents]);

  useEffect(() => {
    if (
      putListEditLoadable.state === "hasValue" &&
      putListEditLoadable.contents !== undefined
    ) {
      const listId = `${oldList?.id}`;

      notify({
        message: `Lista ${listname} atualizada com sucesso`,
        title: "Sucesso!",
      });

      setHashUserList(hashUserList + 1);
      setSideBarOpen(false);

      resetEditListRequestBody();
      resetNewList();
      resetListName();

      setTimeout(() => {
        navigate(`${PATHS.list}/${listId}`);
      }, 1000);
    }

    if (putListEditLoadable.state === "hasError") {
      setSendError(true);
    }
  }, [putListEditLoadable.state, putListEditLoadable.contents]);

  useEffect(() => {
    if (type === "edit") {
      if (
        getListLodable.state === "hasValue" &&
        getListLodable.contents !== undefined
      ) {
        setOldList(getListLodable.contents);
        setListName(getListLodable.contents.title);
        setNewList(getListLodable.contents.list);
        setMovieList(getListLodable.contents.list);
      }
    }
  }, [getListLodable.contents, getListLodable.state, type]);

  useEffect(() => {
    resetCreateListRequestBody();
    resetEditListRequestBody();
    resetListName();
    resetNewList();
    () => {
      resetCreateListRequestBody();
      resetEditListRequestBody();
      resetListName();
      resetNewList();
    };
  }, []);

  if (sendError) {
    return (
      <Tapume
        open
        title="Ops!"
        description="Ocorreu um erro :("
        handleButtonClick={() => handleErrorRetry()}
      />
    );
  }

  return (
    <div className="container mx-auto flex h-full flex-col items-center justify-center px-4">
      <BackdropLoader open={isLoading} />
      <Sidebar
        handleSubmit={() => handleSubmitList()}
        children={<MovieList list={newList} />}
        open={sideBarOpen}
        setSideBarOpen={setSideBarOpen}
        triggerComponent={
          <ButtonDone
            onClick={() => setSideBarOpen(true)}
            counter={newList.length}
          />
        }
      />
      <div className="flex w-full max-w-5xl flex-col gap-5">
        <input
          placeholder="Nome da lista"
          value={listname}
          onChange={(e) => onChangeListName(e.target.value)}
          className="bg-transparent text-4xl font-bold outline-none placeholder:text-zinc-700 dark:placeholder:text-zinc-600"
          type="text"
        />
        {feedBack && (
          <p className="text-xl font-bold text-feedback-error">{feedBack}</p>
        )}
        <div className="flex items-start gap-2">
          <Input
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Procure por séries ou filmes"
          />
          <Button onClick={() => handleSearch()}>
            <MagnifyingGlassIcon className="h-5 w-5" />
          </Button>
        </div>
        <div className="flex w-full items-start justify-start py-5">
          <InlineLoading
            isLoading={getQueryMoviesLodable.state === "loading"}
            text="Carregando..."
          />
        </div>
      </div>
      <div className="flex w-full flex-wrap items-center justify-center gap-5">
        {movieList?.map((movie) => (
          <CardMovie
            key={movie.id}
            disabled={!!newList?.find((item) => item.id === movie.id)}
            title={`${movie.title || movie.name}`}
            image={movie.poster_path}
            handleClick={() => handleClickMovie(movie)}
          />
        ))}
      </div>
    </div>
  );
};

export default ContainerList;
