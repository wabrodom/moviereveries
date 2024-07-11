import { useState } from 'react'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'

const TogglableSpan = (props) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }


  {open ? <ExpandLess /> : <ExpandMore />}
  return (
    <>
      <span style={hideWhenVisible}>
        <span onClick={toggleVisibility}>{props.buttonLabel}</span>
        <ExpandMore onClick={toggleVisibility} />
      </span>
      <span style={showWhenVisible}>
        {props.children}
        <ExpandLess onClick={toggleVisibility} />
      </span>
    </>
  )
}

export default TogglableSpan