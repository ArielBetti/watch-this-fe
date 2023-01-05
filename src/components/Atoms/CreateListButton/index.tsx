import { Link } from "react-router-dom";

// paths
import { PATHS } from "../../../core/paths";
import { PlusSmallIcon } from "@heroicons/react/24/outline";

// ::
const CreateListButton = () => {
  return (
    <div className="flex">
      <Link
        to={PATHS.createList}
        className="transition-colors group flex w-auto gap-2 items-center justify-center hover:text-primary"
      >
        <PlusSmallIcon className="h-5 w-5" />
        Criar nova lista
      </Link>
    </div>
  );
};

export default CreateListButton;
