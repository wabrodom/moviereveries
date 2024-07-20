import { useState } from 'react'
import {
  Routes, Route,
  Navigate
} from 'react-router-dom'

import { useApolloClient } from '@apollo/client'

import HeadPart from './components/HeadPart/HeadPart'
import LogIn from './components/LogIn/LogIn'
import SignUp from './components/SignUp/SignUp'
import Directors from './components/Directors/Directors'
import Movies from './components/Movies/Movies'
import DirectorMovies from './components/Directors/DirectorMovies'
import Recommended from './components/User/Recommended'
import FindMovies from './components/FindMovies/FindMovies'

import SearchMoviesToAddMain from './components/SearchMoviesToAdd/0-SearchMoviesToAddMain'
import MovieInfo from './components/MovieInfo/MovieInfo'
import AddMovieList from './components/AddMovieList/AddMovieList'

import MovieListDisplay from './components/MovieListDisplay/MovieListDisplay'
import Notification from './components/Common/Notification'

import useNotification from './contexts/NotificationContext/useNotification'

const AllRoutes = () => {
  const [token, setToken] = useState(null)
  const { notification } = useNotification()
  const client = useApolloClient()

  const logOut = () => {
    setToken(null)
    localStorage.removeItem('moviereveries-user-token')
    client.resetStore()
  }
  return (
    <div>
      <HeadPart logOut={ logOut } token={ token } />

      <Routes>
        <Route path='/' element={<Movies/>} />

        <Route path='/find' element={<FindMovies/>} />

        <Route path='/movie-outer-api/*' element={<SearchMoviesToAddMain hasToken={token !== null} /> } />

        <Route path='/movies/:imdbid' element={<MovieInfo /> } />

        <Route path='/directors' element={<Directors />} />

        <Route path='/directors/:id' element={<DirectorMovies />} />

        <Route path='/addlist' element={<AddMovieList />} />

        <Route path='/movielist' element={<MovieListDisplay />} />


        <Route path='/recommended'
          element={token ? <Recommended/> : <Navigate replace to ='/login'/>}
        />

        <Route path='/login'
          element={token ? <Navigate replace to ='/' /> : <LogIn setToken={setToken} /> }
        />

        <Route path='/signup'
          element={token ? <Navigate replace to ='/' /> : <SignUp setToken={setToken} /> }
        />

        <Route path='/logout'
          element={<Navigate replace to ='/login' /> }
        />


      </Routes>
      <Notification severity={notification.severity} text={notification.text} />
    </div>
  )
}

export default AllRoutes