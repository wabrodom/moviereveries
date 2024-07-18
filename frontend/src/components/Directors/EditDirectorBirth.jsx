import { useMutation } from "@apollo/client"
import { useState } from "react"
import Select from 'react-select'

import { ALL_DIRECTORS, EDIT_DIRECTOR } from '../../graphql/queries' 

const EditDirectorBirth = ({ directors, setError }) => {
  const [year, setYear] = useState('')
  const [selectedOption, setSelectedOption] = useState(null);

  const [ editDirector ] = useMutation(EDIT_DIRECTOR, {
    refetchQueries: [{query: ALL_DIRECTORS}],
    onError: (error) => {
      // const message = error.graphQLErrors.map(e => e.message).join('\n')
      setError('years must be numbers')
    }
  })

  const handleSubmit = (event) => {
    event.preventDefault()
    // const currentSelect = event.target.selectAuthor.value

    editDirector({variables: { name: selectedOption.value, setBornTo: +year} })
    setYear('')
  } 

  const options = directors.map(obj => {
    return { value: obj.display_name, label: obj.display_name }
  })
  const inputStyle ={ marginTop: '1rem'}

  return (
    <div>
      <h3>Edit director birth year</h3>
      <form onSubmit={handleSubmit}>
        <Select
          defaultValue={selectedOption}
          onChange={setSelectedOption}
          options={options}
        />

        <input 
          value={year}
          onChange={({target}) => setYear(target.value)}
          style={inputStyle}
        />    
        <button type='submit'>update director</button>
      </form>
    </div>
  )

} 

export default EditDirectorBirth