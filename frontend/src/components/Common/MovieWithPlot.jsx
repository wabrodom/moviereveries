import { Link } from 'react-router-dom'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography
} from '@mui/material'

const MovieWithPlot = ({ movies }) => {

  const titleStyle = { width: '25%' }
  const plotStyle = { width: '40%' }
  const titleBodyStyle = { ...titleStyle , verticalAlign: 'top' }
  const plotBodyStyle  = { ...plotStyle, verticalAlign: 'top' }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={titleStyle}>
              <Typography variant="h6">Title</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6">Genres</Typography>
            </TableCell>
            <TableCell sx={plotStyle}>
              <Typography variant="h6">Plot</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6">Year</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6">Work Type</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {movies.map((movie) => (
            <TableRow key={movie.imdb_id}>
              <TableCell sx={titleBodyStyle}>
                <Link to={`/movies/${movie.imdb_id}`}>
                  {movie.primary_title}
                </Link>
              </TableCell>
              <TableCell>{movie.genres.join(', ')}</TableCell>
              <TableCell sx={plotBodyStyle}>{movie.plot}</TableCell>
              <TableCell>{movie.start_year}</TableCell>
              <TableCell>{movie.type}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default MovieWithPlot
