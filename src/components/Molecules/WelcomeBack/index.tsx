import { useMemo } from "react";
import { useRecoilValue } from "recoil";

// radix: components
import * as Avatar from "@radix-ui/react-avatar";

// recoil: atoms
import { atomUser } from "../../../recoil/atoms";

import { useNavigate } from "react-router";

// components
import Button from "../../Atoms/Button";


import { PATHS } from "../../../core/paths";

// ::
const WelcomeBack = () => {
  const navigate = useNavigate();

  // recoil: states
  const user = useRecoilValue(atomUser);

  // memo: states
  const userFallback = useMemo(() => {
    const [firstName, lastName] = user.name.split(" ");
    const firstNameFirstLetter = firstName?.charAt(0);
    const lastNameFirstLetter = lastName?.charAt(0) || "";
    const fallbackName = `${firstNameFirstLetter} ${lastNameFirstLetter}`;

    return fallbackName.toUpperCase();
  }, [user]);

  return (
    <div className="flex flex-wrap items-center justify-center gap-10">
      <div>
        <Avatar.Root className="flex h-44 w-44 select-none items-center overflow-hidden rounded-lg bg-primary-dark-contrast align-middle">
          <Avatar.Image
            className="h-full w-full object-cover shadow-md"
            src={user.avatar.url}
            alt={`user profile picture`}
          />
          <Avatar.Fallback
            className="flex h-full w-full items-center justify-center bg-primary font-bold text-white"
            delayMs={600}
          >
            {userFallback}
          </Avatar.Fallback>
        </Avatar.Root>
      </div>
      <div className="flex flex-col gap-3">
        <Button onClick={() => navigate(PATHS.home)}>
          Continuar como {user.name}
        </Button>
        <Button onClick={() => navigate(PATHS.logout)}>
          Entrar com outra conta
        </Button>
      </div>
    </div>
  );
};

export default WelcomeBack;
