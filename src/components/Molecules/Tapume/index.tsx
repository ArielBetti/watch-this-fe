// assets
import errorSvg from "../../../assets/error.svg";
import emptySvg from "../../../assets/empty.svg";
import infoSvg from "../../../assets/info.svg";

// types
import type { TTapumeProps } from "./types";

// components
import { Button } from "../..";

// ::
const Tapume = ({
  handleButtonClick,
  title,
  description,
  textButton = "Tentar novamente",
  type = "info",
  open,
}: TTapumeProps) => {
  const asset = {
    error: errorSvg,
    empty: emptySvg,
    info: infoSvg,
  };

  if (!open) return null;

  return (
    <div className="flex flex-col items-center justify-center gap-5 text-center motion-safe:animate-fadeIn">
      <img src={asset?.[type]} className="h-72 w-72" alt="Ilustração" />
      <h1 className="text-4xl font-semibold">{title}</h1>
      <p className="text-lg text-zinc-800 dark:text-zinc-400">{description}</p>
      {handleButtonClick && (
        <div className="flex items-center justify-center">
          <Button onClick={() => handleButtonClick()}>{textButton}</Button>
        </div>
      )}
    </div>
  );
};

export default Tapume;
