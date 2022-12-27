import React, { FC } from "react";
import { TCard } from "./types";

const Card: FC<TCard> = ({ children, className }) => {
  return (
    <div className={`${className} p-2 bg-white dark:bg-zinc-800 shadow-md rounded-md border dark:border-zinc-700 border-gray-300`}>
      {children}
    </div>
  );
};

export default Card;
