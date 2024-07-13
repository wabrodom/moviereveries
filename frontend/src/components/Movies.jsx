import { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_MOVIES } from '../graphql/queries'
import GenreDisplay from './GenreDisplay'
import MoviesTable from './MoviesTable';


const Movies = () => {
  const [genre, setGenre] = useState(null)

  const resultFilter = useQuery(ALL_MOVIES, {
    variables: { genre }, 
  })

  useEffect(() => {
    resultFilter.refetch()
    /*
      this component will mount again by the route element, 
      useEffect will run for the first time again
    */ 
  }, [])

  if (resultFilter.loading) {
    return <div>loading...</div>
  }

  const allMoviesFiltered = resultFilter.data.allMoviesImdb

  const triggerRefetch = () =>  resultFilter.refetch()

  // console.log("Movies rendered.")


  return (
    <div>
      <h2>movies</h2>

      <GenreDisplay 
        setGenre={setGenre} 
        refetch={triggerRefetch} 
      />

      <MoviesTable 
        movies={allMoviesFiltered} 
      />

    </div>
  )
}

export default Movies