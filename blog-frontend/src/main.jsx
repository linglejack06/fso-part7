import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { NotificationContextProvider } from "./contexts/notificationContext.jsx";
import { UserContextProvider } from "./contexts/userContext.jsx";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router } from "react-router-dom";

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <QueryClientProvider client={queryClient}>
        <UserContextProvider>
          <NotificationContextProvider>
            <App />
          </NotificationContextProvider>
        </UserContextProvider>
      </QueryClientProvider>
    </Router>
  </React.StrictMode>,
);
