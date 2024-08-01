import { useState } from 'react'
import { useQuery, useMutation, useLazyQuery } from '@apollo/client'
import { ALL_MOVIES, CURRENT_USER_FULL, CURRENT_USER } from '../../graphql/queries'
import { CHANGE_FAVORITE_GENRE } from '../../graphql/mutations'
import ChangeGenreInput from './ChangeGenreInput'
import useNotification from '../../contexts/NotificationContext/useNotification'
import SaveList from './SaveList'


/*
  1. name of the user
  2. favorite genre
  3. list of your list
  4  can change genre
*/

const Account = () => {
  const [currentUser, setCurrentUser] = useState(null)
  const [filteredMovies, setFilteredMovies] = useState(null)
  const [saveListLength, setSaveListLength] = useState(0) // this hook, cause +2 renders
  const { notify } = useNotification()

  useQuery(CURRENT_USER_FULL, {
    onCompleted: (data) => {
      setCurrentUser(data.meFull)
      getFilterMovies({ variables: { genre: data.meFull.favoriteGenre } })
    }
  })

  const [ changeGenre ]  = useMutation(CHANGE_FAVORITE_GENRE, {
    refetchQueries: [ { query: ALL_MOVIES }, { query: CURRENT_USER_FULL }, { query: CURRENT_USER }],
    onError: (error) => {
      console.log('in Account',error)
      // console.log(error.graphQLErrors[0].message)
      notify('error', error.graphQLErrors[0].message)
    },
    onCompleted: (data) => {
      notify('success', `Changed favorite genre to "${data.changeFavoriteGenre}"`)
      setCurrentUser({ ...currentUser, favoriteGenre: data.changeFavoriteGenre })
    },
    update: (cache, response) => {
      cache.updateQuery({ query: CURRENT_USER_FULL }, (data) => {
        return {
          meFull: {
            ...data.meFull,
            favoriteGenre: response.data.changeFavoriteGenre
          }
        }
      })
    },
  })

  const [getFilterMovies, resultFilterMovies] = useLazyQuery(ALL_MOVIES, {
    onCompleted: (data) => setFilteredMovies(data.allMoviesImdb)
  })

  if (resultFilterMovies.loading || !currentUser || !filteredMovies) {
    return null
  }

  resultFilterMovies.refetch()

  const { name, favoriteGenre, movieLists } = currentUser
  const listCount = movieLists.length

  const handleChangeGenre = async (values) => {
    const { newGenre } = values
    const variables = { 'genre': newGenre }

    await changeGenre({ variables })
  }

  return (
    <div>
      <h2>HI! {name}</h2>

      <section>
        <h3>
          your current favorite genre: <strong>{favoriteGenre}</strong>
        </h3>
      </section>

      <ChangeGenreInput onSubmit={handleChangeGenre} />

      <section>
        <h3>You created {listCount} list{listCount > 1 && 's'}. </h3>
        <ul>
          {movieLists.map(obj => {
            return (
              <li key={obj.id}>
                {obj.listName}
              </li>
            )
          })
          }

        </ul>
      </section>

      <section>
        <h3>You saved  {saveListLength} list{saveListLength > 1 && 's'}</h3>
        <SaveList setSaveListLength={setSaveListLength} />
      </section>
      {/* <section>
        <h3>Your saved list</h3>
        <SaveList />
      </section> */}

    </div>
  )
}

export default Account


