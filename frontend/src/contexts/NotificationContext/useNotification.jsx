import { useContext } from 'react'
import { NotificationContext } from './NotificationContext'

const useNotification = () => useContext(NotificationContext)

export default useNotification


/*
   return (
    <NotificationContext.Provider value={{ notification, notify }}>
      {children}
    </NotificationContext.Provider>
  )
*/