import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { MOVIE_IMDB_COUNT, GENRE_COUNT } from '../../graphql/queries'
import FoundMoviesPlusGenre from '../FindMovies/FoundMoviesPlusGenre'
import GenreDisplayV2 from './GenreDisplayV2'


const MoviesFindPlusGenre = () => {
  const [genres, setGenres] = useState(null) //array of string, cant be empty array
  const [text, setText] = useState('')
  const { loading: moviesCountLoading, error: moviesCountError, data: moviesCountData } = useQuery(MOVIE_IMDB_COUNT)
  const { loading: genreLoading , error: genreError, data: genreData } = useQuery(GENRE_COUNT)

  if (moviesCountLoading || genreLoading) return 'Loading...'

  if (moviesCountError || genreError) {
    // console.log(`Error! ${moviesCountError.message}`)
    // console.log(`Error! ${genreError.message}`)
  }
  const moviesCount = moviesCountData.movieImdbCount
  const genreCount = genreData.genreCount

  const handleSearch = (event) => setText(event.target.value)
  const boxStyle = {
    padding: '1em 0'
  }

  return (
    <div>
      <h2>{moviesCount} Movies and {genreCount} Genres in the Database</h2>

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