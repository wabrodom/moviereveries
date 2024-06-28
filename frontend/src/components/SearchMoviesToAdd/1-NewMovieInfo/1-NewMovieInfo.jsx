import { useQuery } from '@apollo/client'
import { NEW_MOVIE_DETAILS } from '../../../queries'
import { useParams } from 'react-router-dom'
import NewMovieInfoContainer from './2-NewMovieInfoContainer'
 
const NewMovieToAdd = () => {
  const imdbid = useParams().imdbid

  const { loading, data, error} = useQuery(NEW_MOVIE_DETAILS, {
    variables: { titleId: imdbid }
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
          NetworkError when attempting to fetch resource. 
          Please try again later.
        </p>
      </div>
    )
  }

  const newMovieDetails = data.title


  return (
    <div>
      <NewMovieInfoContainer movieDetails={newMovieDetails} />
    </div>
  )
}

export default NewMovieToAdd

