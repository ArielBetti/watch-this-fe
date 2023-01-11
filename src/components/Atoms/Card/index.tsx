import { PropsWithChildren } from 'react';

// types
import { TCard } from "./types";

// ::
const Card = ({
  children,
  className,
  image,
}: PropsWithChildren<TCard>) => {
  return (
    <div
      className={`${className} rounded-md border border-gray-300 bg-white p-2 shadow-md dark:border-zinc-700 dark:bg-zinc-800
      relative overflow-hidden group
      `}
    >
      {image && (
        <div
          className='absolute inset-0 z-[-1]  transition-transform group-hover:scale-105'
          style={{
            background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url("'+ image +'") no-repeat',
            backgroundPosition: 'center center',
            backgroundSize: 'cover',
          }}
        >
        </div>
      )}
      {children}
    </div>
  );
};

export default Card;
