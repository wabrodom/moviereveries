import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
} from '@mui/material'
import ButtonSaveList from './ButtonSaveList'
import { useLocation } from 'react-router-dom'
import TableCellHead from '../Common/TypoGraphy/TableCellHead'


const flexEnd = {
  display: 'flex',
  justifyContent: 'space-between',
  p: 2,
}

const SingleMovieListBody = ({ list }) => {
  const { state } = useLocation()
  const isOwn = state ? state.isOwn : false

  return (
    <Box sx={{ p: 1 }}>

      <Box sx={flexEnd}>
        <Typography variant="subtitle1" gutterBottom>
          {list.description}
        </Typography>

        {isOwn ? null : <ButtonSaveList list={list} />}

      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCellHead>Title</TableCellHead>
              <TableCellHead>Impression</TableCellHead>
            </TableRow>
          </TableHead>
          <TableBody>
            {list.list.map((movie) => (
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


