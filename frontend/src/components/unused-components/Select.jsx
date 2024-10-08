import { useState } from 'react'

const Select = (array, field) => {
  const [selectedOption, setSelectedOption] = useState(null)

  const options = array.map(obj => {
    return { value: obj[field],  label: obj[field] }
  })

  return (
    <div>
      <Select
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        options={options}
      />
    </div>
  )
}

export default Select