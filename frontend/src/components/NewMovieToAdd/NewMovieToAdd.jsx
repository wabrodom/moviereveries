import { useQuery } from '@apollo/client'
import { NEW_MOVIE_DETAILS } from '../../queries'
import { useParams } from 'react-router-dom'
import NewMovieInfo from './NewMovieInfo'
 
const NewMovieToAdd = () => {
  const imdbid = useParams().imdbid

  const { loading, data, error} = useQuery(NEW_MOVIE_DETAILS, {
    variables: { titleId: imdbid }
  })

  if (loading) return null;
  if (error) {
    console.log(error)
  }

  const newMovieDetails = data.title


  return (
    <div>
      <NewMovieInfo movieDetails={newMovieDetails} />
    </div>
  )
}

export default NewMovieToAdd

