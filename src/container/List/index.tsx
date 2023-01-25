import { useState, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router';

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
import { useQueryClient } from '@tanstack/react-query';
import { TEndpointUserLists } from '../../interfaces';

// ::
const ContainerList = ({ type }: TContainerListProps) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const notify = usePushNotification();
  const queryClient = useQueryClient();

  // queries and mutations
  const sendCreateList = useCreateUserListMutation();
  const sendEditList = useEditUserListMutation();

  // local: states
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);
  const [sendError, setSendError] = useState(false);
  const [feedBack, setFeedback] = useState('');
  const [listname, setListName] = useState<string>(() => {
    if (type === 'edit') {
      const userLists = queryClient
        .getQueryData<TEndpointUserLists[]>(['user_lists'])
        ?.find((list) => list.id === id);
      return userLists?.title ?? '';
    }
    return '';
  });
  const [movies, setMovies] = useState<TTmdbMoviesAndTvResult[]>(() => {
    if (type === 'edit') {
      const userLists = queryClient
        .getQueryData<TEndpointUserLists[]>(['user_lists'])
        ?.find((list) => list.id === id);
      return userLists?.list ?? [];
    }
    return [];
  });

  const getList = useGetListQuery({
    id,
    onSuccess: (data) => {
      setListName(data.title);
      setMovies(data.list);
    },
  });

  const getByQuery = useGetTmdbByQueryQuery(debouncedSearch);

  // memo: states
  const isLoadingScreen = useMemo(() => {
    return sendCreateList?.isLoading || sendEditList?.isLoading || getList.isFetching;
  }, [sendCreateList, sendEditList, getList]);

  const handleAddMovie = (movie: TTmdbMoviesAndTvResult) => {
    setMovies((currentMovies) => [...currentMovies, movie]);
  };

  const handleDeleteMovie = (movie: TTmdbMoviesAndTvResult) => {
    removeListItem({ item: movie, setState: setMovies, state: movies });
  };

  const handleSubmitList = () => {
    if (!listname || movies.length === 0) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setFeedback('Escolha um nome para a lista!');
      return;
    }
    if (type === 'create') {
      sendCreateList.mutate(
        {
          title: listname,
          list: movies,
        },
        {
          onSuccess: (data) => {
            queryClient.invalidateQueries({
              queryKey: ['user_lists'],
            });
            notify({
              message: `Lista ${data.title} criada com sucesso`,
              title: 'Sucesso!',
            });
            navigate(`${PATHS.list}/${data.id}`);
          },
        }
      );
    } else {
      sendEditList.mutate(
        {
          id,
          list: movies,
          title: listname,
        },
        {
          onSuccess: (data) => {
            queryClient.invalidateQueries({
              queryKey: ['user_lists'],
            });
            notify({
              message: `Lista ${data.title} editada com sucesso`,
              title: 'Sucesso!',
            });
            navigate(`${PATHS.list}/${data.id}`);
          },
        }
      );
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
        onSubmitList={handleSubmitList}
        triggerComponent={<ButtonDone counter={movies.length} />}
      >
        <MovieList list={movies} onDeleteMovie={handleDeleteMovie} />
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
            type="search"
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
              selected={!!movies?.find((item) => item.id === movie.id)}
              title={`${movie.title || movie.name}`}
              image={movie.poster_path}
              onAddMovie={() => handleAddMovie(movie)}
              onDeleteMovie={() => handleDeleteMovie(movie)}
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
                selected={!!movies?.find((item) => item.id === movie.id)}
                title={`${movie.title || movie.name}`}
                image={movie.poster_path}
                onAddMovie={() => handleAddMovie(movie)}
                onDeleteMovie={() => handleDeleteMovie(movie)}
              />
            ))}
          </Card>
        </div>
      )}
    </div>
  );
};

export default ContainerList;
