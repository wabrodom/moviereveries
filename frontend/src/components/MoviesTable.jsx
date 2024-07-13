import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { Link } from 'react-router-dom'
import TogglableSpan from "./TogglableSpan"

const MoviesTable = ({ movies }) => {
  const allDirectorsName = (arr) => arr.map(obj => obj.display_name).join(', ')

  const titleCellStyle =    { width: '50%', verticalAlign: 'top'}
  const directorCellStyle = { width: '40%', verticalAlign: 'top'}
  const releasedCellStyle = { width: '10%', verticalAlign: 'top'}

  return (
    <TableContainer component={Paper}>
    <Table>
      <TableHead>
        <TableRow>
            <TableCell sx={{ width: '50%' }}>Title</TableCell>
            <TableCell sx={{ width: '40%' }}>Director</TableCell>
            <TableCell sx={{ width: '10%' }}>Released</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
          {movies.map((movie) => (
            <TableRow key={movie.imdb_id}>
              <TableCell sx={titleCellStyle}>
                <Link to={`/movies/${movie.imdb_id}`}>
                  {movie.primary_title}
                </Link>
              </TableCell>
              <TableCell sx={directorCellStyle}>
                {
                  movie.directorsAddedUse.length < 2 
                    ? allDirectorsName(movie.directorsAddedUse)
                    : <div>
                        {allDirectorsName(movie.directorsAddedUse.slice(0, 1))}
                        <TogglableSpan buttonLabel={', ...'}>
                        , {allDirectorsName(movie.directorsAddedUse.slice(1))}
                        </TogglableSpan>
                      </div>
                }

              </TableCell>
              <TableCell sx={releasedCellStyle}>{movie.start_year}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    
  )
}


export default MoviesTable