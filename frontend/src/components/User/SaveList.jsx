import { useQuery } from '@apollo/client'
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
              {obj.listName}
            </li>
          )
        })}
      </ul>

    </div>
  )
}

export default SaveList