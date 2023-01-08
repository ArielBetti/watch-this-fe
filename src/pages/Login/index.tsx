import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  useRecoilState,
  useRecoilValueLoadable,
  useSetRecoilState,
} from "recoil";

// paths
import { PATHS } from "../../core/paths";

// recoil: selectors
import { selectorSendSignIn } from "../../recoil/selectors";

// recoil: atoms
import { atomToken, atomUser } from "../../recoil/atoms";

// types
import type { TInputFeedback } from "../../components/Atoms/Input/types";

// components
import { CardLogin, Welcome, WelcomeBack } from "../../components";

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
    <div className="container mx-auto flex w-full flex-col items-center justify-center gap-10 px-4 lg:flex-row">
      <Welcome />
      {user ? (
        <WelcomeBack />
      ) : (
        <CardLogin
          isLoading={userSignInLoadable.state === "loading"}
          feedback={feedbackAlert}
        />
      )}
    </div>
  );
};

export default Login;
