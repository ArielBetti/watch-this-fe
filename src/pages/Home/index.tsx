import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useRecoilState, useRecoilValue, useRecoilValueLoadable } from "recoil";

// paths
import { PATHS } from "../../core/paths";

// recoil: atoms
import { atomUser, atomUserLists } from "../../recoil/atoms";
import { selectorGetUserLists } from "../../recoil/selectors";

// components
import { CardList, CreateListButton } from "../../components";

// ::
const Home = () => {
  const navigate = useNavigate();

  // recoil: states
  const user = useRecoilValue(atomUser);
  const [userLists, setUserLists] = useRecoilState(atomUserLists);

  // recoil: loadable
  const getUserListsLoadable = useRecoilValueLoadable(selectorGetUserLists);

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
      <div className="pb-10">
        <CreateListButton />
      </div>
      <div className="flex flex-wrap gap-5">
        {userLists?.map((list) => (
          <CardList key={list.id} list={list} />
        ))}
      </div>
    </div>
  );
};

export default Home;
