import { Box } from '@mui/material'

const flexSpaceAround = {
  display: 'flex',
  justifyContent: 'space-around',
  alignContent : 'center', // vs alignItems
  gap: 2,
  p: 2,
  flexDirection: { xs: 'column', md: 'row' },
}

const FlexSpaceAround = ({ children }) => {

  return (
    <Box sx={flexSpaceAround}>
      {children}
    </Box>
  )
}

export default FlexSpaceAround