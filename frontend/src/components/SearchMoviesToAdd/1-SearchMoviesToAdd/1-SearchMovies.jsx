import SearchMoviesContainer from "./2-SearchMoviesContainer";
import SearchResult from "./2-SearchMovieResult/2-SearchResult";
import { FETCH_MOVIES } from "../../../queries";
import { useLazyQuery } from '@apollo/client'
import { useSearchMovieToAdd } from "../../../contexts/SearchMovieToAddContext"


const SearchMovies = ( { hasToken }) => {
  const {searchQuery, setSearchQuery, searchResults, setSearchResults} = useSearchMovieToAdd()
  const [fetchMovies, { loading, data }] = useLazyQuery(FETCH_MOVIES, {
    onCompleted: (data) => {
      // console.log('onCompleted data', data)
      setSearchResults(data.fetchMovies)
    }
  })


  const onSubmit = async (values) => {
    const { title, type, year } = values
    fetchMovies({ variables: { title, type, year } })
    setSearchQuery(values)
  }

  if (loading) {
    return <div>loading...</div>
  }
  
  return (
    <div>
      <SearchMoviesContainer 
        onSubmit={onSubmit} 
        oldSearchQuery={searchQuery} 
      />

      {!hasToken && <span>please login to use Search</span>}
      { data === undefined && searchResults.length === 0
        ? null 
        : data === undefined 
        ? <SearchResult 
            movies={searchResults} 
            searchTitle={searchQuery.title}
          />
        : <SearchResult 
            movies={data.fetchMovies} 
            searchTitle={searchQuery.title}
          />
      }
    </div>
  )
}

export default SearchMovies