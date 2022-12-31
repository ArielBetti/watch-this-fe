import { FC, useMemo, useState } from "react";

// icons
import {
  ExclamationCircleIcon,
  IdentificationIcon,
} from "@heroicons/react/24/outline";

// components
import { Input, Button, InlineLoading } from "../..";

// types
import type { TCardSignUpProps } from "./types";
import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import { atomConfettiState, atomSignUpBody, atomSignUpFeedback } from "../../../recoil/atoms";
import { getFeedbackType } from "../../../utils/getFeedbackType";

// ::
const CardSignUp: FC<TCardSignUpProps> = ({ avatar, isLoading }) => {
  // local: states
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  // recoil: states
  const confettiState = useSetRecoilState(atomConfettiState);
  const feedback = useRecoilValue(atomSignUpFeedback);
  const setSignUpRequestBody = useSetRecoilState(atomSignUpBody);

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
        <Button
          disabled={disabledSignUpButton}
          className="w-auto"
          onClick={() => handleSignUp()}
        >
          <IdentificationIcon className="h-5 w-5" />
          Cadastrar
        </Button>
      </div>
    </div>
  );
};

export default CardSignUp;
