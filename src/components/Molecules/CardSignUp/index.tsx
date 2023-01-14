import { useMemo, useState, MouseEvent } from "react";

// utils
import { getFeedbackType } from "../../../utils/getFeedbackType";

// icons
import {
  ExclamationCircleIcon,
  IdentificationIcon,
} from "@heroicons/react/24/outline";

// hooks
import useConfetti from "../../../hooks/useConffeti";

// components
import { Input, Button, InlineLoading, Modal } from "../..";

// types
import type { TCardSignUpProps } from "./types";
import { useRegisterUserMutation } from "../../../queries";
import axios from "axios";
import { useLoginMutation } from "../../../queries/useLoginMutation";

// ::
const CardSignUp = ({
  avatar,
  isLoading,
  feedback,
  setFeedback,
}: TCardSignUpProps) => {
  const confetti = useConfetti();

  // local: states
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const signUp = useRegisterUserMutation();
  const signIn = useLoginMutation((error) => {
    if (axios.isAxiosError(error)) {
      setFeedback({
        message: error?.response?.data?.message || "Ocorreu um erro",
        type: "error",
      });
    }
  });

  const handleSignUp = (e: MouseEvent) => {
    e.preventDefault();

    signUp.mutate(
      {
        avatar,
        name,
        password,
      },
      {
        onSuccess: () => {
          confetti();
          signIn.mutate({
            name,
            password,
          });
        },
        onError: (error) => {
          if (axios.isAxiosError(error)) {
            if (error?.response?.data?.message) {
              setFeedback({
                message: `${error?.response?.data?.message}`,
                type: "error",
              });
            } else {
              setFeedback({
                message: "",
                type: "info",
              });
            }
          }
        },
      }
    );
  };

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
    if (feedback?.message)
      setFeedback({
        message: "",
        type: "info",
      });
  };

  return (
    <div className="flex w-full flex-col gap-3 rounded-md border border-zinc-300 bg-white p-4 shadow-md dark:border-zinc-600 dark:bg-zinc-800 lg:max-w-sm">
      <form onSubmit={(e) => e.preventDefault()}>
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
          <InlineLoading
            text="Carregando..."
            isLoading={isLoading || signUp.isLoading}
          />
        </div>
        <div className="flex flex-wrap items-center justify-start gap-2 md:flex-nowrap">
          <Button
            type="submit"
            disabled={disabledSignUpButton}
            className="w-auto"
            onClick={(e: MouseEvent) => handleSignUp(e)}
          >
            <IdentificationIcon className="h-5 w-5" />
            Cadastrar
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CardSignUp;
