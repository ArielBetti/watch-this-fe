import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  useRecoilValue,
  useRecoilValueLoadable,
  useResetRecoilState,
  useSetRecoilState,
} from "recoil";

// icons
import { PATHS } from "../../core/paths";

// icons
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

// recoil: selectors
import { selectorSendSignUp } from "../../recoil/selectors";

// recoil: atoms
import {
  atomConfettiState,
  atomSignUpBody,
  atomSignUpFeedback,
  atomUser,
} from "../../recoil/atoms";

// types
import type { TAvatar } from "../../interfaces";
import { type TInputFeedback } from "../../components/Atoms/Input/types";

// components
import { CardSignUp, CustomAvatar, Modal } from "../../components";

// ::
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
  const user = useRecoilValue(atomUser);
  const setConfettiState = useSetRecoilState(atomConfettiState);
  const setFeedback = useSetRecoilState(atomSignUpFeedback);

  // recoil: resets
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

  useEffect(() => {
    if (user) navigate(PATHS.home);
  }, [user]);

  return (
    <div className="container mx-auto flex flex-col gap-6 px-4">
      <div className="flex">
        <Link
          to={PATHS.login}
          className="group flex items-center gap-2 text-primary transition-all hover:text-primary-dark-contrast"
        >
          <ArrowLeftIcon className="h-5 w-5 group-hover:-translate-x-1" />
          Voltar para login
        </Link>
      </div>
      <div className="flex flex-wrap items-start justify-center gap-10">
        <CustomAvatar setConstructAvatar={setAvatar} />
        <CardSignUp
          avatar={avatar}
          isLoading={signUpLoadable.state === "loading"}
          signUpModalOpen={open}
          setSignUpModalOpen={setOpen}
        />
      </div>
    </div>
  );
};

export default SignOut;
