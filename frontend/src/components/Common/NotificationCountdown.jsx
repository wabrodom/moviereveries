import { useState, useEffect } from 'react'
import Alert from '@mui/material/Alert'
import Stack from '@mui/material/Stack'


const notificationStyle = {
  width: '60%',
  position: 'fixed',
  top: '60%',
  left: '50%',
  transform: 'translateX(-50%)',
  zIndex: 9999,
}

const NotificationCountdown = ({ severity, expireIn, countdownText, expiredText }) =>  {
  const timeInSec = Math.floor(expireIn / 1000)
  const [timeLeft, setTimeLeft] = useState(timeInSec)

  useEffect(() => {
    if (timeLeft <= 0) return

    const timerId = setInterval(() => {
      setTimeLeft(timeLeft - 1)
    }, 1000)

    return () => clearInterval(timerId)
  }, [timeLeft])

  // console.log('NotificationCountdown render', timeLeft)

  return (
    <Stack sx={notificationStyle} spacing={2}>
      {timeLeft > 0
        ? <Alert severity={severity}>{countdownText} {timeLeft}s</Alert>
        : <Alert severity={severity}>{expiredText}</Alert>
      }

    </Stack>
  )
}

export default NotificationCountdown


/*
  "success"
  "info"
  "warning"
  "error"
*/