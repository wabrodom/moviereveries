import Button from '@mui/material/Button'
import ShortcutIcon from '@mui/icons-material/Shortcut'
import Accordion from '../Common/Accordion'
import SingleMovieListBody from './2-SingleMovieListBody'
import SingleMovieHead from './2-SingleMovieListHead'
import { useNavigate } from 'react-router-dom'
import ToggleOnHover from '../Common/ToggleOnHover'

const MovieListDisplayContainer = ({ allMovieLists }) => {
  const navigate = useNavigate()
  const handleButtonClick = (event, list) => {
    event.stopPropagation()
    navigate(`/movielist/${list.id}`)
  }
  return (

    <Accordion>
      {allMovieLists.map((list) => (
        <Accordion.Item key={list.id}>
          <Accordion.ItemHeader>
            <SingleMovieHead list={list} />

            <ToggleOnHover>
              <Button onClick={(e) => handleButtonClick(e, list)}>
                <ShortcutIcon/>
              </Button>
            </ToggleOnHover>

          </Accordion.ItemHeader>

          <Accordion.Body>
            <SingleMovieListBody list={list} />
          </Accordion.Body>

        </Accordion.Item>
      ))}
    </Accordion>

  )
}

export default MovieListDisplayContainer
