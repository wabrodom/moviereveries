import { Paper, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'

import { useNavigate } from 'react-router-dom'
import ButtonAddMovieToList from './ButtonAddMovieToList'

const MovieInfoContainer = ({ movieDetails }) => {
  const navigate = useNavigate()
  const handleGoBack = () => navigate(-1)

  if (movieDetails === null) {
    return (
      <div>
        <button onClick={handleGoBack}>go back</button>
        <p>information is not available for this movie</p>
      </div>
    )
  }

  const {
    imdb_id,
    id,
    original_title = '',
    primary_title = '',
    genres = [],
    plot = '',
    is_adult = false,
    runtime_minutes = 0,
    start_year = '',
    end_year = '',
    type = '',
    postersUse = [],
    directorsAddedUse = [],
  } = movieDetails || {}

  const posterUrl     = postersUse !== null && postersUse.length > 0 ? postersUse[0]?.url : ''
  const manyDirectors = directorsAddedUse !== null && directorsAddedUse.length > 1

  const movieInfoForList = {
    movieId: id,
    imdb_id,
    original_title,
    primary_title
  }

  return (
    <Paper sx={{ padding: 2, margin: 2 }}>
      <>
        <button onClick={handleGoBack}>go back</button>
        <ButtonAddMovieToList movieInfo={movieInfoForList} />
      </>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {postersUse &&
          <img
            src={posterUrl}
            alt={primary_title}
            style={{ width: '100%', maxWidth: '300px', borderRadius: 4 }}
          />
        }

        <Typography variant="h4" sx={{ marginTop: 2 }}>
          {primary_title}
        </Typography>

        {original_title &&
          <Typography variant="subtitle1" sx={{ fontStyle: 'italic' }}>
            {original_title}
          </Typography>
        }

        <Typography variant="body1">
          {plot}
        </Typography>

        <TableContainer component={Paper} sx={{ marginTop: 2, width: '100%' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Category</TableCell>
                <TableCell>Details</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Genres</TableCell>
                <TableCell>{genres && genres.join(', ')}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Type</TableCell>
                <TableCell>{type}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>{end_year ? <span>Start Year</span> : <span>Release year</span>}</TableCell>
                <TableCell>{start_year}</TableCell>
              </TableRow>

              {end_year &&
                <TableRow>
                  <TableCell>End Year</TableCell>
                  <TableCell>{end_year}</TableCell>
                </TableRow>
              }
              <TableRow>
                <TableCell>Runtime</TableCell>
                <TableCell>{runtime_minutes} minutes</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Director{manyDirectors && <span>s</span>}</TableCell>
                <TableCell>{directorsAddedUse ? directorsAddedUse.map(p => (
                  <div key={p.nameId}>{p.display_name}</div>))
                  : <span>No data</span>
                }
                </TableCell>
              </TableRow>

              {is_adult !== null &&
                <TableRow>
                  <TableCell>Adult</TableCell>
                  <TableCell>{is_adult === true ? 'Yes' : 'No'}</TableCell>
                </TableRow>
              }


            </TableBody>
          </Table>
        </TableContainer>


      </Box>

    </Paper>
  )
}

export default MovieInfoContainer


/*
{
  "data": {
    "findMoviesImdbByImdb": {
      "imdb_id": "tt3722118",
      "original_title": null,
      "primary_title": "God the Father",
      "genres": [
        "Documentary"
      ],
      "plot": "Michael Franzese, the son of John \"Sonny\" Franzese, an underboss of the Colombo crime family, recounts his spiritual transformation.",
      "is_adult": false,
      "runtime_minutes": 101,
      "start_year": 2014,
      "end_year": null,
      "type": "movie",
      "postersUse": [
        {
          "url": "https://m.media-amazon.com/images/M/MV5BMTkzODYzNjYyNl5BMl5BanBnXkFtZTgwNjM0NjA5MjE@._V1_.jpg"
        }
      ],
      "directorsAddedUse": [
        {
          "display_name": "Simon Fellows",
          "movies": [
            "668d392e2680d7a8ae27cc4f",
            "6691e67461b783d845b32d3a",
            "6691e6a261b783d845b32d4c",
            "6691e6bd61b783d845b32d61"
          ],
          "moviesImdb": [
            "tt3722118",
            "tt3722114",
            "tt3722115",
            "tt3722116"
          ],
          "nameId": "nm1415540"
        }
      ]
    }
  }
}

*/
