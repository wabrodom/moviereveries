import { useQuery } from '@apollo/client'
import { FIND_MOVIES } from '../../queries'
import FoundMoviesContainer from './FoundMoviesContainer';

const FoundMovies = ( { text } ) => {
  const searchFiltered = useQuery(FIND_MOVIES, {
    variables: { text }, 
  })

  if (searchFiltered.loading) {
    return <div>loading...</div>
  }

  const foundMoviesFiltered = searchFiltered.data.findMovies

  return (
    <FoundMoviesContainer foundMoviesFiltered={foundMoviesFiltered} />
  )
}

export default FoundMovies