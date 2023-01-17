import { useRecoilState } from "recoil";

// radix: components
import * as RadixToast from "@radix-ui/react-toast";

// icons
import { XMarkIcon } from "@heroicons/react/24/outline";

// recoil: atoms
import { atomNotifications } from "../../../recoil/atoms";

// ::
const Toast = () => {
  const [notifications, setNotifications] = useRecoilState(atomNotifications);

  const handleRemoveToast = (id: string) => {
    const newNotifications = notifications.filter(
      (notifcation) => notifcation.id !== id
    );

    setNotifications(newNotifications);
  };

  if (notifications.length === 0) return null;

  return (
    <div className="flex flex-col transition-all">
      {notifications.map((notification) => (
        <RadixToast.Root
          key={notification.id}
          onSwipeEnd={(event) => event?.preventDefault()}
          className="relative flex flex-col gap-2 rounded-md border border-zinc-300 bg-white px-3 py-5 shadow-md data-[state=open]:motion-safe:animate-leftSlide data-[state=closed]:motion-safe:animate-rightSlide dark:border-zinc-600 dark:bg-zinc-800"
          duration={notification.duration}
          onOpenChange={(open) => {
            if (!open) {
              setTimeout(() => {
                handleRemoveToast(notification.id);
              }, 255);
            }
          }}
        >
          <div className="flex justify-between gap-2">
            <RadixToast.Title className="flex w-full flex-wrap">
              <h1 className="break-words text-lg font-semibold line-clamp-2">
                {notification.title}
              </h1>
            </RadixToast.Title>
            <div className="flex items-center justify-center">
              <RadixToast.Action
                asChild
                altText="undo"
                className="rounded-sm hover:shadow-sm transition-colors hover:bg-primary"
              >
                <button>
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </RadixToast.Action>
            </div>
          </div>
          <RadixToast.Description className="flex flex-wrap">
            <p className="break-words text-sm text-zinc-600 line-clamp-2 dark:text-zinc-400">
              {notification.message}
            </p>
          </RadixToast.Description>
        </RadixToast.Root>
      ))}
    </div>
  );
};

export default Toast;
