import { FC } from "react";
import { CardLogin, LoadingStatus, Welcome } from "../../components";

const Login: FC = () => {
  return (
    <div className="pt-40 container mx-auto px-4 flex items-center lg:flex-row flex-col w-full justify-center gap-10">
      <Welcome />
      <CardLogin isLoading feedback='error' />
    </div>
  );
};

export default Login;
