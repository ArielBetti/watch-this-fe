import { useRecoilState } from "recoil";

// icons
import { TrashIcon } from "@heroicons/react/24/outline";

// contants
import { IMAGE_URL } from "../../../constants";

// types
import type { TMovieListProps } from "./type";

// recoil: atoms
import { atomUserCreateList } from "../../../recoil/atoms";

// utils
import { removeListItem } from "../../../utils/removeListItem";

// ::
const MovieList = ({ list }: TMovieListProps) => {
  // recoil: states
  const [itemsList, setItemsList] = useRecoilState(atomUserCreateList);

  if (!list) return null;

  return (
    <div className="flex select-none flex-col items-start justify-start gap-3">
      {list.map((item) => (
        <div className="flex w-full items-center justify-start gap-2">
          <div className="flex w-full items-start justify-start gap-3 rounded-md bg-white p-2 shadow-md dark:bg-zinc-800">
            {item.poster_path ? (
              <div className="min-w-fit">
                <img
                  draggable={false}
                  className="h-14 w-12 rounded-md shadow-md"
                  src={`${IMAGE_URL}${item.poster_path}`}
                  alt={`Poster image of ${item.title}`}
                />
              </div>
            ) : (
              <div className="h-10 w-10 rounded-md bg-primary shadow-md" />
            )}
            <p className="line-clamp-2">{item.title}</p>
          </div>
          <button
            onClick={() =>
              removeListItem({
                item: item,
                setState: setItemsList,
                state: itemsList,
              })
            }
            className="group flex-1 transition-colors hover:text-feedback-error"
          >
            <TrashIcon className="h-5 w-5" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default MovieList;
