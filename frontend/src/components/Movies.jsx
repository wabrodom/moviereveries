import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_MOVIES } from '../graphql/queries'
import GenreDisplay from './GenreDisplay'


const Movies = () => {
  const [genre, setGenre] = useState(null)

  const resultFilter = useQuery(ALL_MOVIES, {
    variables: { genre }, 
  })

  if (resultFilter.loading) {
    return <div>loading...</div>
  }

  const allMoviesFiltered = resultFilter.data.allMoviesImdb

  const triggerRefetch = () =>  resultFilter.refetch()

  console.log("Movies rendered")


  return (
    <div>
      <h2>movies</h2>
      <GenreDisplay setGenre={setGenre} refetch={triggerRefetch} />
      <table>
        <tbody>
          <tr>
            <th>Title</th>
            <th>director</th>
            <th>released</th> 
          </tr>
          {allMoviesFiltered.map((movie) => (
            <tr key={movie.imdb_id}>
              <td>{movie.primary_title}</td>
              <td>{movie.directorsAddedUse.display_name}</td>
              <td>{movie.start_year}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Movies