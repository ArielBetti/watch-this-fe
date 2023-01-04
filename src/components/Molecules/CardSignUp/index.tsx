import { FC, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";

// utils
import { getFeedbackType } from "../../../utils/getFeedbackType";

// icons
import {
  ArrowRightIcon,
  ExclamationCircleIcon,
  IdentificationIcon,
} from "@heroicons/react/24/outline";

// paths
import { PATHS } from "../../../core/paths";

// recoil: atoms
import {
  atomConfettiState,
  atomSignUpBody,
  atomSignUpFeedback,
} from "../../../recoil/atoms";

// components
import { Input, Button, InlineLoading, Modal } from "../..";

// radix: components
import * as Dialog from "@radix-ui/react-dialog";

// types
import type { TCardSignUpProps } from "./types";

// ::
const CardSignUp: FC<TCardSignUpProps> = ({
  avatar,
  isLoading,
  signUpModalOpen,
  setSignUpModalOpen,
}) => {
  // local: states
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  // recoil: states
  const user = useRecoilValue(atomSignUpBody);
  const confettiState = useSetRecoilState(atomConfettiState);
  const feedback = useRecoilValue(atomSignUpFeedback);
  const setSignUpRequestBody = useSetRecoilState(atomSignUpBody);
  const resetSignUpBody = useResetRecoilState(atomSignUpBody);

  // recoil: reset
  const resetFeedback = useResetRecoilState(atomSignUpFeedback);

  // memo: states
  const disabledSignUpButton = useMemo(
    () => !(name && password && !isLoading),
    [name, password]
  );

  const feedBackType = useMemo(
    () => getFeedbackType(feedback?.type),
    [feedback]
  );

  const handleChangeName = (name: string) => {
    setName(name);
    if (feedback?.message) resetFeedback();
  };

  const handleSignUp = () => {
    confettiState(false);
    if (name && password && avatar) {
      setSignUpRequestBody({
        avatar,
        name,
        password,
      });
    }
  };

  useEffect(() => {
    resetSignUpBody();
    () => {
      resetSignUpBody();
    };
  }, []);

  return (
    <div className="flex w-full flex-col gap-3 rounded-md border border-zinc-300 bg-white p-4 shadow-md dark:border-zinc-600 dark:bg-zinc-800 lg:max-w-sm">
      <Input
        onChange={(e) => handleChangeName(e.target.value)}
        type="text"
        label="Nome"
        placeholder="Seu nome"
      />
      <Input
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        label="Senha"
        placeholder="Sua senha"
      />
      <div className="flex flex-col gap-2 py-4">
        {feedback?.message && !isLoading && (
          <div
            className={`${feedBackType} flex items-center justify-start gap-1`}
          >
            <ExclamationCircleIcon className="h-6 w-6" />
            <p>{feedback.message}</p>
          </div>
        )}
        <InlineLoading text="Carregando..." isLoading={isLoading} />
      </div>
      <div className="flex flex-wrap items-center justify-start gap-2 md:flex-nowrap">
        <Modal
          open={signUpModalOpen}
          setModalOpen={setSignUpModalOpen}
          modalTrigger={
            <Button
              disabled={disabledSignUpButton}
              className="w-auto"
              onClick={() => handleSignUp()}
            >
              <IdentificationIcon className="h-5 w-5" />
              Cadastrar
            </Button>
          }
        >
          <div className="flex-col items-start justify-start gap-2">
            <Dialog.Title className="text-lg font-semibold">
              Sucesso!
            </Dialog.Title>
            <Dialog.Description>
              <p className="pt-6">
                Olá <span className="font-bold text-primary">{user?.name}</span>{" "}
                sua conta foi criada com sucesso, faça login para começar!
              </p>
              <div className="flex">
                <Link
                  to={PATHS.login}
                  className="group flex items-center gap-2 pt-3 font-semibold text-primary transition-all hover:text-primary-dark-contrast"
                >
                  Ir para Login{" "}
                  <ArrowRightIcon className="h-5 w-5 group-hover:-translate-x-1" />
                </Link>
              </div>
            </Dialog.Description>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default CardSignUp;
