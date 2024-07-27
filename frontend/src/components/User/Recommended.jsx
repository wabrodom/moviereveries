import { useState } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import { ALL_MOVIES, CURRENT_USER } from '../../graphql/queries'
import MovieWithPlot from '../Common/MovieWithPlot'

const Recommended = () => {
  const [currentUser, setCurrentUser] = useState(null)
  const [filteredMovies, setFilteredMovies] = useState(null)

  useQuery(CURRENT_USER, {
    onCompleted: (data) => {
      setCurrentUser(data.me)
      getFilterMovies({ variables: { genre: data.me.favoriteGenre } })
    }
  })

  const [getFilterMovies, resultFilterMovies] = useLazyQuery(ALL_MOVIES, {
    onCompleted: (data) => setFilteredMovies(data.allMoviesImdb)
  })

  if (resultFilterMovies.loading || !currentUser || !filteredMovies) {
    return null
  }

  resultFilterMovies.refetch()

  return (
    <div>
      <h2>Recommendations</h2>
      <p>movies in your favorite genre: <strong>{currentUser.favoriteGenre}</strong> </p>
      <MovieWithPlot movies={filteredMovies}/>

    </div>
  )
}

export default Recommended


/*
   <table>
        <tbody>
          <tr>
            <th></th>
            <th>director</th>
            <th>published</th>
          </tr>
          {filteredMovies.map(movie => {
            return (
              <tr key={movie.imdb_id}>
                <td>
                  <Link to={`/movies/${movie.imdb_id}`}>
                    {movie.primary_title}
                  </Link>
                </td>
                <td>{allDirectorsName(movie.directorsAddedUse)}</td>
                <td>{movie.start_year}</td>
              </tr>
            )
          })}



        </tbody>
      </table>


*/