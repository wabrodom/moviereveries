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

const Notification = ({ severity, text }) =>  {
  if (text === null) {
    return null
  }
  return (
    <Stack sx={notificationStyle} spacing={2}>
      <Alert severity={severity}>{text}</Alert>
    </Stack>
  )
}

export default Notification


/*
  "success"
  "info"
  "warning"
  "error"
*/