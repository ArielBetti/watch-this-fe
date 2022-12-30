import { useEffect, useState } from "react";
import type { TAvatar } from "../../interfaces";
import { CardSignUp, CustomAvatar } from "../../components";
import {
  useRecoilValueLoadable,
  useResetRecoilState,
  useSetRecoilState,
} from "recoil";
import { atomSignUpBody, atomSignUpFeedback, atomUser } from "../../recoil/atoms";
import { selectorSendSignUp } from "../../recoil/selectors";
import { useNavigate } from "react-router";
import { useWindowDimensions } from "../../hooks/useWindowDimensions";
import { TInputFeedback } from "../../components/Atoms/Input/types";

const SignIn = () => {
  // constants
  const initialFeedbackType: TInputFeedback = {
    message: "",
    type: "info",
  }

  // local: states
  const [avatar, setAvatar] = useState<TAvatar | undefined>(undefined);

  // recoil: states
  const setFeedback = useSetRecoilState(atomSignUpFeedback);
  const resetSignUpBody = useResetRecoilState(atomSignUpBody);

  // recoil: loadable
  const signUpLoadable = useRecoilValueLoadable(selectorSendSignUp);

  useEffect(() => {
    if (signUpLoadable.state === "hasError") {
      if (signUpLoadable.contents?.response?.data?.message) {
        console.log('@ERRO@', signUpLoadable.contents?.response?.data?.message);

        return setFeedback({
          message: `${signUpLoadable.contents?.response?.data?.message}`,
          type: 'error',
        });
      }
      setFeedback(initialFeedbackType);
    }
    if (
      signUpLoadable.state === "hasValue" &&
      signUpLoadable?.contents !== undefined
    ) {
      console.log('Registrado')
    }
  }, [signUpLoadable.state, signUpLoadable.contents]);

  useEffect(() => {
    resetSignUpBody();

    return () => {
      // will unmount
      resetSignUpBody();
    };
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="container mx-auto px-4 flex flex-wrap gap-10 items-start justify-center py-10">
      <CustomAvatar setConstructAvatar={setAvatar} />
      <CardSignUp
        avatar={avatar}
        isLoading={signUpLoadable.state === 'loading'}
      />
    </div>
  );
};

export default SignIn;
