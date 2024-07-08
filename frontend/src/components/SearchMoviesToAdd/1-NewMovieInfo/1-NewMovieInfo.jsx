import { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { 
  NEW_MOVIE_DETAILS,
  ADD_MOVIE, 
  ALL_MOVIES, 
  ALL_DIRECTORS
 } from '../../../graphql/queries'
import { useParams } from 'react-router-dom'
import NewMovieInfoContainer from './2-NewMovieInfoContainer'

 
const NewMovieToAdd = () => {
  const imdbid = useParams().imdbid
  const [notification, setNotification] = useState(null)
  
  const notify = (severity, message) => {
    setNotification([severity, message])
    setTimeout(()=> {
      setNotification(null)
    }, 5000)
  }

  const { loading, data, error} = useQuery(NEW_MOVIE_DETAILS, {
    variables: { titleId: imdbid }
  })

  const [ addMovieImdb ]  = useMutation(ADD_MOVIE, {
    refetchQueries: [ { query: ALL_DIRECTORS, }],
    onError: (error) => {
      console.log(error)
      console.log(error.graphQLErrors[0].message)
      notify('error', error.graphQLErrors[0].message)
    },
    onCompleted: () => notify('success', 'Added a new movie to DB'),
    update: (cache, response) => {
      cache.updateQuery({ query: ALL_MOVIES }, (data) => {
        console.log('the data', data)
        return {
          allMoviesImdb: data.allMoviesImdb.concat(response.data.addMovieImdb)
          // allMovies: allMovies.concat(response.data.addMovie) // destructure { allMovies }
        }
      })
    },
  })

  if (loading) {
    return (
      <p>
        loading details...
      </p>
    )
  } ;
  if (error) {
    return (
      <div>
        <p>
          {error.message}
        </p>
        <p>
          NetworkError when attempting to fetch resource. 
          Please try again later.
        </p>
      </div>
    )
  }

  const newMovieDetails = data.title

  const {
    original_title = '',
    primary_title = '',
    genres = [],
    plot = '',
    is_adult = false,
    rating = 0,
    runtime_minutes = 0,
    spoken_languages = [],
    start_year = '',
    end_year = '',
    type = '',
    posters = [],
    origin_countries = [],
    critic_review = '',
    directorsAdded = [],
    writersAdded = [],
  } = newMovieDetails || {};

  const postersModify = posters.map(obj => {
    return {
      url: obj.url
    }
  })

  const directorAddedModify = directorsAdded.map(obj => {
    return {
      display_name: obj.name.display_name,
      nameId: obj.name.id
    }
  })

  const handleAddMovie = async (event) => {
    event.preventDefault()
    const variables = { 
      "imdbId": imdbid,
      "originalTitle": original_title,
      "primaryTitle": primary_title,
      "genres": genres,
      "plot": plot,
      "isAdult": is_adult,
      "runtimeMinutes": runtime_minutes,
      "startYear": start_year,
      "endYear": end_year,
      "type": type,
      "postersUse": postersModify,
      "directorsAddedUse": directorAddedModify
    } 
    console.log(variables)
    addMovieImdb({ variables })
  }


  return (
    <div>
      <NewMovieInfoContainer 
        movieDetails={newMovieDetails} 
        addMovie={handleAddMovie}
        notification={notification}
      />
    </div>
  )
}

export default NewMovieToAdd

