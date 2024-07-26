import { Typography, Box } from '@mui/material'

const style = { p: 1 }

const SingleMovieListHead = ({ list }) => {
  return (
    <Box sx={style}>
      <Typography variant="h4" gutterBottom>
        {list.listName}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        {list.description}
      </Typography>
    </Box>
  )
}

export default SingleMovieListHead


