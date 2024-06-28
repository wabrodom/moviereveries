import { createContext, useContext, useState } from 'react'

const SearchMovieToAddContext = createContext()

export const useSearchMovieToAdd = () => useContext(SearchMovieToAddContext)

export const SearchMovieToAddContextProvider = ({ children }) => {
  const initialState = {
    title: '',
    type: '', 
    year: ''
  }
  const [searchQuery, setSearchQuery] = useState(initialState)
  const [searchResults, setSearchResults] = useState([]);

  return (
    <SearchMovieToAddContext.Provider value={{ searchQuery, setSearchQuery, searchResults, setSearchResults }}>
      {children}
    </SearchMovieToAddContext.Provider>
  )
}
