import { 
  Routes, Route, Link,
  Navigate
} from 'react-router-dom'
import { useState } from 'react'
import LogIn from './components/LogIn/LogIn'
import SignUp from './components/SignUp/SignUp'
import Directors from './components/Directors'
import Movies from './components/Movies'
import NewMovie from './components/NewMovie'
import Notification from './components/Notification'
import DirectorMovies from './components/DirectorMovies'

import { useQuery, useApolloClient, useSubscription } from '@apollo/client'
import { ALL_MOVIES, MOVIE_ADDED } from './queries';
import Recommended from './components/Recommended';
import HeadPart from './components/HeadPart'
import FindMovies from './components/FindMovies/FindMovies';

import SearchMoviesToAddMain from './components/SearchMoviesToAdd/0-SearchMoviesToAddMain';
import { SearchMovieToAddContextProvider } from './contexts/SearchMovieToAddContext'

const App = () => {
  const [errorMessage , setErrorMessage] = useState(null)
  const [token, setToken] = useState(null)

  const client = useApolloClient()

  const result = useQuery(ALL_MOVIES)

  useSubscription(MOVIE_ADDED, {
    onData: ( ({ data, client }) => {
      const addedMovie = data.data.movieAdded
      const title = data.data.movieAdded.title
      const director = data.data.movieAdded.director.name
      window.alert(`'${title}' by ${director} added`)

      client.cache.updateQuery({ query: ALL_MOVIES}, data => {
        return {
          allMovies: data.allMovies.concat(addedMovie)
        }
      })
    })
  })

  const notify  = message => {
    setErrorMessage(message)
    setTimeout(()=> {
      setErrorMessage('')
    }, 5000)
  }

  const logOut = () => {
    setToken(null)
    localStorage.removeItem('moviereveries-user-token')
    client.resetStore()
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  const allMovies = result.data.allMovies

  const directorMap  = (movies) => {
    const map = new Map()
    for (let movie of movies) {
      const currentAuthor = movie.director.name
      const currentCount = map.get(currentAuthor) || 0
      map.set(currentAuthor, currentCount + 1)
    }
    return map
  }
  const getDirectorAndMovieCount =() => {
    const map = directorMap(allMovies)
    const directorsAndMovies = []
    for (let pair of map.entries()) {
      const currentAuthor = { name: pair[0], movieCount: pair[1] }
      directorsAndMovies.push(currentAuthor)
    }
    return directorsAndMovies
  }

  const directorAndMovieCount = getDirectorAndMovieCount()

  return (
      <div>
        <HeadPart logOut={ logOut } token={ token } />
        <SearchMovieToAddContextProvider>

        
        <Routes>
          <Route path='/' element={<Movies/>} />

          <Route path='/find' element={<FindMovies/>} />

          <Route path='/movie/*' element={<SearchMoviesToAddMain hasToken={token !== null} /> } />

          <Route path='/directors' 
            element={<Directors setError={notify} directorAndMovieCount={directorAndMovieCount}/>} 
          />

          <Route path='/directors/:id' element={<DirectorMovies />} />

          <Route path='/add' 
            element={token ? <NewMovie setError={notify}/> : <Navigate replace to ='/login'/>} 
          />

          <Route path='/recommended' 
            element={token ? <Recommended/> : <Navigate replace to ='/login'/>} 
          />

          <Route path='/login' 
            element={token ? <Navigate replace to ='/add'/> : <LogIn setToken={setToken} setError={notify} /> } 
          />

          <Route path='/signup' 
            element={token ? <Navigate replace to ='/add'/> : <SignUp setToken={setToken} setError={notify} /> } 
          />

          <Route path='/logout' 
            element={<Navigate replace to ='/login' /> } 
          />


        </Routes>
        </SearchMovieToAddContextProvider>
        <Notification message={errorMessage}/>
      </div>

  )
}

export default App