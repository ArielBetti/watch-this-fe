// types
import { TCardMovieProps } from "./type";

// icons
import { MinusSmallIcon, PlusSmallIcon } from "@heroicons/react/24/outline";
import Tooltip from "../Tooltip";

// constants
import { IMAGE_URL } from "../../../constants";

const CardMovie = ({
  disabled,
  handleClick,
  title,
  image,
}: TCardMovieProps) => {
  return (
    <Tooltip message={title}>
      <div className="group relative flex h-44 w-36 shadow-md">
        {handleClick && (
          <button
            onClick={() => handleClick()}
            className="absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full border border-primary-light-contrast bg-primary text-white shadow-lg"
          >
            {disabled ? (
              <MinusSmallIcon className="h-5 w-5" />
            ) : (
              <PlusSmallIcon className="h-5 w-5" />
            )}
          </button>
        )}
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
      </div>
    </Tooltip>
  );
};

export default CardMovie;
