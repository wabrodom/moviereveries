import { Typography } from '@mui/material'

const typoGraphyInline = {
  display: 'inline-block',
  backgroundColor: 'lightgrey',
  padding: 0.5,
  borderRadius: 1,
}

const SingleMovieListHead = ({ list }) => {
  return (
    <Typography variant="h4" gutterBottom sx={typoGraphyInline}>
      {list.listName}
    </Typography>
  )
}

export default SingleMovieListHead


