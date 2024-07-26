import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box
} from '@mui/material'


const SingleMovieListBody = ({ data }) => {
  return (
    <Box sx={{ p: 1 }}>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Primary Title</TableCell>
              <TableCell>Impression</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.list.map((movie) => (
              <TableRow key={movie.movieId}>
                <TableCell>{movie.primary_title}</TableCell>
                <TableCell>{movie.impression}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

    </Box>
  )
}

export default SingleMovieListBody


