import * as React from 'react'
import PropTypes from 'prop-types'
import AppBar from '@mui/material/AppBar'
import CssBaseline from '@mui/material/CssBaseline'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import MenuIcon from '@mui/icons-material/Menu'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

import ListItemGenerate from './1-ListItemGenerate'


const drawerWidth = 240

function ResponsiveDrawer(props) {
  const { logOut, token } = props
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const [isClosing, setIsClosing] = React.useState(false)

  const handleDrawerClose = () => {
    setIsClosing(true)
    setMobileOpen(false)
  }

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false)
  }

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen)
    }
  }


  const mainMenu = [
    { to:'/' , label: 'movies' },
    { to:'/movielist' , label: 'movie lists' },
    { to:'/directors' , label: 'directors' },
    { to:'/find' , label: 'find movies' },
  ]

  const logedInMenu = [
    { to:'/addlist' , label: 'add movie list' },
    { to:'/recommended' , label: 'recommended' },
    { to:'/account' , label: 'Your account' },
    { to:'/movie-outer-api' , label: 'search movies from outside api' },
    { to:'/logout' , label: 'log out' },
  ]

  const noToken = [
    { to:'/login' , label: 'log in' },
    { to:'/signup' , label: 'sign up' },
  ]


  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {mainMenu.map((obj, index) => (
          <ListItemGenerate key={obj.label} obj={obj} index={index} />
        ))}
      </List>
      <Divider />
      <List>
        {token && logedInMenu.map((obj, index) => {
          if (obj.to === '/logout') {
            return (
              <ListItemGenerate key={obj.label} obj={obj} index={index} onClick={logOut}/>
            )
          } else {
            return (
              <ListItemGenerate key={obj.label} obj={obj} index={index} />
            )
          }
        })}
      </List>

      <List>
        {token === null && noToken.map((obj, index) => (
          <ListItemGenerate key={obj.label} obj={obj} index={index} />
        ))}
      </List>
    </div>
  )

  // Remove this const when copying and pasting into your project.
  // const container = window !== undefined ? () => window().document.body : undefined
  // console.log('-- -- ResponsiveDrawer rendered')
  return (
    <Box>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h1" noWrap component="div">
              Movie Reveries
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          // container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

    </Box>
  )
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window: PropTypes.func,
}

export default ResponsiveDrawer


