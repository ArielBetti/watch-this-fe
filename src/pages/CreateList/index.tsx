import { useState, useEffect } from "react";
import { useRecoilValueLoadable, useSetRecoilState } from "recoil";

// icons
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

// components
import { Button, CardMovie, InlineLoading, Input } from "../../components";

// recoil: atoms
import { atomTmdbSearch } from "../../recoil/atoms/tmdb";
import { selectorGetTmdbByQuery } from "../../recoil/selectors";
import { TTmdbResult } from "../../interfaces/api";

// ::
const CreateList = () => {
  // local: states
  const [search, setSearch] = useState("");
  const [movieList, setMovieList] = useState<TTmdbResult[] | undefined>(
    undefined
  );

  const [newList, setNewList] = useState<TTmdbResult[]>([]);

  // recoil: states
  const setQuery = useSetRecoilState(atomTmdbSearch);

  // recoil: lodables
  const getQueryMoviesLodable = useRecoilValueLoadable(selectorGetTmdbByQuery);

  const handleSearch = () => {
    setQuery(search);
  };

  const handleClickMovie = (selectedMovie: TTmdbResult) => {
    const isChecked = newList.find((movie) => movie.id === selectedMovie.id);

    if (isChecked) {
      if (Array.isArray(newList)) {
        const index = newList?.findIndex(
          (item) => item?.id === selectedMovie.id
        );

        if (index > -1) {
          setNewList((prev) => {
            const newValue = [...prev];
            newValue.splice(index, 1);
            return newValue;
          });
        }
      }
    } else {
      setNewList([...newList, selectedMovie]);
    }
  };

  useEffect(() => {
    if (
      getQueryMoviesLodable.state === "hasValue" &&
      getQueryMoviesLodable.contents !== undefined
    ) {
      setMovieList(getQueryMoviesLodable.contents.results);
    }
  }, [getQueryMoviesLodable.state]);

  useEffect(() => {
    console.log(newList);
  }, [newList]);

  return (
    <div className="container mx-auto flex h-full flex-col items-center justify-center px-4">
      <div className="flex w-full max-w-5xl flex-col">
        <div className="flex gap-2">
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
            disabled={!!newList?.find((item) => item.id === movie.id)}
            title={movie.title}
            image={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            handleClick={() => handleClickMovie(movie)}
          />
        ))}
      </div>
    </div>
  );
};

export default CreateList;
