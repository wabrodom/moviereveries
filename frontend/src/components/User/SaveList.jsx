import { useQuery } from '@apollo/client'
import { Link } from 'react-router-dom'
import { USER_SAVED_MOVIE_LIST } from '../../graphql/queries'
import useNotification from '../../contexts/NotificationContext/useNotification'

const SaveList = ({ setSaveListLength }) => {
  const { loading, error, data } = useQuery(USER_SAVED_MOVIE_LIST, {
    onCompleted: (data) => setSaveListLength(data.userSavedMovieList.length)
  })
  const { notify } = useNotification()

  if (loading) return null

  if (error) {
    // console.log(error)
    notify('error', error.graphQLErrors[0].message)
  }

  const userSavedMovieList = data.userSavedMovieList

  return (
    <div>
      I like these list. So I saved it.
      <ul>
        {userSavedMovieList.map(obj => {
          return (
            <li key={obj.id}>
              <Link to={`/movielist/${obj.id}`}  state={{ isOwn: true }} >
                {obj.listName}
              </Link>
            </li>
          )
        })}
      </ul>

    </div>
  )
}

export default SaveList