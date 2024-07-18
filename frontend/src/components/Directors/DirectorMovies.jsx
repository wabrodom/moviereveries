import { useQuery } from '@apollo/client'
import { useNavigate} from 'react-router-dom'
import { FIND_DIRECTOR_MOVIES } from '../../graphql/queries'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

const DirectorMovies = () => {
  const directorId = useParams().id
  const navigate = useNavigate()

  const allDirectorMovies = useQuery(FIND_DIRECTOR_MOVIES, {
    variables: { "directorId" : directorId }
  })

  if (allDirectorMovies.loading) {
    return <div>loading...</div>
  }
  const directorMovies = allDirectorMovies.data.findMoviesImdbByDirectorId
  const directorName = directorMovies[0].directorsAddedUse.display_name

  const handleGoBack = () => {
    navigate("..", { relative: "path" })
  }

  return (
    <div>
      <div>
        <h2>
          {directorName} works
        </h2>

        <button onClick={handleGoBack}>go back</button>
      </div>
      <table>
        <tbody>
          <tr>
            <th>Title</th>
            <th>released</th> 
            <th>work type</th> 
            <th>genres</th> 
            <th>plot</th> 
          </tr>
          {directorMovies.map((movie) => (
            <tr key={movie.imdb_id}>
              <td>
                <Link to={`/movies/${movie.imdb_id}`}>
                  {movie.primary_title}
                </Link>
              </td>
              <td>{movie.start_year}</td>
              <td>{movie.type}</td>
              <td>{movie.genres.join(', ')}</td>
              <td>{movie.plot}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default DirectorMovies