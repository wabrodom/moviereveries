import Notification from '../Common/Notification'
import useNotification from '../../contexts/NotificationContext/useNotification'


const NotificationWrapper = () => {
  const { notification } = useNotification()

  return (
    <Notification severity={notification.severity} text={notification.text} />
  )
}

export default NotificationWrapper