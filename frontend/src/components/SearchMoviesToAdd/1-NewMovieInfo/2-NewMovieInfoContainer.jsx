import { Paper, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useNavigate} from 'react-router-dom'
import { useSearchMovieToAdd } from '../../../contexts/SearchMovieToAddContext'

const NewMovieInfoContainer = ({ movieDetails }) => {
  const navigate = useNavigate()
  const { searchQuery } = useSearchMovieToAdd()

  const handleGoBack = () => {
    navigate(-1, { state: { remember: searchQuery } })
    navigate("..", { 
      relative: "path" ,
      state: { remember: searchQuery }
    });
  }

  const {
    original_title = '',
    primary_title = '',
    genres = [],
    plot = '',
    is_adult = false,
    rating = 0,
    runtime_minutes = 0,
    spoken_languages = [],
    start_year = '',
    end_year = '',
    type = '',
    posters = [],
    origin_countries = [],
    critic_review = ''
  } = movieDetails || {};

  const posterUrl = posters !== null && posters.length > 0 ? posters[0]?.url : ''

  console.log('in new movie info container')
  return (
    <Paper sx={{ padding: 2, margin: 2 }}>
      <>
        <button onClick={handleGoBack}>go back</button>
      </>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {posters && 
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
                <TableCell>Start Year</TableCell>
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
              {is_adult !== null && 
                <TableRow>
                  <TableCell>Adult</TableCell>
                  <TableCell>{is_adult === true ? 'Yes' : 'No'}</TableCell>
                </TableRow>
              }
              {rating && 
                <TableRow>
                  <TableCell>Rating</TableCell>
                  <TableCell>{rating.aggregate_rating} ({rating.votes_count} votes)</TableCell>
                </TableRow>
              }
              {critic_review && (
                <TableRow>
                  <TableCell>Critic Review</TableCell>
                  <TableCell>{critic_review.score} ({critic_review.review_count} reviews)</TableCell>
                </TableRow>
              )}
              <TableRow>
                <TableCell>Spoken Languages</TableCell>
                <TableCell>{spoken_languages && spoken_languages.map(lang => lang.name).join(', ')}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Origin Countries</TableCell>
                <TableCell>{origin_countries && origin_countries.map(country => country.name).join(', ')}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

   
      </Box>

    </Paper>
  )
}

export default NewMovieInfoContainer


/* 
{
  "data": {
    "title": {
      "id": "tt0944947",
      "original_title": null,
      "primary_title": "Game of Thrones",
      "genres": [
        "Action",
        "Adventure",
        "Drama",
        "Fantasy"
      ],
      "plot": "Nine noble families fight for control over the lands of Westeros, while an ancient enemy returns after being dormant for a millennia.",
      "is_adult": false,
      "rating": {
        "aggregate_rating": 9.2,
        "votes_count": 2255553
      },
      "runtime_minutes": 4189,
      "spoken_languages": [
        {
          "code": "eng",
          "name": "English"
        }
      ],
      "start_year": 2011,
      "end_year": 2019,
      "type": "tvSeries",
      "posters": [
        {
          "url": "https://m.media-amazon.com/images/M/MV5BN2IzYzBiOTQtNGZmMi00NDI5LTgxMzMtN2EzZjA1NjhlOGMxXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_.jpg"
        }
      ],
      "origin_countries": [
        {
          "code": "GB",
          "name": "United Kingdom"
        },
        {
          "code": "US",
          "name": "United States"
        }
      ],
      "critic_review": null
    }
  }
}

*/


/* 
      <Typography variant="body2">
        {`Genres: ${genres.join(', ')}`}
      </Typography>

      <Typography variant="body2">
        {`Type: ${type}`}
      </Typography>

      <Typography variant="body2">
        {`Start Year: ${start_year}`}
      </Typography>
        {end_year && <Typography variant="body2">{`End Year: ${end_year}`}
      </Typography>}

      <Typography variant="body2">
        {`Runtime: ${runtime_minutes} minutes`}
      </Typography>

      <Typography variant="body2">
        {`Adult: ${is_adult ? 'Yes' : 'No'}`}
      </Typography>

      <Typography variant="body2">
        {`Rating: ${rating.aggregate_rating} (${rating.votes_count} votes)`}
      </Typography>

      {critic_review && <Typography variant="body2">{`Critic Review: ${critic_review.score} (${critic_review.review_count} reviews)`}</Typography>}
      <Typography variant="body2">
        {`Spoken Languages: ${spoken_languages.map(lang => lang.name).join(', ')}`}
      </Typography>

      <Typography variant="body2">
        {`Origin Countries: ${origin_countries.map(country => country.name).join(', ')}`}
      </Typography> 
      
*/