import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useRecoilValue, useResetRecoilState } from 'recoil';

// paths
import { PATHS } from '../../core/paths';

// recoil: atoms
import { atomToken, atomUser } from '../../recoil/atoms';

// components
import { BackdropLoader } from '../../components';

// ::
const Logout = () => {
  const navigate = useNavigate();

  // recoil: states
  const user = useRecoilValue(atomUser);
  const token = useRecoilValue(atomToken);
  const resetToken = useResetRecoilState(atomToken);
  const resetUser = useResetRecoilState(atomUser);

  const logoutUser = () => {
    resetToken();
    resetUser();
  };

  useEffect(() => {
    logoutUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!user && !token) return navigate(PATHS.login);
    return logoutUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, token]);

  return <BackdropLoader open />;
};

export default Logout;
