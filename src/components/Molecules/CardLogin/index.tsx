import { FormEvent, memo, useMemo, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

// icons
import {
  ArrowRightOnRectangleIcon,
  IdentificationIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';

// components
import { Button, Card, InlineLoading, Input } from '../..';

// utils
import { getFeedbackType } from '../../../utils/getFeedbackType';

// paths
import { PATHS } from '../../../core/paths';

// types
import { TInputFeedback } from '../../Atoms/Input/types';

// queries and mutations
import { useLoginMutation } from '../../../queries/useLoginMutation';

// ::
const CardLogin = () => {
  // local: states
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [feedback, setFeedback] = useState<TInputFeedback>();

  // queries & mutations
  const signIn = useLoginMutation();

  // memo: state
  const disabledSignInButton = useMemo(() => !(name && password), [name, password]);

  const feedBackType = useMemo(() => getFeedbackType(feedback?.type), [feedback]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (signIn.isLoading) return;

    signIn.mutate(
      { name, password },
      {
        onError: (error) => {
          if (axios.isAxiosError(error)) {
            setFeedback({
              message: error?.response?.data?.message || 'Ocorreu um erro',
              type: 'error',
            });
          }
        },
      }
    );
  };

  return (
    <Card className="w-full max-w-sm py-5 px-3">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col items-start justify-start gap-2">
          <Input
            onChange={(e) => setName(e.target.value)}
            label="Nome"
            placeholder="Seu nome"
            autoComplete="name"
          />
          <Input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            label="Senha"
            placeholder="Sua senha"
            autoComplete="current-password"
          />
        </div>
        <div className="flex flex-col gap-2 py-5">
          {feedback && !signIn.isLoading && (
            <div className={`${feedBackType} flex items-center justify-start gap-1`}>
              <ExclamationCircleIcon className="h-6 w-6" />
              <p>{feedback.message}</p>
            </div>
          )}
          <InlineLoading text="Carregando..." isLoading={signIn.isLoading} />
        </div>
        <div className="flex flex-wrap items-center justify-start gap-2 md:flex-nowrap">
          <Button
            type="submit"
            disabled={disabledSignInButton}
            className="w-full disabled:cursor-not-allowed disabled:bg-primary/50 md:w-auto"
          >
            <ArrowRightOnRectangleIcon className="h-5 w-5" />
            Entrar
          </Button>
          <Button asChild className="w-full md:max-w-xs">
            <Link to={PATHS.signup}>
              <IdentificationIcon className="h-5 w-5" />
              Cadastrar
            </Link>
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default memo(CardLogin);
