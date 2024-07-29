import { useState } from 'react'
import {
  Routes, Route,
  Navigate, useNavigate
} from 'react-router-dom'

import { useApolloClient } from '@apollo/client'

import ResponsiveDrawer from './components/HeadPart/ResponsiveDrawer/0-ResponsiveDrawer'
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

import MovieListDisplay from './components/MovieListDisplay/0-MovieListDisplay'
import Notification from './components/Common/Notification'

import useNotification from './contexts/NotificationContext/useNotification'
import Account from './components/User/Account'
import GoTopButton from './components/Common/GoToTopButton'
import { useAddMovieList } from './contexts/AddMovieListContext'
import { useListInfo } from './contexts/ListInfoContext'


const AllRoutes = () => {
  const [token, setToken] = useState(null)
  const { notify, notification } = useNotification()
  const client = useApolloClient()
  const navigate = useNavigate()
  const { clearMovieLists } = useAddMovieList()
  const { clearListIfo } = useListInfo()

  /*  important to clear everything */
  const logOut =  () => {
    setToken(null)
    localStorage.removeItem('moviereveries-user-token')
    clearMovieLists()
    clearListIfo()
    try {
      // if use client.resetStore, async method. wrap it in try-catch
      client.clearStore()
      navigate('/login', { replace: true })
    } catch (error) {
      notify('error', 'log out error')
      // console.error('Error during logout:', error)
    }
  }
  return (
    <div>
      <ResponsiveDrawer logOut={ logOut } token={ token }>
        <GoTopButton />

        {/* <HeadPart logOut={ logOut } token={ token } /> */}
        <Notification severity={notification.severity} text={notification.text} />

        <Routes>
          <Route path='/' element={<Movies/>} />

          <Route path='/find' element={<FindMovies/>} />

          <Route path='/movie-outer-api/*' element={<SearchMoviesToAddMain hasToken={token !== null} /> } />

          <Route path='/movies/:imdbid' element={<MovieInfo /> } />

          <Route path='/directors' element={<Directors />} />

          <Route path='/directors/:id' element={<DirectorMovies />} />

          <Route path='/addlist'
            element={token ? <AddMovieList /> : <Navigate replace to ='/login'/>}
          />

          <Route path='/movielist' element={<MovieListDisplay />} />

          <Route path='/account'
            element={token ? <Account /> : <Navigate replace to ='/login'/>}
          />


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

          <Route path='*' element={<Navigate replace to ='/' />} />

        </Routes>

      </ResponsiveDrawer>
    </div>
  )
}

export default AllRoutes