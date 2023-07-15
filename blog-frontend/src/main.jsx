import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { NotificationContextProvider } from './contexts/notificationContext.jsx';
import { UserContextProvider } from './contexts/userContext.jsx';
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <UserContextProvider>
        <NotificationContextProvider>
          <App />
        </NotificationContextProvider>
      </UserContextProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
