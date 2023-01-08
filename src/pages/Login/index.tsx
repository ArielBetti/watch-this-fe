import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  useRecoilState,
  useRecoilValueLoadable,
  useSetRecoilState,
} from "recoil";

// recoil: selectors
import { selectorSendSignIn } from "../../recoil/selectors";

// recoil: atoms
import { atomToken, atomUser } from "../../recoil/atoms";

// types
import type { TInputFeedback } from "../../components/Atoms/Input/types";

// components
import { CardLogin, Welcome } from "../../components";
import { PATHS } from "../../core/paths";

// ::
const Login = () => {
  const navigate = useNavigate();

  // local: states
  const [feedbackAlert, setFeedBackAlert] = useState<
    TInputFeedback | undefined
  >(undefined);

  // recoil: states
  const [user, setUser] = useRecoilState(atomUser);
  const setToken = useSetRecoilState(atomToken);

  // recoil: loadables
  const userSignInLoadable = useRecoilValueLoadable(selectorSendSignIn);

  useEffect(() => {
    if (userSignInLoadable.state === "hasError") {
      setFeedBackAlert({
        message: `${
          userSignInLoadable.contents?.response?.data?.message ||
          "Ocorreu um erro"
        }`,
        type: "error",
      });
    }

    if (
      userSignInLoadable.state === "hasValue" &&
      userSignInLoadable.contents !== undefined
    ) {
      setToken(userSignInLoadable.contents.token);
      setUser(userSignInLoadable.contents.user);
      setFeedBackAlert(undefined);
      navigate(PATHS.home);
    }
  }, [userSignInLoadable.contents, userSignInLoadable.state]);

  return (
    <div className="pt-40 container mx-auto px-4 flex items-center lg:flex-row flex-col w-full justify-center gap-10">
      <Welcome />
      <CardLogin
        isLoading={userSignInLoadable.state === "loading"}
        feedback={feedbackAlert}
      />
    </div>
  );
};

export default Login;
