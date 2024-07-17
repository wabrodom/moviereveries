import { useState, useEffect } from "react";
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
  const [text, setText] = useState('')

  const { listInfo, setListInfo } = useListInfo()
  
  useEffect(()=> {
    const newListInfo  = listInfo.map(obj => {
      if (obj.name == name) {
        obj.value = text
        return obj
      } 
      return obj
    })

    setListInfo(newListInfo)

  }, [trigger])
  

  return (
    <label>
       { label }:  <input 
         type="text" 
         onChange={(e) => setText(e.target.value) }
       />
    </label>
  )
}

export default ListInfoInput