import Notification from '../Common/Notification'
import useNotification from '../../contexts/NotificationContext/useNotification'
import NotificationCountdown from '../Common/NotificationCountdown'
import { useTokenExpire } from '../../contexts/TokenExpireContext'


const NotificationWrapper = () => {
  const { notification } = useNotification()
  const { expireIn } = useTokenExpire()

  const countdownText = 'Your token will be expire!'
  const expiredText = 'Your token is expired. Login again'

  return (
    <div>
      <Notification severity={notification.severity} text={notification.text} />
      {expireIn > 0 &&
        <NotificationCountdown
          severity={'info'}
          expireIn={expireIn}
          countdownText={countdownText}
          expiredText={expiredText}
        />
      }
    </div>
  )
}

export default NotificationWrapper