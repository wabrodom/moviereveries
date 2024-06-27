import SearchMoviesContainer from "./2-SearchMoviesContainer";
import SearchResult from "./2-SearchMovieResult/2-SearchResult";
import { FETCH_MOVIES } from "../../../queries";
import { useLazyQuery } from '@apollo/client'
import { useSearchMovieToAdd } from "../../../contexts/SearchMovieToAddContext"


const SearchMovies = () => {
  const {searchQuery, setSearchQuery } = useSearchMovieToAdd()
  const [fetchMovies, { loading, data }] = useLazyQuery(FETCH_MOVIES)


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
      <SearchMoviesContainer onSubmit={onSubmit}/>
      { data === undefined 
        ? null 
        : <SearchResult fetchMovies={data.fetchMovies} searchTitle={searchQuery.title} />
      }
    </div>
  )
}

export default SearchMovies