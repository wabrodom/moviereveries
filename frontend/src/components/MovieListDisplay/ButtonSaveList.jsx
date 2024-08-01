import { Button } from '@mui/material'
import { useMutation } from '@apollo/client'
import { SAVE_MOVIE_LIST } from '../../graphql/mutations'
import useNotification from '../../contexts/NotificationContext/useNotification'


const ButtonSaveList = ({ list }) => {
  const { notify } = useNotification()
  const [saveMovieList] = useMutation(SAVE_MOVIE_LIST, {
    onCompleted: (data) => {
      notify('success', `Added "${data.saveMovieList.listName}" to your list!`)
    },
    onError: (error) => {
      notify('error',  `"${list.listName} "` + error.graphQLErrors[0].message)
    }

  })

  const handleSaveList = () => {
    saveMovieList({
      variables: {
        'listId': list.id
      }
    })
  }

  return (
    <Button onClick={handleSaveList} variant='contained'>
      Save List
    </Button>
  )
}

export default ButtonSaveList