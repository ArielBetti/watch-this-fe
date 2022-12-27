import React, { FC, memo, useMemo } from "react";
import Card from "../../Atoms/Card";
import Input from "../../Atoms/Input";
import Button from "../../Atoms/Button";
import {
  ArrowRightOnRectangleIcon,
  IdentificationIcon,
} from "@heroicons/react/24/outline";

import InlineLoading from "../InlineLoading";
import { TCardLoginProps } from "./types";

const CardLogin: FC<TCardLoginProps> = ({ isLoading, feedback }) => {
  const feedBackType =`text-feedback-${feedback}`!!

  console.log('!teste:', feedBackType);

  return (
    <Card className="max-w-sm w-full py-5 px-3">
      <div className="flex flex-col justify-start items-start gap-2">
        <Input label="Nome" placeholder="Seu nome" />
        <Input type="password" label="Senha" placeholder="Sua senha" />
      </div>
      <div className="py-5 flex flex-col gap-2">
        {feedback && (
          <p className={`text-feedback-${feedback}`}>
            {feedback}
          </p>
        )}
        <InlineLoading text="Carregando..." isLoading={isLoading} />
      </div>
      <div className="flex md:flex-nowrap flex-wrap justify-start items-center gap-2">
        <Button className="md:w-auto w-full" onClick={() => console.log()}>
          <ArrowRightOnRectangleIcon className="h-5 w-5" />
          Entrar
        </Button>
        <Button className="md:max-w-xs w-full" onClick={() => console.log()}>
          <IdentificationIcon className="h-5 w-5" />
          Cadastrar
        </Button>
      </div>
    </Card>
  );
};

export default memo(CardLogin);
