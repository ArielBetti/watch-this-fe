import { useMemo } from "react";

// radix: components
import * as Avatar from "@radix-ui/react-avatar";

// types
import type { TProfilePicture } from "./types";

// ::
const ProfilePicture = ({ fallback, url }: TProfilePicture) => {
  // memo: states
  const userFallback = useMemo(() => {
    const [firstName, lastName] = fallback.split(" ");
    const firstNameFirstLetter = firstName?.charAt(0);
    const lastNameFirstLetter = lastName?.charAt(0) || "";
    const fallbackName = `${firstNameFirstLetter} ${lastNameFirstLetter}`;

    return fallbackName.toUpperCase();
  }, [fallback]);

  return (
    <Avatar.Root className="flex h-10 w-10 select-none items-center overflow-hidden rounded-lg align-middle">
      <Avatar.Image
        className="h-full w-full object-cover shadow-md"
        src={url}
        alt={`user profile picture`}
      />
      <Avatar.Fallback
        className="flex h-full w-full items-center justify-center bg-primary font-bold text-white"
        delayMs={600}
      >
        {userFallback}
      </Avatar.Fallback>
    </Avatar.Root>
  );
};

export default ProfilePicture;
