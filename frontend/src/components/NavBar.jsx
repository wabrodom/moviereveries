import { Link } from "react-router-dom"
import {
  Toolbar,
  Button,
} from '@mui/material'



const NavBar = ({ logOut, token }) => {

  return (
      <Toolbar>
        <div >
          <Button color="inherit" component={Link} to='/'>
            movies
          </Button>
          <Button color="inherit" component={Link} to='/directors'>
            directors
          </Button>
          <Button color="inherit" component={Link} to='/find'>
            find movies
          </Button>

          {token ?
            <>
              <Button color="inherit" component={Link} to='/recommended'>
                recommended
              </Button>
        
              <Button color="inherit" component={Link} to='/add'>
                  add movie
              </Button>

              <Button color="inherit" component={Link} to='/searchtoadd'>
                  search to add movie
              </Button>

              <Button color="inherit" component={Link} to='/logout' onClick={logOut}>
                log out
              </Button>
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
  )
}

export default NavBar