import { useState, useEffect } from "react";
import { useAddMovieList } from "../../contexts/AddMovieListContext"
/*
  allImpressions = [
    {
      "movieId": "",
      "impression": "",
    },
  ]
*/
const ImpressionInput = ({ movieId, trigger }) => {
  const [impression, setImpression] = useState('')
  const { movieList, setMovieList } = useAddMovieList()
  
  
  useEffect(()=> {
    const modifyMovieList = movieList.map(obj => {
      if (obj.movieId === movieId) {
        obj.impression = impression
        return obj
      }
      return obj
    })
    
    setMovieList(modifyMovieList)
  }, [trigger])
  
  // console.log('ImpressionInput render', movieList)

  return (
   
       <input 
          type="text" 
          onChange={(e) => setImpression(e.target.value) }
        />
 
  )
}

export default ImpressionInput