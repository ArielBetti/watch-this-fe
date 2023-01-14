import {
  useRecoilValue,
} from "recoil";

// recoil: atoms
import { atomUser } from "../../recoil/atoms";

// components
import { CardLogin, Welcome, WelcomeBack } from "../../components";

// ::
const Login = () => {
  // recoil: states
  const user = useRecoilValue(atomUser);

  return (
    <div className="container mx-auto flex w-full flex-col items-center justify-center gap-10 px-4 lg:flex-row">
      <Welcome />
      {user ? (
        <WelcomeBack />
      ) : (
        <CardLogin />
      )}
    </div>
  );
};

export default Login;
