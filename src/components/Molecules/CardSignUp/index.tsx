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
import { useRecoilState, useResetRecoilState, useSetRecoilState } from "recoil";
import { atomSignUpBody, atomSignUpFeedback } from "../../../recoil/atoms";
import { getFeedbackType } from "../../../utils/getFeedbackType";

// ::
const CardSignUp: FC<TCardSignUpProps> = ({
  avatar,
  isLoading
}) => {
  // local: states
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  // recoil: states
  const [feedback, setFeedback] = useRecoilState(atomSignUpFeedback);
  const setSignUpRequestBody = useSetRecoilState(atomSignUpBody);

  // recoil: reset
  const resetFeedback = useResetRecoilState(atomSignUpFeedback);

  const feedBackType = useMemo(
    () => getFeedbackType(feedback?.type),
    [feedback]
  );

  const handleChangeName = (name: string) => {
    setName(name);
    if (feedback?.message) resetFeedback();
  }

  const handleSignUp = () => {
    if (name && password && avatar) {
      setSignUpRequestBody({
        avatar,
        name,
        password,
      });
    }
  };

  return (
    <div className="p-4 rounded-md shadow-md w-full lg:max-w-sm flex gap-3 flex-col bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600">
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
      <div className="py-4 flex flex-col gap-2">
        {feedback?.message && !isLoading && (
          <div
            className={`${feedBackType} flex justify-start items-center gap-1`}
          >
            <ExclamationCircleIcon className="h-6 w-6" />
            <p>{feedback.message}</p>
          </div>
        )}
        <InlineLoading text="Carregando..." isLoading={isLoading} />
      </div>
      <div className="flex md:flex-nowrap flex-wrap justify-start items-center gap-2">
        <Button className="w-auto" onClick={() => handleSignUp()}>
          <IdentificationIcon className="h-5 w-5" />
          Cadastrar
        </Button>
      </div>
    </div>
  );
};

export default CardSignUp;
