import { useMutation } from '@tanstack/react-query';
import { postSignIn } from '../services/postUserSignIn';
import { useLocation, useNavigate } from 'react-router';
import { PATHS } from '../core/paths';
import { useAuthActions } from '../stores';

export const useLoginMutation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || PATHS.home;

  // zustand: actions
  const { setUser, setToken } = useAuthActions();

  // Queries
  return useMutation({
    mutationFn: postSignIn,
    onSuccess: (data) => {
      setToken(data.token);
      setUser(data.user);
      navigate(from, { replace: true });
    },
  });
};
