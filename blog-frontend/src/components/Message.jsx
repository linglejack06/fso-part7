import { useNotificationValue } from "../contexts/notificationContext";
import { ReactComponent as Alert } from "../alert.svg";
import { ReactComponent as Check } from "../check.svg";

const Message = () => {
  const notification = useNotificationValue();
  if (notification.message === "") return null;
  if (notification.error) {
    return (
      <div className="mx-auto flex h-8 w-5/6 justify-between rounded-lg bg-red-400 bg-opacity-90 p-4">
        <Alert className="h-4 w-4 self-center" />
        <h1>{notification.message}</h1>
      </div>
    );
  }
  return (
    <div className=" mx-auto flex h-8 w-5/6 items-center justify-between rounded-lg bg-green-100 bg-opacity-90 p-4">
      <Check className="h-4 w-4 self-center" />
      <h1 className="text-lg">{notification.message}</h1>
    </div>
  );
};

export default Message;
