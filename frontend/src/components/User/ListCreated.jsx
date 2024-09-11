import { useQuery } from '@apollo/client'
import { Link } from 'react-router-dom'
import { USER_CREATED_MOVIE_LIST } from '../../graphql/queries'
import useNotification from '../../contexts/NotificationContext/useNotification'
import ButtonRemoveList from './ButtonRemoveList'

const ListCreated = () => {
  const { loading, error, data } = useQuery(USER_CREATED_MOVIE_LIST, {
    // onCompleted: (data) => setSaveListLength(data.userSavedMovieList.length)
  })
  const { notify } = useNotification()

  if (loading) return null

  if (error) {
    notify('error', error.graphQLErrors[0].message)
  }

  const userCreatedMovieList = data.userCreatedMovieList

  return (
    <div>
      I like these movies. So I created this list.
      <ul>
        {userCreatedMovieList.map(obj => {
          const savedLength = obj.savedUser.length

          return (
            <li key={obj.id}>
              <Link to={`/movielist/${obj.id}`}  state={{ isOwn: true }} >
                {obj.listName}
              </Link>

              { savedLength > 0
                ?
                <span>
                   : {obj.savedUser.length} people save your list
                  <ButtonRemoveList list={obj} text={'remove from public'} />
                </span>
                : <ButtonRemoveList list={obj} text={'❌ Remove List'} />
              }

            </li>
          )
        })}
      </ul>

    </div>
  )
}

export default ListCreated