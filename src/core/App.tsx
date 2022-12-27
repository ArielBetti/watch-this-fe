import { BrowserRouter } from "react-router-dom";
import { useEffect } from "react";

// recoil
import { useRecoilValue } from 'recoil';

// router
import AppRouter from "../routes";
import { atomTheme } from "../recoil/atoms";


const App = () => {
  const theme = useRecoilValue(atomTheme);

  useEffect(() => {
    if (
      theme === "dark" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <div className="dark:text-white text-black dark:bg-zinc-900 bg-gray-200 min-h-screen transition-colors">
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </div>
  );
};

export default App;
