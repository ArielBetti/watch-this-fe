import { useSetRecoilState } from "recoil";
import { atomConfettiState } from "../recoil/atoms";

export default function useConfetti(duration = 13000) {
  const setOpen = useSetRecoilState(atomConfettiState);

  const unMountConfetti = () => {
    setTimeout(() => {
      setOpen(false);
    }, duration);
  }

  const activeConfetti = () => {
    setOpen(true);
    unMountConfetti();
  }

  return activeConfetti;
}
