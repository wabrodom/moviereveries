import { ALL_GENRES } from '../../graphql/queries'
import { useQuery } from '@apollo/client'

const GenreDisplayV2 = ( { setGenres, genres } ) => {
  const result = useQuery(ALL_GENRES)

  if (result.loading) {
    return <div>loading...</div>
  }

  const genresList = result.data.allGenres

  const selectGenre = (event) => {
    const currentValue = event.target.value
    if (genres === null) {
      setGenres([currentValue])
    } else {
      if (genres.indexOf(currentValue) > -1) {
        const filtered = genres.filter(g => g !== currentValue)
        if (filtered.length === 0)
          setGenres(null)
        else
          setGenres(filtered)
      } else {
        setGenres(genres.concat(currentValue))
      }
    }
  }

  const clearGenre = () => {
    setGenres(null)
    result.refetch()
  }


  const genreButton = (currentGenre) => ({
    ...buttonStyle,
    backgroundColor: genres === null
      ? ''
      : genres.includes(currentGenre)
        ? 'lightgreen'
        : '',
    border: genres === null
      ? '1px solid grey'
      : genres.includes(currentGenre)
        ? '1px solid green'
        : '1px solid grey'
  })

  return (
    <div>
      Genres:
      {genresList.map(genre =>
        <button onClick={selectGenre} value={genre.genre} key={genre.id} style={genreButton(genre.genre)}>
          {genre.genre}
        </button>
      )}
      <button onClick={clearGenre} style={clearButton}>clear filter</button>
    </div>
  )

}

export default GenreDisplayV2

const buttonStyle = {
  margin: '0.25em',
  padding: '0.25em 0.5em',
  borderRadius: '10% / 50%' ,
}

const clearButton = {
  ...buttonStyle,
  backgroundColor: '#cccccc',
}