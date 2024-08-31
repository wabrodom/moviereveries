import { useState, useEffect } from 'react'
import { useListInfo } from '../../contexts/ListInfoContext'

/*
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
const ListInfoInput = ({ name, label, trigger }) => {
  const { listInfo, setListInfo } = useListInfo()
  const initialText = listInfo.find(obj => obj.name === name).value
  const [text, setText] = useState(initialText)

  useEffect(() => {
    const newListInfo  = listInfo.map(obj => {
      if (obj.name === name) {
        obj.value = text
        return obj
      }
      return obj
    })

    setListInfo(newListInfo)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger])

  if (name === 'description') {
    return (
      <div>
        <p>
          { label }:
        </p>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value) }
          rows="3" cols="33"
        >
        ...
        </textarea>
      </div>
    )
  }


  return (
    <label>
      { label }:  <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value) }
      />
    </label>
  )
}

export default ListInfoInput