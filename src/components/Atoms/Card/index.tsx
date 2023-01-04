// types
import { TCard } from "./types";

// ::
const Card = ({ children, className }: TCard) => {
  return (
    <div
      className={`${className} rounded-md border border-gray-300 bg-white p-2 shadow-md dark:border-zinc-700 dark:bg-zinc-800`}
    >
      {children}
    </div>
  );
};

export default Card;
