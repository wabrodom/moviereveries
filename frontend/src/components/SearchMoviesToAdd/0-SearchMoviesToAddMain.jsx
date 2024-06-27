import { Routes, Route } from 'react-router-dom'

import { SearchMovieToAddContextProvider } from '../../contexts/SearchMovieToAddContext'
import SearchMovies from './1-SearchMoviesToAdd/1-SearchMovies'
import NewMovieInfo from './1-NewMovieInfo/1-NewMovieInfo'
import { useLocation } from 'react-router-dom';



const SearchMoviesToAddMain = () => {
  const location = useLocation()
  console.log(location)

  return (
    <SearchMovieToAddContextProvider>
      <Routes>

        <Route path='/' element={<SearchMovies />} />

        <Route path='/:imdbid' element={<NewMovieInfo />} />

      </Routes>
    </SearchMovieToAddContextProvider>
  )
}

export default SearchMoviesToAddMain