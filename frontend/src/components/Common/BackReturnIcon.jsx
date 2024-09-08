import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn'
import { Button } from '@mui/material'

import { useNavigate } from 'react-router-dom'

const BackReturnIcon = () => {
  const navigate = useNavigate()
  const handleGoBack = () => navigate(-1)

  return (
    <Button onClick={handleGoBack} aria-label='back-button'>
      <KeyboardReturnIcon />back
    </Button>
  )
}

export default BackReturnIcon