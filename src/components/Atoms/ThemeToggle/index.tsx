import { useCallback } from "react";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import { useRecoilState } from "recoil";
import { atomTheme } from "../../../recoil/atoms";

const ThemeToggle = () => {
  const [theme, setTheme] = useRecoilState(atomTheme);

  const onToggle = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme]);

  return (
    <button className="bg-primary text-white flex gap-2 items-center p-2 rounded-sm shadow-md" onClick={() => onToggle()}>
      {theme === 'light' ? (
        <MoonIcon className="h-5 w-5" />
      ) : (
        <SunIcon className="h-5 w-5" />
      )}
    </button>
  );
};

export default ThemeToggle;
