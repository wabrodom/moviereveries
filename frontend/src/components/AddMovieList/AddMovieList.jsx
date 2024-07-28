import { useMutation } from '@apollo/client'
import { ADD_MOVIE_LIST } from '../../graphql/mutations'
import { ALL_MOVIES_LIST } from '../../graphql/queries'
import { useAddMovieList } from '../../contexts/AddMovieListContext'
import { useListInfo } from '../../contexts/ListInfoContext'

import AddMovieListContainer from './AddMovieListContainer'
import useNotification from '../../contexts/NotificationContext/useNotification'

const AddMovieList = () => {
  const { notify } = useNotification()
  const [ addMovieList ]  = useMutation(ADD_MOVIE_LIST, {
    refetchQueries: [ { query: ALL_MOVIES_LIST, }],
    onError: (error) => {
      // console.log(error)
      // console.log(error.graphQLErrors[0].message)
      notify('error', error.graphQLErrors[0].message)
    },
    onCompleted: () => notify('success', `Added your new list "${listName}" to DB`),
    update: (cache, response) => {
      cache.updateQuery({ query: ALL_MOVIES_LIST }, (data) => {
        return {
          allMovieLists: data.allMovieLists.concat(response.data.addMovieList)
        }
      })
    },
  })

  const { movieList } = useAddMovieList()
  const { listInfo } = useListInfo()

  const listName = listInfo.find(obj => obj.name === 'listName').value
  const description = listInfo.find(obj => obj.name === 'description').value

  const handleAddMovie = async (event) => {
    event.preventDefault()

    const variables = {
      'listName': listName,
      'description': description,
      'list': movieList
    }
    await addMovieList({ variables })
  }
  const disabledSubmit = listName.length === 0 || description.length === 0

  // console.log('AddMovieList parent render')
  return (
    <div>
      <AddMovieListContainer handleAddMovie={handleAddMovie} disabledSubmit={disabledSubmit} />
    </div>
  )
}

export default AddMovieList

/*
  {
  "listName": "bom list 4",
  "description": "good list that bom procured",
  "list": [
    {
      "movieId": "668d392e2680d7a8ae27cc4f",
      "impression": "good starting point",
      "imdb_id": "12312345",
      "original_title": "jokobo",
      "primary_title": "jokobo",
    }
  ]
}
*/