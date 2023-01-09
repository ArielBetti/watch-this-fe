import { v4 as uuid } from "uuid";
import { useSetRecoilState } from "recoil";
import { atomNotifications } from "../recoil/atoms";

type TNotificationProps = {
  title: string;
  message: string;
  id: string;
};

export const usePushNotification = () => {
  const setState = useSetRecoilState(atomNotifications);

  const pushNotification = ({
    message,
    title,
  }: Omit<TNotificationProps, "id">) => {
    const newNotification = {
      title,
      message,
      id: uuid(),
    };

    setState((prev) => [...prev, newNotification]);
  };

  return pushNotification;
};
