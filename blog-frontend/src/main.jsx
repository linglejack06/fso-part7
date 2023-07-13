import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { NotificationContextProvider } from './contexts/notificationContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NotificationContextProvider>
      <App />
    </NotificationContextProvider>
  </React.StrictMode>,
)
