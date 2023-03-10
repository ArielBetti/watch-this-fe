import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useLayoutEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import Confetti from "react-confetti";

// radix: components
import * as RadixToast from "@radix-ui/react-toast";
import * as Tooltip from "@radix-ui/react-tooltip";

// recoil
import { useRecoilValue } from "recoil";

// router
import AppRouter from "../routes";

// recoil: atoms
import { atomConfettiState, atomTheme } from "../recoil/atoms";

// hooks
import { useWindowDimensions } from "../hooks/useWindowDimensions";

// components
import { Header, Toast } from "../components";

// Create a client
const queryClient = new QueryClient();

// ::
const App = () => {
  const theme = useRecoilValue(atomTheme);
  const { width, height } = useWindowDimensions();

  // recoil: states
  const confettiState = useRecoilValue(atomConfettiState);

  useLayoutEffect(() => {
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
    <QueryClientProvider client={queryClient}>
      <RadixToast.Provider>
        <Tooltip.Provider>
          <BrowserRouter>
            {confettiState && (
              <div className="pointer-events-none fixed inset-0 z-20 overflow-hidden">
                <Confetti
                  width={width}
                  height={height}
                  recycle={false}
                  numberOfPieces={500}
                  tweenDuration={15000}
                  gravity={0.15}
                  style={{ zIndex: 50 }}
                />
              </div>
            )}
            <Header />
            <AppRouter />
            <Toast />
          </BrowserRouter>
          <RadixToast.Viewport className="fixed bottom-0 right-0 z-[100] m-0 flex w-full max-w-lg flex-col gap-3 p-10 outline-none" />
        </Tooltip.Provider>
      </RadixToast.Provider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
