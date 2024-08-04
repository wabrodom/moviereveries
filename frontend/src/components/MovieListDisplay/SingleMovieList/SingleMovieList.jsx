import SingleMovieListBody from '../2-SingleMovieListBody'
import SingleMovieListHead from '../2-SingleMovieListHead'
import { FIND_MOVIE_LIST_BY_ID } from '../../../graphql/queries'
import { useQuery } from '@apollo/client'
import { useParams } from 'react-router-dom'

const SingleMovieList = () => {
  const id = useParams().id
  const { loading, data } = useQuery(FIND_MOVIE_LIST_BY_ID, {
    variables: { findMovieListByIdId: id }
  })
  if (loading) {
    return (
      <p>loading... </p>
    )
  }

  const responseList = data.findMovieListById

  return (
    <div>
      <SingleMovieListHead list={responseList} />
      <SingleMovieListBody list={responseList}/>
    </div>
  )
}

export default SingleMovieList