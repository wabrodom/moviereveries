import { useCallback, useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'
import { FIND_MOVIES } from '../../graphql/queries'
import FoundMoviesContainer from './FoundMoviesContainer'
import { debounce } from '../../utils/helper'


const FoundMovies = ({ text }) => {
  const [searchMovies, { loading, data }] = useLazyQuery(FIND_MOVIES)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceTextUpdate = useCallback(debounce((args) => searchMovies(args), 500), [searchMovies])
  // const debounceTextUpdate = useCallback(debounce(searchMovies, 500), [])

  useEffect(() => {
    debounceTextUpdate({
      variables: { text },
    })
  }, [text, debounceTextUpdate])

  /*
    after component rendered the first time,
    useEffect ran, a lazy query is ready to do it after the setTimeout fulfilled
    loading is false, data is undefined
    */
  if (loading || data === undefined) {
    return <div>loading...</div>
  }

  const foundMoviesFiltered = data.findMoviesImdb

  return (
    <FoundMoviesContainer foundMoviesFiltered={foundMoviesFiltered} />
  )
}

export default FoundMovies