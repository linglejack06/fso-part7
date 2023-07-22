import { createContext, useReducer, useContext } from "react";

const notificationContext = createContext();

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SET":
      return {
        message: action.payload.message,
        error: action.payload.error,
      };
    case "REMOVE":
      return {
        message: "",
        error: false,
      };
    default:
      return state;
  }
};

export const NotificationContextProvider = ({ children }) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, {
    message: "",
    error: false,
  });
  return (
    <notificationContext.Provider value={[notification, notificationDispatch]}>
      {children}
    </notificationContext.Provider>
  );
};
export function setNotification(message, error) {
  return {
    type: "SET",
    payload: {
      message: message,
      error: error,
    },
  };
}
export function removeNotification() {
  return {
    type: "REMOVE",
  };
}
export function displayMessage(dispatch, message, error = false) {
  dispatch(setNotification(message, error));
  setTimeout(() => {
    dispatch(removeNotification());
  }, 5000);
}
export function useNotificationValue() {
  const [notification, notificationDispatch] = useContext(notificationContext);
  return notification;
}
export function useNotificationDispatch() {
  const [notification, notificationDispatch] = useContext(notificationContext);
  return notificationDispatch;
}
