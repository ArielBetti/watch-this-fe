import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useRecoilValue, useResetRecoilState } from "recoil";

// paths
import { PATHS } from "../../core/paths";

// recoil: atoms
import {
  atomSignInBody,
  atomSignUpBody,
  atomToken,
  atomUser,
} from "../../recoil/atoms";

// components
import { BackdropLoader } from "../../components";

// ::
const Logout = () => {
  const navigate = useNavigate();

  // recoil: states
  const user = useRecoilValue(atomUser);
  const token = useRecoilValue(atomToken);
  const resetToken = useResetRecoilState(atomToken);
  const resetUser = useResetRecoilState(atomUser);

  // recoil: reset
  const resetSignIn = useResetRecoilState(atomSignInBody);
  const resetSignUp = useResetRecoilState(atomSignUpBody);

  const logoutUser = () => {
    resetToken();
    resetUser();
    resetSignIn();
    resetSignUp();
  };

  useEffect(() => {
    logoutUser();
  }, []);

  useEffect(() => {
    if (!user && !token) return navigate(PATHS.login);
    return logoutUser();
  }, [user, token]);

  return <BackdropLoader open />;
};

export default Logout;
