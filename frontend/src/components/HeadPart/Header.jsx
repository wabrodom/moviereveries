import Box from '@mui/material/Box'

const headerStyle = {
  textAlign: 'center',
  height: 20,
  marginBottom: 1,
}

const Header = () => {

  return (
    <Box sx={headerStyle}>
      <h1>
        Movie Reveries
      </h1>
    </Box>
  )
}

export default Header