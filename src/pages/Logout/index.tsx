import { useEffect } from 'react';
import { useNavigate } from 'react-router';

// paths
import { PATHS } from '../../core/paths';

// zustand: hooks
import { useAuthActions, useToken, useUser } from '../../stores';

// components
import { BackdropLoader } from '../../components';

// ::
const Logout = () => {
  const navigate = useNavigate();

  // zustand: states
  const user = useUser();
  const token = useToken();

  // zustand: actions
  const { logout } = useAuthActions();

  useEffect(() => {
    logout();
  }, [logout]);

  useEffect(() => {
    if (!user && !token) return navigate(PATHS.login);
    return logout();
  }, [user, token, logout, navigate]);

  return <BackdropLoader open />;
};

export default Logout;
