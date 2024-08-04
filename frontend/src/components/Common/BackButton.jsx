import ButtonSelfCenter from './ButtonSelfCenter'
import { useNavigate } from 'react-router-dom'

const BackButton = () => {
  const navigate = useNavigate()
  const handleGoBack = () => navigate(-1)

  return (
    <ButtonSelfCenter onClick={handleGoBack}>
      go back
    </ButtonSelfCenter>
  )
}

export default BackButton