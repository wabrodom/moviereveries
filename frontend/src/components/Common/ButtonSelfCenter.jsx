import Button from '@mui/material/Button'

const alginSelfCenter = {
  alignSelf: 'center',
}

const ButtonSelfCenter = ({ children, ...restProps }) => {
  return (
    <Button variant="contained" sx={alginSelfCenter} {...restProps}>
      {children}
    </Button>
  )
}

export default ButtonSelfCenter