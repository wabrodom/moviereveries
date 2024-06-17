import Box from '@mui/material/Box';

const headerStyle = {
  textAlign: 'center',
  height: 20,
  bgcolor: 'primary.main',
  '&:hover': {
    bgcolor: 'primary.light',
    background: 'linear-gradient(to right bottom, #430089, #82ffa1)'
  },
}

const Header = () => {

  return (
    <Box sx={headerStyle}>
      Movie Reveries
    </Box>
  )
}

export default Header