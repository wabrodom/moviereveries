import SingleMovie from "./SingleMovie"

const SearchResult = ({ fetchMovies, searchTitle }) => {
  const resultLength = fetchMovies.length
  return  (
    <div>

      <h3>
        "{searchTitle}" found {resultLength} movie{resultLength > 0 && <span>s</span>}
      </h3>

      <div>
        {fetchMovies.map(movie => {
          return (
            <SingleMovie movie={movie} key={movie.imdbID} />
          )
        })}
      </div>

    </div>
  )
}

export default SearchResult