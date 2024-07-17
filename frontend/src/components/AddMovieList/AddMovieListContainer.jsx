import { useAddMovieList } from "../../contexts/AddMovieListContext"
import ImpressionInput from "./ImpressionInput"
import { useState } from "react"
import ListInfoInput from "./ListInfoInput";


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

const AddMovieListContainer = ({ handleAddMovie }) => {
  const [trigger, setTrigger] = useState(0)
  const { movieList } = useAddMovieList()
  
  const handleTrigger = () =>  setTrigger(trigger + 1) 

  const ListNameAndDescription = ['listName', 'description']

  return (
    <div>
      <form onSubmit={handleAddMovie}>
        <div>

          {
            ListNameAndDescription.map(e => {
              return (
    
                <div key={e} >
                    <ListInfoInput 
                      name={e} 
                      label={e}
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
                        trigger={trigger}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <button type="button" onClick={handleTrigger}>
              save to cache
            </button>
        
      
        </div>
        
        <button type='submit'>Create new list</button>
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