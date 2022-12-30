import { FC, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { atomUser } from "../../recoil/atoms";
import { useNavigate } from "react-router";
import { PATHS } from "../../core/paths";

const Home: FC = () => {
  const navigate = useNavigate();

  // recoil: states
  const user = useRecoilValue(atomUser);

  useEffect(() => {
    if (!user) return navigate(PATHS.login);
  }, [user]);

  return <div>Home, hello: {user?.name} <img width={100} src={user.avatar.url } alt="" /> </div>;
};

export default Home;
