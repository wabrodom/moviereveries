import { useState, useEffect } from 'react'
import { Fab } from '@mui/material'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import { styled } from '@mui/system'

const GoTopButton = () => {
  const [ showGoTop, setShowGoTop ] = useState( false )

  useEffect(() => {
    window.addEventListener( 'scroll', handleScroll )
    return () => window.removeEventListener('scroll',handleScroll)
  }, [] )


  const handleScroll = () => {
    const scrollPosition = window.scrollY
    const documentHeight = document.documentElement.scrollHeight

    if (scrollPosition > documentHeight * (1 / 3) ) {
      setShowGoTop(true)
    } else {
      setShowGoTop(false)
    }
  }


  const handleScrollUp = () => {
    window.scrollTo( { left: 0, top: 0, behavior: 'smooth' } )
  }

  const GoTopHidden = styled('div')({
    display: showGoTop ? 'block' : 'none',
    position: 'fixed',
    bottom: '20px',
    right: '20px',
  })

  return (
    <GoTopHidden onClick={handleScrollUp}>
      <Fab color="primary" aria-label="scroll back to top">
        <ExpandLessIcon />
      </Fab>
    </GoTopHidden>
  )
}

export default GoTopButton