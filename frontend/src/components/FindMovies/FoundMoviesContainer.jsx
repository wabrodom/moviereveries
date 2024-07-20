import MoviesTable from '../Common/MoviesTable'

const FoundMoviesContainer = ({ foundMoviesFiltered }) => {
  if (foundMoviesFiltered.length === 0 ) {
    return (
      <p>movie title not found</p>
    )
  }

  return (
    <div>
      <MoviesTable movies={foundMoviesFiltered}/>
    </div>
  )
}

export default FoundMoviesContainer