import { 
  Routes, Route, Link,
  Navigate
} from 'react-router-dom'
import { useState } from 'react'
import LogIn from './components/LogIn/LogIn'
import SignUp from './components/SignUp/SignUp'
import Directors from './components/Directors/Directors'
import Movies from './components/Movies/Movies'
import DirectorMovies from './components/Directors/DirectorMovies'

import { useQuery, useApolloClient, useSubscription } from '@apollo/client'
import { ALL_MOVIES, MOVIE_ADDED } from './graphql/queries';
import Recommended from './components/User/Recommended';
import HeadPart from './components/HeadPart/HeadPart'
import FindMovies from './components/FindMovies/FindMovies';

import SearchMoviesToAddMain from './components/SearchMoviesToAdd/0-SearchMoviesToAddMain';
import { SearchMovieToAddContextProvider } from './contexts/SearchMovieToAddContext'
import MovieInfo from './components/MovieInfo/MovieInfo';
import AddMovieList from './components/AddMovieList/AddMovieList';
import { AddMovieListContextProvider } from './contexts/AddMovieListContext';
import { ListInfoContextProvider } from './contexts/ListInfoContext';
import MovieListDisplay from './components/MovieListDisplay/MovieListDisplay';

const App = () => {
  const [errorMessage , setErrorMessage] = useState(null)
  const [token, setToken] = useState(null)

  const client = useApolloClient()

  // useSubscription(MOVIE_ADDED, {
  //   onData: ({ data, client }) => {
  //     console.log('on App', data)
  //     const addedMovie = data.data.movieImdbAdded

  //     // ****// this component don't use ALL_MOVIES query yet, so have no cache will read null
  //     client.cache.updateQuery({ query: ALL_MOVIES }, (data) => {
  //       console.log('client cache', data)
  //       return {
  //         allMoviesImdb: data.allMoviesImdb.concat(addedMovie)
  //       }
  //     })

  //   }
  // })

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


  return (
    <div>
      <HeadPart logOut={ logOut } token={ token } />
      <SearchMovieToAddContextProvider>
      <AddMovieListContextProvider>
      <ListInfoContextProvider>
        
        <Routes>
          <Route path='/' element={<Movies/>} />

          <Route path='/find' element={<FindMovies/>} />

          <Route path='/movie/*' element={<SearchMoviesToAddMain hasToken={token !== null} /> } />

          <Route path='/movies/:imdbid' element={<MovieInfo /> } />

          <Route path='/directors' element={<Directors setError={notify} />} />

          <Route path='/directors/:id' element={<DirectorMovies />} />

          <Route path='/addlist' element={<AddMovieList />} />

          <Route path='/movielist' element={<MovieListDisplay />} />


          {/* <Route path='/add' 
            element={token ? <NewMovie setError={notify}/> : <Navigate replace to ='/login'/>} 
          /> */}

          <Route path='/recommended' 
            element={token ? <Recommended/> : <Navigate replace to ='/login'/>} 
          />

          <Route path='/login' 
            element={token ? <Navigate replace to ='/' /> : <LogIn setToken={setToken} setError={notify} /> } 
          />

          <Route path='/signup' 
            element={token ? <Navigate replace to ='/' /> : <SignUp setToken={setToken} setError={notify} /> } 
          />

          <Route path='/logout' 
            element={<Navigate replace to ='/login' /> } 
          />


        </Routes>
        
      </ListInfoContextProvider>
      </AddMovieListContextProvider>
      </SearchMovieToAddContextProvider>

     
    </div>

  )
}

export default App