import { useState } from 'react'
import { Button } from '@mui/material'
import { useMutation } from '@apollo/client'
import { REMOVE_MOVIE_LIST } from '../../graphql/mutations'
import { USER_CREATED_MOVIE_LIST } from '../../graphql/queries'
import useNotification from '../../contexts/NotificationContext/useNotification'
import ConfirmationDialog from '../Common/ConfirmationDialog'

const ButtonRemoveList = ({ list, text }) => {
  const { notify } = useNotification()
  const [ removeMovieList ] = useMutation(REMOVE_MOVIE_LIST, {
    refetchQueries: [ { query: USER_CREATED_MOVIE_LIST }],
    onCompleted: (data) => {
      const m = data.removeMovieList
      if (m.savedUser.length ===0 ) {
        notify('success', `Removed "${data.removeMovieList.listName}" list!`)
      } else {
        notify('success', `Soft Deleted "${data.removeMovieList.listName}" list!`)
      }

    },
    onError: (error) => {
      notify('error',  `"${list.listName} "` + error.graphQLErrors[0].message)
    }
  })

  const [open, setOpen] = useState(false)
  const handleOpenDialog = () => setOpen(true)
  const handleCloseDialog = () => setOpen(false)

  const handleUnSaveList = () => {
    removeMovieList({
      variables: {
        'listId': list.id
      }
    })
    handleCloseDialog()
  }

  return (
    <>
      <Button onClick={handleOpenDialog} variant='text'>
        {list.deletedByUser === true
          ? <span>soft deleted!</span>
          : <span>{text}</span>

        }

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

export default ButtonRemoveList