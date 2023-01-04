import { FC, memo, useEffect, useMemo, useState } from "react";
import { useResetRecoilState, useSetRecoilState } from "recoil";

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
  const resetSignInRequestBody = useResetRecoilState(atomSignInBody);

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

  useEffect(() => {
    resetSignInRequestBody();
    () => {
      resetSignInRequestBody();
    }
  }, []);

  return (
    <Card className="w-full max-w-sm py-5 px-3">
      <div className="flex flex-col items-start justify-start gap-2">
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
      <div className="flex flex-col gap-2 py-5">
        {feedback && !isLoading && (
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
          disabled={disabledSignInButton}
          className="w-full disabled:cursor-not-allowed disabled:bg-primary/50 md:w-auto"
          onClick={() => handleSignInButton()}
        >
          <ArrowRightOnRectangleIcon className="h-5 w-5" />
          Entrar
        </Button>
        <Button
          className="w-full md:max-w-xs"
          onClick={() => navigate(PATHS.signup)}
        >
          <IdentificationIcon className="h-5 w-5" />
          Cadastrar
        </Button>
      </div>
    </Card>
  );
};

export default memo(CardLogin);
