import Accordion from '../Common/Accordion'
import SingleMovieListBody from './2-SingleMovieListBody'
import SingleMovieHead from './2-SingleMovieListHead'


const MovieListDisplayContainer = ({ allMovieLists }) => {
  return (

    <Accordion>
      {allMovieLists.map((list) => (
        <Accordion.Item key={list.id}>

          <Accordion.ItemHeader>
            <SingleMovieHead list={list} />
          </Accordion.ItemHeader>

          <Accordion.Body>
            <SingleMovieListBody data={list} />
          </Accordion.Body>

        </Accordion.Item>
      ))}
    </Accordion>

  )
}

export default MovieListDisplayContainer
