import { useQuery } from '@apollo/client'
import { ALL_MOVIES_LIST } from '../../graphql/queries'
import MovieListDisplayContainer from './1-MovieListDisplayContainer'

const MovieListDisplay = () => {
  const { loading, data, error } = useQuery(ALL_MOVIES_LIST)

  if (loading) {
    return (
      <p>
        loading details...
      </p>
    )
  }

  if (error) {
    return (
      <div>
        <p>
          {error.message}
        </p>
        <p>
          NetworkError: failed to fetch movie list from db.
          Please try again later.
        </p>
      </div>
    )
  }
  const allMovieLists = data.allMovieLists

  return (
    <div>
      <MovieListDisplayContainer allMovieLists={allMovieLists} />
    </div>
  )
}


export default MovieListDisplay
