import { useNotificationValue } from "../contexts/notificationContext";

const Message = () => {
  const notification = useNotificationValue();
  if (notification.message === '') return null;
  return (
    <h1 className={(notification.error) ? 'error message' : 'validation message'}>
      {notification.message}
    </h1>
  )
};

export default Message;