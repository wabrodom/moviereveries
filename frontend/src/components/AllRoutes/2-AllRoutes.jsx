import {
  Routes, Route,
  Navigate,
} from 'react-router-dom'

import LogIn from '../LogIn/LogIn'
import SignUp from '../SignUp/SignUp'
import Directors from '../Directors/Directors'
import DirectorMovies from '../Directors/DirectorMovies'
import Recommended from '../User/Recommended'

import SearchMoviesToAddMain from '../SearchMoviesToAdd/0-SearchMoviesToAddMain'
import MovieInfo from '../MovieInfo/MovieInfo'
import AddMovieList from '../AddMovieList/AddMovieList'

import MovieListDisplay from '../MovieListDisplay/0-MovieListDisplay'

import Account from '../User/Account'
import { useToken } from '../../contexts/TokenContext'
import SingleMovieList from '../MovieListDisplay/SingleMovieList/SingleMovieList'
import MoviesFindPlusGenre from '../Movies/MoviesFindPlusGenre'



const AllRoutes = () => {
  const { token, setToken, tokenReady } = useToken()

  // console.log('-- Allroute rendered when token change' , token)

  if (tokenReady === false ) {
    return <div>Loading...</div>
  }

  return (
    <Routes>
      <Route path='/' element={<MoviesFindPlusGenre />} />

      <Route path='/movie-outer-api/*' element={<SearchMoviesToAddMain hasToken={token !== null} /> } />

      <Route path='/movies/:imdbid' element={<MovieInfo /> } />

      <Route path='/directors/:id' element={<DirectorMovies />} />

      <Route path='/addlist'
        element={token ? <AddMovieList /> : <Navigate replace to ='/login'/>}
      />

      <Route path='/movielist' element={<MovieListDisplay />} />
      <Route path='/movielist/:id' element={<SingleMovieList />} />

      <Route path='/account'
        element={token ? <Account /> : <Navigate replace to ='/login'/>}
      />


      <Route path='/recommended'
        element={token ? <Recommended/> : <Navigate replace to ='/login'/>}
      />

      <Route path='/directors'
        element={token ? <Directors /> :  <Navigate replace to ='/login'/>} />

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
  )
}

export default AllRoutes


/*
  element that  use setToken = [ LogIn, SignUp ]
  element that consume token = [ResponsiveDrawer, AllRoutes ]
*/

/*
import { VALIDATE_TOKEN } from './graphql/queries'
    const validateToken = async (token) => {
    try {
      const { data } = await client.query({
        query: VALIDATE_TOKEN,
        variables: { token },
      })

      return data.validateToken
    } catch (error) {
      // console.log(error)
      // console.log(error.graphQLErrors[0].message)
      return null
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('moviereveries-user-token')
    const checkToken = async () => {
      if (token === null) {
        navigate('/login', { replace: true })
        return
      }
      const currentUser = await validateToken(token)
      if (currentUser === null) {
        setToken(null)
        localStorage.removeItem('moviereveries-user-token')
        navigate('/login', { replace: true })
      }
    }
    checkToken()

  } ,[])


*/