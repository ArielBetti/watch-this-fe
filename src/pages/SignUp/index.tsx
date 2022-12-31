import { useEffect, useMemo, useState } from "react";
import type { TAvatar } from "../../interfaces";
import { CardSignUp, CustomAvatar, Modal } from "../../components";
import {
  useRecoilValue,
  useRecoilValueLoadable,
  useResetRecoilState,
  useSetRecoilState,
} from "recoil";
import { atomConfettiState, atomSignUpBody, atomSignUpFeedback } from "../../recoil/atoms";
import { selectorSendSignUp } from "../../recoil/selectors";

import { TInputFeedback } from "../../components/Atoms/Input/types";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { PATHS } from "../../core/paths";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const SignOut = () => {
  const navigate = useNavigate();

  // constants
  const initialFeedbackType: TInputFeedback = {
    message: "",
    type: "info",
  };

  // local: states
  const [avatar, setAvatar] = useState<TAvatar | undefined>(undefined);
  const [open, setOpen] = useState(false);

  // recoil: states
  const setConfettiState = useSetRecoilState(atomConfettiState);
  const user = useRecoilValue(atomSignUpBody);
  const setFeedback = useSetRecoilState(atomSignUpFeedback);
  const resetSignUpBody = useResetRecoilState(atomSignUpBody);

  // recoil: loadable
  const signUpLoadable = useRecoilValueLoadable(selectorSendSignUp);

  useEffect(() => {
    if (signUpLoadable.state === "hasError") {
      if (signUpLoadable.contents?.response?.data?.message) {
        return setFeedback({
          message: `${signUpLoadable.contents?.response?.data?.message}`,
          type: "error",
        });
      }
      setFeedback(initialFeedbackType);
    }
    if (
      signUpLoadable.state === "hasValue" &&
      signUpLoadable?.contents !== undefined
    ) {
      setOpen(true);
      setConfettiState(true);
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
    <div className="container mx-auto flex flex-col gap-6 px-4 py-10">
      <div className="flex">
        <Link to={PATHS.login} className="group transition-all hover:text-primary-dark-contrast flex items-center gap-2 text-primary">
          <ArrowLeftIcon className="h-5 w-5 group-hover:-translate-x-1" />
          Voltar para login
        </Link>
      </div>
      <div className="flex flex-wrap items-start justify-center gap-10">
        <Modal open={open} handleCloseButton={() => setOpen(false)}>
          <div className="flex-col items-start justify-start gap-2">
            <h2 className="text-lg font-semibold">Sucesso!</h2>
            <p className="pt-6">
              Olá <span className="font-bold text-primary">{user?.name}</span>{" "}
              sua conta foi criada com sucesso, faça login para começar!
            </p>
          </div>
        </Modal>
        <CustomAvatar setConstructAvatar={setAvatar} />
        <CardSignUp
          avatar={avatar}
          isLoading={signUpLoadable.state === "loading"}
        />
      </div>
    </div>
  );
};

export default SignOut;
