const FoundMoviesContainer = ({ foundMoviesFiltered }) => {
  if (foundMoviesFiltered.length === 0 ) {
    return (
      <p>movie title not found</p>    
    )
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
            <tr key={movie.id}>
              <td>{movie.title}</td>
              <td>{movie.director.name}</td>
              <td>{movie.released}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div> 
  )
}

export default FoundMoviesContainer