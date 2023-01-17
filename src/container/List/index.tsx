import { useState, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useRecoilState, useResetRecoilState } from 'recoil';

// components
import {
  BackdropLoader,
  ButtonDone,
  Card,
  CardMovie,
  InlineLoading,
  Input,
  MovieList,
  Sidebar,
  Tapume,
} from '../../components';

// types
import type { TTmdbMoviesAndTvResult } from '../../interfaces/api';
import type { TContainerListProps } from './type';

// recoil: atoms
import { atomUserCreateList } from '../../recoil/atoms';

// utils
import { removeListItem } from '../../utils/removeListItem';

// hooks
import { usePushNotification } from '../../hooks/usePushNotification';
import useDebounce from '../../hooks/useDebounce';

// paths
import { PATHS } from '../../core/paths';

// queries and mutations
import {
  useCreateUserListMutation,
  useEditUserListMutation,
  useGetListQuery,
  useGetTmdbByQueryQuery,
} from '../../queries';

// ::
const ContainerList = ({ type }: TContainerListProps) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const notify = usePushNotification();

  // queries and mutations
  const sendCreateList = useCreateUserListMutation();
  const sendEditList = useEditUserListMutation();

  // local: states
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);
  const [sendError, setSendError] = useState(false);
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const [feedBack, setFeedback] = useState('');
  const [listname, setListName] = useState('');

  // recoil: states
  const [newList, setNewList] = useRecoilState(atomUserCreateList);

  // recoil: resets
  const resetNewList = useResetRecoilState(atomUserCreateList);

  const getList = useGetListQuery({
    id,
    onSuccess: (data) => {
      setListName(data.title);
      setNewList(data.list);
    },
  });

  const getByQuery = useGetTmdbByQueryQuery(debouncedSearch);

  // memo: states
  const isLoadingScreen = useMemo(() => {
    return sendCreateList?.isLoading || sendEditList?.isLoading || getList.isFetching;
  }, [sendCreateList, sendEditList, getList]);

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
      if (type === 'create') {
        sendCreateList.mutate(
          {
            list: newList,
            title: listname,
          },
          {
            onSuccess: (data) => {
              notify({
                message: `Lista ${data.title} criada com sucesso`,
                title: 'Sucesso!',
              });
              setSideBarOpen(false);
              resetNewList();
              navigate(`${PATHS.list}/${data.id}`);
            },
          }
        );
      } else {
        sendEditList.mutate(
          {
            id,
            list: newList,
            title: listname,
          },
          {
            onSuccess: (data) => {
              notify({
                message: `Lista ${data.title} editada com sucesso`,
                title: 'Sucesso!',
              });
              setSideBarOpen(false);
              resetNewList();
              navigate(`${PATHS.list}/${data.id}`);
            },
          }
        );
      }
    } else {
      setFeedback('Escolha um nome para a lista!');
    }
  };

  const onChangeListName = (name: string) => {
    setFeedback('');
    setListName(name);
  };

  const handleErrorRetry = () => {
    if (sendCreateList.isError) {
      setSendError(false);
    }
    if (getList.isError) {
      getList.refetch();
    }
  };

  useEffect(() => {
    resetNewList();
    () => {
      resetNewList();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <BackdropLoader open={isLoadingScreen} />
      <Sidebar
        handleSubmit={() => handleSubmitList()}
        open={sideBarOpen}
        setSideBarOpen={setSideBarOpen}
        triggerComponent={
          <ButtonDone onClick={() => setSideBarOpen(true)} counter={newList.length} />
        }
      >
        <MovieList list={newList} />
      </Sidebar>
      <div className="flex w-full max-w-5xl flex-col gap-5">
        <input
          placeholder="Nome da lista"
          value={listname}
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
        </div>
        <div className="flex w-full items-start justify-start py-1">
          <InlineLoading isLoading={getByQuery.isFetching} text="Carregando..." />
        </div>
        <div className="flex w-full flex-wrap items-center justify-center gap-5 pb-10">
          {getByQuery.data?.results?.map((movie) => (
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
      {getList?.data && (
        <div className="w-full flex-col items-start justify-start">
          <h2 className="py-5 text-3xl font-semibold">Na sua lista atual</h2>
          <Card className="flex w-full flex-wrap items-center justify-start gap-5 p-5">
            {getList?.data?.list?.map((movie) => (
              <CardMovie
                key={movie.id}
                disabled={!!newList?.find((item) => item.id === movie.id)}
                title={`${movie.title || movie.name}`}
                image={movie.poster_path}
                handleClick={() => handleClickMovie(movie)}
              />
            ))}
          </Card>
        </div>
      )}
    </div>
  );
};

export default ContainerList;
