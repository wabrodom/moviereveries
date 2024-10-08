import { createContext, useContext, useState, useEffect } from 'react'

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

  const [listInfo, setListInfo] = useState(() => {
    const savedListInfo = sessionStorage.getItem('listInfo')
    return savedListInfo ? JSON.parse(savedListInfo) : initialState
  })
  const clearListIfo = () => setListInfo(initialState)


  useEffect(() => {
    sessionStorage.setItem('listInfo', JSON.stringify(listInfo))
  }, [listInfo])


  return (
    <ListInfoContext.Provider value={{ listInfo, setListInfo, clearListIfo }}>
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