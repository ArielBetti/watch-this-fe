import { useState, useEffect } from "react";
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
} from "../../components";

// types
import type { TTmdbMoviesAndTvResult } from "../../interfaces/api";

// recoil: selectors
import {
  selectorGetTmdbByQuery,
  selectorSendUserCreateList,
} from "../../recoil/selectors";

// recoil: atoms
import {
  atomHashTmdbSearch,
  atomHashUserCreateList,
  atomTmdbSearch,
  atomUserCreateList,
  atomUserCreateListRequestBody,
  atomUserListName,
} from "../../recoil/atoms";

// utils
import { removeListItem } from "../../utils/removeListItem";
import { usePushNotification } from "../../hooks/usePushNotification";

// ::
const CreateList = () => {
  const notify = usePushNotification();

  // local: states
  const [search, setSearch] = useState("");
  const [movieList, setMovieList] = useState<
    TTmdbMoviesAndTvResult[] | undefined
  >(undefined);
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const [feedBack, setFeedback] = useState('');

  // recoil: states
  const [listname, setListName] = useRecoilState(atomUserListName);
  const [newList, setNewList] = useRecoilState(atomUserCreateList);
  const setQuery = useSetRecoilState(atomTmdbSearch);
  const [hashQuery, setHashQuery] = useRecoilState(atomHashTmdbSearch);
  const setCreateListRequestBody = useSetRecoilState(
    atomUserCreateListRequestBody
  );
  const [hashUserList, setHashUserList] = useRecoilState(
    atomHashUserCreateList
  );

  // recoil: resets
  const resetListName = useResetRecoilState(atomUserListName);
  const resetNewList = useResetRecoilState(atomUserCreateList);
  const resetCreateListRequestBody = useResetRecoilState(
    atomUserCreateListRequestBody
  );

  // recoil: lodables
  const getQueryMoviesLodable = useRecoilValueLoadable(selectorGetTmdbByQuery);
  const sendUserListLoadable = useRecoilValueLoadable(
    selectorSendUserCreateList
  );

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
      setCreateListRequestBody({
        title: listname,
        list: newList,
      });
    } else {
      setFeedback("Escolha um nome para a lista!");
    }
  };

  const onChangeListName = (name: string) => {
    setFeedback('');
    setListName(name);
  }

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
      notify({
        message: `Lista ${listname} criada com sucesso`,
        title: "Sucesso!",
      });
      setSideBarOpen(false);
      setHashUserList(hashUserList + 1);

      resetCreateListRequestBody();
      resetNewList();
      resetListName();
    }
  }, [sendUserListLoadable.state, sendUserListLoadable.contents]);

  useEffect(() => {
    resetCreateListRequestBody();
    resetListName();
    resetNewList();
    () => {
      resetCreateListRequestBody();
      resetListName();
      resetNewList();
    };
  }, []);

  return (
    <div className="container mx-auto flex h-full flex-col items-center justify-center px-4">
      <BackdropLoader open={sendUserListLoadable.state === "loading"} />
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
          onChange={(e) => onChangeListName(e.target.value)}
          className="bg-transparent text-4xl font-bold outline-none placeholder:text-zinc-700 dark:placeholder:text-zinc-600"
          type="text"
        />
        {feedBack && <p className="text-xl font-bold text-feedback-error">{feedBack}</p>}
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

export default CreateList;
