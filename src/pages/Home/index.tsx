import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useRecoilState, useRecoilValue, useRecoilValueLoadable } from "recoil";

// paths
import { PATHS } from "../../core/paths";

// recoil: atoms
import {
  atomHashUserCreateList,
  atomUser,
  atomUserLists,
} from "../../recoil/atoms";
import { selectorGetUserLists } from "../../recoil/selectors";

// components
import {
  CardList,
  CreateListButton,
  InlineLoading,
  Tapume,
} from "../../components";

// ::
const Home = () => {
  const navigate = useNavigate();

  // recoil: states
  const user = useRecoilValue(atomUser);
  const [userLists, setUserLists] = useRecoilState(atomUserLists);
  const [hashUserList, setHashUserList] = useRecoilState(
    atomHashUserCreateList
  );

  // recoil: loadable
  const getUserListsLoadable = useRecoilValueLoadable(selectorGetUserLists);

  const handleRetryUserList = () => {
    setHashUserList(hashUserList + 1);
  };

  useEffect(() => {
    if (
      getUserListsLoadable.state === "hasValue" &&
      getUserListsLoadable.contents !== undefined
    ) {
      setUserLists(getUserListsLoadable.contents);
    }
  }, [getUserListsLoadable.state]);

  useEffect(() => {
    if (!user) return navigate(PATHS.login);
  }, [user]);

  return (
    <div className="container mx-auto px-4">
      <CreateListButton />
      <div className="py-5">
        <InlineLoading
          text="Carregando suas listas..."
          isLoading={getUserListsLoadable.state === "loading"}
        />
      </div>
      <Tapume
        open={getUserListsLoadable.state === "hasError"}
        title="Ops!"
        type="error"
        description="Ocorreu um erro."
        handleButtonClick={() => handleRetryUserList()}
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
