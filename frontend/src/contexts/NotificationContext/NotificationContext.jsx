import { createContext, useState } from 'react'

export const NotificationContext = createContext()

export const NotificationProvider = ({ children }) => {
  const initialState = { severity: null, text: null }
  const [notification, setNotification] = useState(initialState)

  const notify = (severity, text) => {
    setNotification({ severity, text })
    setTimeout(() => {
      setNotification(initialState)
    }, 5000)
  }

  return (
    <NotificationContext.Provider value={{ notification, notify }}>
      {children}
    </NotificationContext.Provider>
  )
}
