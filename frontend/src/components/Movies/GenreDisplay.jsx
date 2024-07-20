import { ALL_GENRES } from '../../graphql/queries'
import { useQuery } from '@apollo/client'


const GenreDisplay = ( { setGenre, refetch } ) => {
  const result = useQuery(ALL_GENRES)

  if (result.loading) {
    return <div>loading...</div>
  }

  const genres = result.data.allGenres

  const selectGenre = (event) => {
    setGenre(event.target.value)
    result.refetch()
  }
  const clearGenre = () => {
    setGenre(null)
    refetch()
  }
  const colorSalmon = { backgroundColor: 'salmon' }

  return (
    <div>
      Genres
      {genres.map(genre =>
        <button onClick={selectGenre} value={genre.genre} key={genre.id}>
          {genre.genre}
        </button>
      )}
      <button onClick={clearGenre} style={colorSalmon}>clear filter</button>
    </div>
  )

}

export default GenreDisplay