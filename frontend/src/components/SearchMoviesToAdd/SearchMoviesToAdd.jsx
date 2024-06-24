import SearchMoviesContainer from "./SearchMoviesContainer";
import { useState } from "react";
import SearchResult from "./SearchResult";
import { FETCH_MOVIES } from "../../queries";
import { useLazyQuery } from '@apollo/client'

const SearchMoviesToAdd = () => {
  const [searchTitle, setSearchTitle] = useState('')
  const [fetchMovies, { loading, data }] = useLazyQuery(FETCH_MOVIES)

  const onSubmit = async (values) => {
    const { title, type, year } = values
    fetchMovies({ variables: { title, type, year } })
    setSearchTitle(title)
  }

  if (loading) {
    return <div>loading...</div>
  }
  
  return (
    <div>
      <SearchMoviesContainer onSubmit={onSubmit}/>
      { data === undefined 
        ? null 
        : <SearchResult fetchMovies={data.fetchMovies} searchTitle={searchTitle} />
      }
    </div>
  )
}

export default SearchMoviesToAdd