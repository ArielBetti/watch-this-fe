// types
import { TCardMovieProps } from './type';

// icons
import { MinusSmallIcon, PlusSmallIcon } from '@heroicons/react/24/outline';
import Tooltip from '../Tooltip';

// constants
import { IMAGE_URL } from '../../../constants';

// ::
const CardMovie = ({ selected, title, image, onAddMovie, onDeleteMovie }: TCardMovieProps) => {
  return (
    <div className="relative flex h-44 w-36 shadow-md">
      {onAddMovie && onDeleteMovie && (

      <button
        onClick={selected ? onDeleteMovie : onAddMovie}
        className="absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full border border-primary-light-contrast bg-primary text-white shadow-lg"
      >
        {selected ? <MinusSmallIcon className="h-5 w-5" /> : <PlusSmallIcon className="h-5 w-5" />}
      </button>
      )}
      <Tooltip message={title}>
        {image ? (
          <img
            draggable={false}
            className="h-0 max-h-full min-h-full w-0 min-w-full max-w-full rounded-md"
            src={`${IMAGE_URL}${image}`}
            alt={`${title} banner`}
          />
        ) : (
          <div className="h-0 max-h-full min-h-full w-0 min-w-full max-w-full rounded-md bg-primary-dark-contrast p-2 font-semibold text-white">
            {title}
          </div>
        )}
      </Tooltip>
    </div>
  );
};

export default CardMovie;
