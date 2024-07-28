import ButtonSelfCenter from '../Common/ButtonSelfCenter'
import { useAddMovieList } from '../../contexts/AddMovieListContext'
import useNotification from '../../contexts/NotificationContext/useNotification'
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
  const { notify } = useNotification()

  const handleClick = () => {
    const persistList = [...movieList]
    const persistListId = persistList.map(e => e.movieId)
    const { movieId } = movieInfo

    if (persistListId.indexOf(movieId) === -1) {
      persistList.push({ ...movieInfo, impression: '' })
      // console.log('push obj to context', movieList)
      setMovieList(persistList)
      notify('success', `added "${movieInfo.primary_title}" to cache list`)
    } else {
      notify('info', `already added "${movieInfo.primary_title}" to the cache`)
    }
  }


  return (
    <ButtonSelfCenter onClick={handleClick}>
        Add to List
    </ButtonSelfCenter>
  )
}

export default ButtonAddMovieToList