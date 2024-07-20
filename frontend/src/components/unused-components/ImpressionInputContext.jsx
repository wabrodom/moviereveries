import { createContext, useContext, useState } from 'react'

const ImpressionInputContext = createContext()

// eslint-disable-next-line react-refresh/only-export-components
export const useImpressionInput = () => useContext(ImpressionInputContext)

export const ImpressionInputContextProvider = ({ children }) => {
  const initialState = [
    {
      'movieId': '',
      'impression': '',
    }
  ]

  const [allImpressions, setAllImpressions] = useState(initialState)

  return (
    <ImpressionInputContext.Provider value={{ allImpressions, setAllImpressions }}>
      {children}
    </ImpressionInputContext.Provider>
  )
}


/*
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