import { FC } from "react";

const Welcome: FC = () => {
  return (
    <div className="flex flex-col gap-2 max-w-md lg:text-left text-center">
      <h1 className="text-6xl font-bold text-primary">WatchThis</h1>
      <p className="text-lg tracking-wider">
        Com WatchThis você pode criar listas dos filmes e séries que você mais
        gosta compartilhar com seus amigos, interagir com outras pessoas sobre
        os seus conteudos favoritos!
      </p>
    </div>
  );
};

export default Welcome;
