import { useQuery } from '@apollo/client'
import { FIND_DIRECTOR_MOVIES } from '../queries'
import { useParams } from 'react-router-dom'

const DirectorMovies = () => {
  const directorId = useParams().id

  const allDirectorMovies = useQuery(FIND_DIRECTOR_MOVIES, {
    variables: { "directorId" : directorId }
  })

  if (allDirectorMovies.loading) {
    return <div>loading...</div>
  }
  const directorMovies = allDirectorMovies.data.findMoviesByDirectorId
  const directorName = directorMovies[0].director.name

  return (
    <div>
      <h2>
        {directorName} works
      </h2>

      <table>
        <tbody>
          <tr>
            <th>Title</th>
            <th>released</th> 
          </tr>
          {directorMovies.map((movie) => (
            <tr key={movie.id}>
              <td>{movie.title}</td>
              <td>{movie.released}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default DirectorMovies