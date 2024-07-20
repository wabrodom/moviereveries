import { useState } from 'react'
import FoundMovies from './FoundMovies'

const FindMovies = () => {
  const [text, setText] = useState('')
  const handleSearch = (event) => setText(event.target.value)

  return (
    <div>
      <h2>movies</h2>

      <div>
        Title to search
        <input
          type="text"
          value={text}
          onChange={handleSearch}
        />
      </div>

      <FoundMovies text ={text}/>

    </div>
  )
}

export default FindMovies