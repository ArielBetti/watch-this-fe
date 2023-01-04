import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import Confetti from "react-confetti";

// recoil
import { useRecoilValue } from "recoil";

// router
import AppRouter from "../routes";

// recoil: atoms
import { atomConfettiState, atomTheme } from "../recoil/atoms";

// hooks
import { useWindowDimensions } from "../hooks/useWindowDimensions";

// components
import { Header } from "../components";

// ::
const App = () => {
  const theme = useRecoilValue(atomTheme);
  const { width, height } = useWindowDimensions();

  // recoil: states
  const confettiState = useRecoilValue(atomConfettiState);

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
    <div className="py-24 min-h-screen bg-gray-200 text-black transition-colors dark:bg-zinc-900 dark:text-white">
      <BrowserRouter>
        {confettiState && (
          <Confetti
            width={width}
            height={height}
            recycle={false}
            numberOfPieces={500}
            tweenDuration={15000}
            gravity={0.15}
            style={{ zIndex: 10 }}
          />
        )}
        <Header />
        <AppRouter />
      </BrowserRouter>
    </div>
  );
};

export default App;
