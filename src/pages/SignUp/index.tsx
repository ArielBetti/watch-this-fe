import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  useRecoilValue,
} from "recoil";

// icons
import { PATHS } from "../../core/paths";

// icons
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

// recoil: atoms
import {
  atomUser,
} from "../../recoil/atoms";

// types
import type { TAvatar } from "../../interfaces";
import { type TInputFeedback } from "../../components/Atoms/Input/types";

// components
import { CardSignUp, CustomAvatar } from "../../components";

const initialState: TAvatar = {
  backgroundColor: [],
  eyebrows: [],
  eyes: [],
  flip: true,
  mouth: [],
  url: '',
}

// ::
const SignOut = () => {
  const navigate = useNavigate();

  // local: states
  const [avatar, setAvatar] = useState<TAvatar>(initialState);

  // recoil: states
  const user = useRecoilValue(atomUser);
  const [feedback, setFeedback] = useState<TInputFeedback>({
    message: '',
    type: 'info',
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (user) navigate(PATHS.home);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div className="container mx-auto flex flex-col gap-6 px-4">
      <div className="flex">
        <Link
          to={PATHS.login}
          className="group flex items-center gap-2 text-primary transition-all hover:text-primary-dark-contrast"
        >
          <ArrowLeftIcon className="h-5 w-5 group-hover:-translate-x-1" />
          Voltar para login
        </Link>
      </div>
      <div className="flex flex-wrap items-start justify-center gap-10">
        <CustomAvatar setConstructAvatar={setAvatar} />
        <CardSignUp
          avatar={avatar}
          feedback={feedback}
          setFeedback={setFeedback}
        />
      </div>
    </div>
  );
};

export default SignOut;
