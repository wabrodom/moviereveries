import { useQuery } from '@apollo/client'
import { FIND_MOVIE_BY_IMDB } from '../../graphql/queries' 
import { useParams } from 'react-router-dom'
import MovieInfoContainer from './MovieInfoContainer'
 
const MovieInfo = () => {
  const imdbid = useParams().imdbid
  
  const { loading, data, error} = useQuery(FIND_MOVIE_BY_IMDB, {
    variables: { imdbId: imdbid }
  })

  if (loading) {
    return (
      <p>
        loading details...
      </p>
    )
  } ;
  if (error) {
    return (
      <div>
        <p>
          {error.message}
        </p>
        <p>
          NetworkError: failed to fetch movie from db. 
          Please try again later.
        </p>
      </div>
    )
  }

  const movieDetails = data.findMoviesImdbByImdb

  return (
    <div>
      <MovieInfoContainer 
        movieDetails={movieDetails} 
      />
    </div>
  )
}

export default MovieInfo

