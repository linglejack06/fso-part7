import { useNotificationValue } from "../contexts/notificationContext";
import { ReactComponent as Alert } from "../alert.svg";
import { ReactComponent as Check } from "../check.svg";

const Message = () => {
  const notification = useNotificationValue();
  if (notification.message === "") return null;
  if (notification.error) {
    return (
      <div className="mx-auto mb-4 flex h-16 min-h-fit w-5/6 items-center justify-between rounded-lg bg-red-400 bg-opacity-90 p-4">
        <Alert className="mr-2 h-8 w-8 self-center" />
        <h1 className="flex-auto text-lg">{notification.message}</h1>
      </div>
    );
  }
  return (
    <div className=" mx-auto mb-4 flex h-16 min-h-fit w-5/6 items-center justify-between rounded-lg bg-green-100 bg-opacity-90 p-4">
      <Check className="mr-2 h-8 w-8 self-center" />
      <h1 className="flex-auto text-lg">{notification.message}</h1>
    </div>
  );
};

export default Message;
