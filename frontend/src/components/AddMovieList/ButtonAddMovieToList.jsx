import { useAddMovieList } from "../../contexts/AddMovieListContext"

/* 
  movieInfo ={
    movieId: id,
    imdb_id,
    original_title,
    primary_title
  }
*/

const ButtonAddMovieToList = ({ movieInfo }) => {
  const { movieList, setMovieList } = useAddMovieList()
  
  const handleClick = () => {
    const persistList = [...movieList]
    const persistListId = persistList.map(e => e.movieId)
    const { movieId } = movieInfo

    if (persistListId.indexOf(movieId) === -1) {
      persistList.push({...movieInfo, impression: '' })
      console.log('push new, does it changed', movieList)
      setMovieList(persistList)
    }
  }


  return (
    <button onClick={handleClick}>
        Add to List
    </button>
  )
}

export default ButtonAddMovieToList