import { useState } from 'react'
import FoundMoviesPlusGenre from '../FindMovies/FoundMoviesPlusGenre'
import GenreDisplayV2 from './GenreDisplayV2'


const MoviesFindPlusGenre = () => {
  const [genres, setGenres] = useState(null) //array of string, cant be empty array
  const [text, setText] = useState('')

  const handleSearch = (event) => setText(event.target.value)
  const boxStyle = {
    padding: '1em 0'
  }
  return (
    <div>
      <h2>Movies In Database</h2>

      <div style={boxStyle}>
        Title to search: <input
          type="text"
          value={text}
          onChange={handleSearch}
        />
      </div>

      <GenreDisplayV2
        setGenres={setGenres} genres={genres}
      />

      <FoundMoviesPlusGenre text={text} genres={genres} />

    </div>
  )
}

export default MoviesFindPlusGenre