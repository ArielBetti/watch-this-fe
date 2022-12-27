import React, { FC, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { atomUser } from "../../recoil/atoms";
import { useNavigate } from "react-router";

const Home: FC = () => {
  const navigate = useNavigate();

  const user = useRecoilValue(atomUser);

  useEffect(() => {
    if (!user) return navigate("/");
  }, [user]);

  return <div>Home, hello: {user?.name}</div>;
};

export default Home;
