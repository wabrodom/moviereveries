import { createContext, useContext, useState } from 'react'

const ListInfoContext = createContext()

// eslint-disable-next-line react-refresh/only-export-components
export const useListInfo = () => useContext(ListInfoContext)

export const ListInfoContextProvider = ({ children }) => {
  const initialState = [
    {
      name: 'listName',
      value: ''
    },
    {
      name: 'description',
      value: ''
    }
  ]

  const [listInfo, setListInfo] = useState(initialState)

  return (
    <ListInfoContext.Provider value={{ listInfo, setListInfo }}>
      {children}
    </ListInfoContext.Provider>
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