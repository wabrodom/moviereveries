import { createContext, useContext, useState, useEffect } from 'react'

const AddMovieListContext = createContext()

// eslint-disable-next-line react-refresh/only-export-components
export const useAddMovieList = () => useContext(AddMovieListContext)

export const AddMovieListContextProvider = ({ children }) => {
  const [movieList, setMovieList] = useState(() => {
    const savedMovieList = sessionStorage.getItem('movieList')
    return savedMovieList ? JSON.parse(savedMovieList) : []
  })
  const clearMovieLists = () => setMovieList([])

  useEffect(() => {
    sessionStorage.setItem('movieList', JSON.stringify(movieList))
  },[movieList] )

  return (
    <AddMovieListContext.Provider value={{ movieList, setMovieList, clearMovieLists }}>
      {children}
    </AddMovieListContext.Provider>
  )
}


/*
  array of obj movie
    const initialState = [
    {
      'movieId': '',
      'impression': '',
      'imdb_id': '',
      'original_title': '',
      'primary_title': '',
    }
  ]

  "list": [
    {
      "movieId": "668d392e2680d7a8ae27cc4f",
      "impression": "good starting point",
      "imdb_id": "12312345",
      "original_title": "jokobo",
      "primary_title": "jokobo",
    }
  ]
*/