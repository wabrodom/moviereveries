import { Link } from "react-router-dom"
import {
  AppBar, 
  Toolbar,
  Button,
} from '@mui/material'

const toolBarStyle = {
  background: 'linear-gradient(to top left, primary.dark, primary.light)',
  '&:hover': {
    background: 'linear-gradient(to top left, primary.light, primary.main)',
  },
}

const NavBar = ({ logOut, token }) => {

  return (
    <AppBar position="static">
      <Toolbar sx={toolBarStyle}>
        <div >
          <Button color="inherit" component={Link} to='/'>
            movies
          </Button>
          <Button color="inherit" component={Link} to='/directors'>
            directors
          </Button>


          {token ?
            <>
              <Button color="inherit" component={Link} to='/recommended'>
                recommended
              </Button>
        
              <Button color="inherit" component={Link} to='/add'>
                  add movie
              </Button>

              <Button onClick={logOut}>log out</Button>
            </>
          :
            <>
              <Button color="inherit" component={Link} to='/login'>
                log in
              </Button>

              <Button color="inherit" component={Link} to='/signup'>
                sign up
              </Button>
            </>
          }

    
        </div>

      </Toolbar>

    </AppBar>
  )
}

export default NavBar