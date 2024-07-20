import { Routes, Route } from 'react-router-dom'
import SearchMovies from './1-SearchMoviesToAdd/1-SearchMovies'
import NewMovieInfo from './1-NewMovieInfo/1-NewMovieInfo'
// import { useLocation } from 'react-router-dom';
// import { SearchMovieToAddContextProvider } from '../../contexts/SearchMovieToAddContext'

const SearchMoviesToAddMain = ({ hasToken }) => {

  return (
    <Routes>
      <Route path='/' element={<SearchMovies hasToken={hasToken} />} />
      <Route path='/:imdbid' element={<NewMovieInfo />} />
    </Routes>
  )
}

export default SearchMoviesToAddMain