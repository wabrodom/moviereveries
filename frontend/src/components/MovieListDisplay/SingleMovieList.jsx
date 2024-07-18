import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box
} from '@mui/material';


const SingleMovieList = ({ data }) => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        {data.listName}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        {data.description}
      </Typography>
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

export default SingleMovieList


