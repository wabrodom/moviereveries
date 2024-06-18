import { useState } from "react"
import { Box } from '@mui/material'
import theme from '../assets/theme'
import Header from "./Header";
import NavBar from "./NavBar";

const HeadPart = ( props ) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  
  const handleMouseMove = (event) => {
    const { clientX, clientY } = event;
    setMousePosition({ x: clientX, y: clientY });
  }

  const HeadPartStyle = {
    background: theme.palette.primary.main,
    backgroundImage: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, ${theme.palette.primary.light}, ${theme.palette.primary.main})`,
    transition: 'background 0.1s ease-out', // Smooth transition for background change
  };

  
  return (
    <Box sx={HeadPartStyle} onMouseMove={handleMouseMove}>
      <Header />
      <NavBar logOut={props.logOut}/>
    </Box>
  )
}

export default HeadPart

/* 
  const handleMouseMove = (event) => {
    const { left, top } = event.currentTarget.getBoundingClientRect();
    const { clientX, clientY } = event;
    setMousePosition({ x: clientX - left, y: clientY - top });
  };

    const overlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'none', // Allow mouse events to pass through to the parent Box
    background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, ${theme.palette.primary.light}, ${theme.palette.primary.main})`,
    transition: 'background 0.1s ease-out', // Smooth transition for background change
    zIndex: 1,
  };

  const HeadPartStyle = {
    position: 'relative',
    background: theme.palette.primary.main,
    overflow: 'hidden', // Ensure the overlay does not exceed the parent boundaries
  };
  

*/