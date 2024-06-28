import SingleMovieResult from "./3-SingleMovieResult"

const SearchResult = ({ movies, searchTitle }) => {
  const resultLength = movies.length
  return  (
    <div>

      <h3>
        "{searchTitle}" found {resultLength} movie{resultLength > 0 && <span>s</span>}
      </h3>

      <div>
        {movies.map(movie => {
          return (
            <SingleMovieResult movie={movie} key={movie.imdbID} />
          )
        })}
      </div>

    </div>
  )
}

export default SearchResult