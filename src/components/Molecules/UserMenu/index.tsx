import { useRecoilValue } from "recoil";
import { Link } from "react-router-dom";

// paths
import { PATHS } from "../../../core/paths";

// icons
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline";

// radix: components
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

// recoil: states
import { atomUser } from "../../../recoil/atoms";

// components
import { ProfilePicture } from "../../";

// ::
const UserMenu = () => {
  // recoil: states
  const user = useRecoilValue(atomUser);

  if (!user) return null;

  return (
    <DropdownMenu.Root modal={false}>
      <DropdownMenu.Trigger className="flex items-center justify-center">
        <ProfilePicture fallback={user.name} url={user.avatar.url} />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content className="motion-safe:animate-downSlide mt-1 w-full min-w-[200px] rounded-md border border-zinc-300 bg-white p-2 shadow-lg dark:border-zinc-600 dark:bg-zinc-800">
        <DropdownMenu.Item className="outline-none">
          <Link to={PATHS.logout} className="w-full">
            <div className="flex w-full gap-2 rounded-md p-2 transition-colors hover:bg-feedback-error">
              <ArrowLeftOnRectangleIcon className="h-6 w-6" />
              Sair
            </div>
          </Link>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default UserMenu;
