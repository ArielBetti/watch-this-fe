import { FC, memo, useMemo, useState } from "react";
import { useSetRecoilState } from "recoil";

import {
  ArrowRightOnRectangleIcon,
  IdentificationIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";

// components
import { Button, Card, InlineLoading, Input } from "../..";

// types
import type { TCardLoginProps } from "./types";

// recoil: atoms
import { atomSignInBody } from "../../../recoil/atoms";

// utils
import { getFeedbackType } from "../../../utils/getFeedbackType";
import { useNavigate } from "react-router";
import { PATHS } from "../../../core/paths";

// ::
const CardLogin: FC<TCardLoginProps> = ({ isLoading, feedback }) => {
  const navigate = useNavigate();
  const feedBackType = useMemo(
    () => getFeedbackType(feedback?.type),
    [feedback]
  );

  // local: states
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  // recoil: states
  const setSignInRequestBody = useSetRecoilState(atomSignInBody);

  // memo: state
  const disabledSignInButton = useMemo(
    () => !(name && password && !isLoading),
    [name, password]
  );

  const handleSignInButton = () => {
    if (!disabledSignInButton)
      setSignInRequestBody({
        name,
        password,
      });
  };

  return (
    <Card className="max-w-sm w-full py-5 px-3">
      <div className="flex flex-col justify-start items-start gap-2">
        <Input
          onChange={(e) => setName(e.target.value)}
          label="Nome"
          placeholder="Seu nome"
        />
        <Input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          label="Senha"
          placeholder="Sua senha"
        />
      </div>
      <div className="py-5 flex flex-col gap-2">
        {feedback && !isLoading && (
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
        <Button
          disabled={disabledSignInButton}
          className="disabled:bg-primary/50 disabled:cursor-not-allowed md:w-auto w-full"
          onClick={() => handleSignInButton()}
        >
          <ArrowRightOnRectangleIcon className="h-5 w-5" />
          Entrar
        </Button>
        <Button className="md:max-w-xs w-full" onClick={() => navigate(PATHS.signin)}>
          <IdentificationIcon className="h-5 w-5" />
          Cadastrar
        </Button>
      </div>
    </Card>
  );
};

export default memo(CardLogin);
