import { useState } from 'react'
import { Button, Box } from '@mui/material'

const ToggleOnHover = ({ text, children }) => {
  const [isHovered, setIsHovered] = useState(false)
  const handleMouseEnter = () => setIsHovered(true)
  const handleMouseLeave = () => setIsHovered(false)

  return (
    <Box
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      sx={{ display: 'flex', alignItems: 'center', transition: 'all 0.3s' }}
    >
      {isHovered
        ? ( <Box sx={{ display: 'flex', gap: 1 }}>
          {children}
        </Box>)
        : (
          <Button >{text}</Button>
        )
      }
    </Box>
  )
}

export default ToggleOnHover
