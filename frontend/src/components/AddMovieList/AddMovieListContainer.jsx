import { useState } from 'react'
import { Box, Button } from '@mui/material/'
import ImpressionInput from './ImpressionInput'
import ListInfoInput from './ListInfoInput'
import { useAddMovieList } from '../../contexts/AddMovieListContext'
import { useListInfo } from '../../contexts/ListInfoContext'
import useNotification from '../../contexts/NotificationContext/useNotification'
import FlexSpaceAround from '../Common/FlexSpaceAround'

/* conxtext structure
  movieList = [
    {
      "movieId": "",
      "impression": "",
      "imdb_id": "",
      "original_title": "",
      "primary_title": "",
    }
  ]

   listInfo = [
    {
      name: "listName",
      value: ''
    },
    {
      name: "description",
      value: ''
    }
  ]
*/

const AddMovieListContainer = ({ handleAddMovie, disabledSubmit }) => {
  const [trigger, setTrigger] = useState(0)
  const { movieList, clearMovieLists } = useAddMovieList()
  const { clearListIfo } = useListInfo()
  const { notify } = useNotification()

  //state change in parent -> child useState watch the change
  const handleTrigger = () => {
    setTrigger(trigger + 1)
    notify('info' , 'save current data to all the list contexts cache')
  }
  const clearAllListsInfo = () => {
    clearMovieLists()
    clearListIfo()
  }

  const ListNameAndDescription = [
    { name: 'listName', label: 'List Name' },
    { name: 'description', label: 'Your Description' }
  ]

  const centerButton = { margin: 'auto' }
  const isDisabled = movieList.length === 0 || disabledSubmit


  return (
    <div>
      <form onSubmit={handleAddMovie}>
        <div>

          {
            ListNameAndDescription.map(e => {
              return (

                <div key={e.name} >
                  <ListInfoInput
                    name={e.name}
                    label={e.label}
                    trigger={trigger}
                  />
                </div>

              )
            })

          }

        </div>


        <div>

          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Impression</th>
              </tr>
            </thead>
            <tbody>
              {movieList.map((movie) => (
                <tr key={movie.imdb_id}>
                  <td>{movie.primary_title}</td>
                  <td>
                    <ImpressionInput
                      movieId={movie.movieId}
                      movieTitle={movie.primary_title}
                      trigger={trigger}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>


          <FlexSpaceAround>
            <button type="button" onClick={handleTrigger}>
              save to cache
            </button>
            <button type="button" onClick={clearAllListsInfo}>
              clear cache
            </button>
          </FlexSpaceAround>


        </div>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Button variant="outlined" type='submit' sx={centerButton} disabled={isDisabled}>
            Create new list
          </Button>

        </Box>
      </form>


    </div>
  )
}

export default AddMovieListContainer

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