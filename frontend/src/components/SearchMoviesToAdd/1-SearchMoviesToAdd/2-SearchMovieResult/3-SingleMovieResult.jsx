import React from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Link } from 'react-router-dom'

/* 
  [
    {
      Title: "Inside Out",
      Year: "2015",
      imdbID: "tt2096673",
      Type: "movie",
      Poster: "http://..."
    },
  ]
*/

const SingleMovieResult = ({ movie }) => {
  const theme = useTheme();
  const matchesXs = useMediaQuery(theme.breakpoints.down('xs'));
  const matchesSm = useMediaQuery(theme.breakpoints.down('sm'));
  const matchesMd = useMediaQuery(theme.breakpoints.down('md'));

  const noPoster = movie.Poster === "N/A"
  const isMovie = movie.Type === "movie"
  const movieTypeStyle = { "fontStyle": "italic" }
  return  (
    <Paper
      elevation={3}
      sx={{
        display: 'flex',
        flexDirection: matchesMd ? 'column' : 'row',
        padding: 2,
        margin: 2,
        maxWidth: '100%',
        width: matchesXs ? '100%' : matchesSm ? '70%' : matchesMd ? '60%' : '50%',
        boxShadow: '0 3 5 rgba(0,0,0,0.2)',
      }}
    >
      {!noPoster && 
        <Box
          component="img"
          src={movie.Poster}
          alt={movie.Title}
          sx={{
            width: matchesMd ? '100%' : '40%',
            height: 'auto',
            marginBottom: matchesMd ? 2 : 0,
          }}
        />
      }
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          paddingLeft: matchesMd ? 0 : 2,
          textAlign: matchesMd ? 'center' : 'left',
        }}
      >
        <Typography variant="h6" component="h2">
          {movie.Title} 
          {!isMovie && <span style={movieTypeStyle}> ({movie.Type})</span>}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Released Year: {movie.Year}
        </Typography>
        <Typography component={Link} to={`/movie-outer-api/${movie.imdbID}`} >
          more detail
        </Typography>
      </Box>
    </Paper>
  )
}

export default SingleMovieResult