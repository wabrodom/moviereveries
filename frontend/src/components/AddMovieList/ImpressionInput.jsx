import { useState, useEffect } from 'react'
import { useAddMovieList } from '../../contexts/AddMovieListContext'
/*
  allImpressions = [
    {
      "movieId": "",
      "impression": "",
    },
  ]
*/
const ImpressionInput = ({ movieId, trigger, movieTitle }) => {
  const { movieList, setMovieList } = useAddMovieList()
  const currentMovieImpression = movieList.find(obj => obj.movieId === movieId).impression
  const [impression, setImpression] = useState(currentMovieImpression)


  useEffect(() => {
    const modifyMovieList = movieList.map(obj => {
      if (obj.movieId === movieId) {
        obj.impression = impression
        return obj
      }
      return obj
    })

    setMovieList(modifyMovieList)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger])

  // console.log('ImpressionInput render', movieList)

  return (

    <input
      type="text"
      aria-label={movieTitle}
      value={impression}
      onChange={(e) => setImpression(e.target.value) }
    />

  )
}

export default ImpressionInput