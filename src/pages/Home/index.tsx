import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useRecoilState, useRecoilValue, useRecoilValueLoadable } from "recoil";
import { useQueryClient, useQuery } from "@tanstack/react-query";

// paths
import { PATHS } from "../../core/paths";

// recoil: atoms
import {
  atomUser,
  atomUserLists,
} from "../../recoil/atoms";

// components
import {
  CardList,
  CreateListButton,
  InlineLoading,
  Tapume,
} from "../../components";

// queries
import { useUserListsQuery } from "../../queries";

// ::
const Home = () => {
  const { data, isError, isLoading } = useUserListsQuery();

  const navigate = useNavigate();

  // recoil: states
  const user = useRecoilValue(atomUser);
  const [userLists, setUserLists] = useRecoilState(atomUserLists);

  const handleRetryUserList = () => {
    // TODO: Refazer a chamada da lista.
  };

  useEffect(() => {
    if (data && !isError) {
      setUserLists(data);
    }
  }, [data, isLoading, isError]);

  useEffect(() => {
    if (!user) return navigate(PATHS.login);
  }, [user]);

  return (
    <div className="container mx-auto px-4">
      <CreateListButton />
      <div className="py-5">
        <InlineLoading
          text="Carregando suas listas..."
          isLoading={isLoading}
        />
      </div>
      <Tapume
        open={isError}
        title="Ops!"
        type="error"
        description="Ocorreu um erro."
        handleButtonClick={() => handleRetryUserList()}
      />
      <Tapume
        open={data?.length === 0}
        title="Você não possui listas"
        description="Crie uma nova para visualizar!"
        type="empty"
      />
      <div className="flex flex-wrap gap-5">
        {userLists?.map((list) => (
          <CardList key={list.id} list={list} />
        ))}
      </div>
    </div>
  );
};

export default Home;
