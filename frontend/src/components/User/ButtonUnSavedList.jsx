import { useState } from 'react'
import { Button } from '@mui/material'
import { useMutation } from '@apollo/client'
import { UNSAVE_MOVIE_LIST } from '../../graphql/mutations'
import { USER_SAVED_MOVIE_LIST } from '../../graphql/queries'
import useNotification from '../../contexts/NotificationContext/useNotification'
import ConfirmationDialog from '../Common/ConfirmationDialog'

const ButtonUnSavedList = ({ list }) => {
  const { notify } = useNotification()
  const [ unSaveMovieList ] = useMutation(UNSAVE_MOVIE_LIST, {
    refetchQueries: [ { query: USER_SAVED_MOVIE_LIST }],
    onCompleted: (data) => {
      notify('success', `Removed "${data.unSaveMovieList.listName}" from your list!`)
    },
    onError: (error) => {
      notify('error',  `"${list.listName} "` + error.graphQLErrors[0].message)
    }
  })

  const [open, setOpen] = useState(false)
  const handleOpenDialog = () => setOpen(true)
  const handleCloseDialog = () => setOpen(false)

  const handleUnSaveList = () => {
    unSaveMovieList({
      variables: {
        'listId': list.id
      }
    })
    handleCloseDialog()
  }

  return (
    <>
      <Button onClick={handleOpenDialog} variant='text'>
      ❌ Unsave List
      </Button>

      <ConfirmationDialog
        open={open}
        onClose={handleCloseDialog}
        onConfirm={handleUnSaveList}
        title="Confirm Unsave"
        message="Are you sure you want to remove this list?"
      />
    </>
  )
}

export default ButtonUnSavedList