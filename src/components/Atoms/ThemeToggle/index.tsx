import { useCallback } from "react";
import { useRecoilState } from "recoil";

// icons
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";

// recoil: atoms
import { atomTheme } from "../../../recoil/atoms";

// radix: components
import * as Toggle from "@radix-ui/react-toggle";

// ::
const ThemeToggle = () => {
  // recoil: states
  const [theme, setTheme] = useRecoilState(atomTheme);

  // callbacks
  const onToggle = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme]);

  return (
    <Toggle.Root
      aria-label="Toggle theme"
      className="transition-colors hover:bg-primary-dark-contrast flex justify-center items-center gap-2 w-10 rounded-lg bg-primary p-2 text-white shadow-md"
      onClick={() => onToggle()}
    >
      {theme === "light" ? (
        <MoonIcon className="h-5 w-5" />
      ) : (
        <SunIcon className="h-5 w-5" />
      )}
    </Toggle.Root>
  );
};

export default ThemeToggle;
