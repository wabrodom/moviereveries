import { useCallback, useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'
import { FIND_MOVIES } from '../../queries'
import FoundMoviesContainer from './FoundMoviesContainer'
import { debounce } from '../../utils/helper'


const FoundMovies = ({ text }) => {
    const [searchMovies, { loading, data }] = useLazyQuery(FIND_MOVIES)

    const debounceTextUpdate = useCallback(debounce(searchMovies, 500), [])

    useEffect(() => {
      debounceTextUpdate({ 
        variables: { text },
      })
    }, [text])

    /* 
    after component rendered the first time, 
    useEffect ran, a lazy query is ready to do it after setTimeout fulfill
    loading is false, data is undefined
    */
    if (loading || data === undefined) {
      return <div>loading...</div>
    }

    const foundMoviesFiltered = data.findMovies

    return (
      <FoundMoviesContainer foundMoviesFiltered={foundMoviesFiltered} />
  )
}

export default FoundMovies