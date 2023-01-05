import { Link } from "react-router-dom";

// paths
import { PATHS } from "../../../core/paths";

// components
import { Logo, ThemeToggle, UserMenu } from "../..";

// ::
const Header = () => {
  return (
    <div className="fixed left-0 top-0 h-16 w-full border-b border-zinc-300 bg-white shadow-md dark:border-zinc-600 dark:bg-zinc-800">
      <div className="container mx-auto flex h-full items-center justify-between px-4">
        <Link to={PATHS.login}>
          <Logo />
        </Link>
        <div className="flex gap-2">
          <ThemeToggle />
          <UserMenu />
        </div>
      </div>
    </div>
  );
};

export default Header;
