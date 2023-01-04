import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useRecoilValue } from "recoil";

// paths
import { PATHS } from "../../core/paths";

// recoil: atoms
import { atomUser } from "../../recoil/atoms";

// ::
const Home = () => {
  const navigate = useNavigate();

  // recoil: states
  const user = useRecoilValue(atomUser);

  useEffect(() => {
    if (!user) return navigate(PATHS.login);
  }, [user]);

  return (
    <div className="container mx-auto px-4">
      Home, hello: {user?.name} <img width={100} src={user.avatar.url} alt="" />
    </div>
  );
};

export default Home;
