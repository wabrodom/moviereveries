const FoundMoviesContainer = ({ foundMoviesFiltered }) => {
  if (foundMoviesFiltered.length === 0 ) {
    return (
      <p>movie title not found</p>    
    )
  }

  const allDirectorsName = (arr) => {
    const names = arr.map(obj => obj.display_name)
    return names.join('')
  }
  
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <th>Title</th>
            <th>director</th>
            <th>released</th> 
          </tr>
          {foundMoviesFiltered.map((movie) => (
            <tr key={movie.imdb_id}>
              <td>{movie.primary_title}</td>
              <td>{allDirectorsName(movie.directorsAddedUse)}</td>
              <td>{movie.start_year}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div> 
  )
}

export default FoundMoviesContainer