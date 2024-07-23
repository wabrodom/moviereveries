import { Link } from 'react-router-dom'
import {
  Toolbar,
  Button,
  Box,
} from '@mui/material'
import theme from '../../assets/theme'

const groupNavBarStyle = {
  m: 1,
  borderRadius: 1,
}

const groupNavBarDb = {
  ...groupNavBarStyle,
  bgcolor: theme.palette.primary.main,
  '&:hover': {
    bgcolor: theme.palette.primary.light,
  },
}

const NavBar = ({ logOut, token }) => {

  return (
    <Toolbar>

      <Box sx={groupNavBarDb}>
        <Button color="inherit" component={Link} to='/' >
              movies
        </Button>

        <Button color="inherit" component={Link} to='/movielist'>
              movie lists
        </Button>

        <Button color="inherit" component={Link} to='/directors'>
              directors
        </Button>

        <Button color="inherit" component={Link} to='/find'>
              find movies
        </Button>


        {token &&
          <Button color="inherit" component={Link} to='/addlist'>
                add movie list
          </Button>
        }


        <Box>

          {token &&
                <Button color="inherit" component={Link} to='/recommended'>
                  recommended
                </Button>
          }

          {token &&
                <Button color="inherit" component={Link} to='/account'>
                  Your account
                </Button>
          }
        </Box>

      </Box>

      <Box sx={groupNavBarStyle}>
        {token &&
              <Button color="inherit" component={Link} to='/movie-outer-api'>
                  search movies from outside api
              </Button>
        }

        { token &&
            <Button color="inherit" component={Link} to='/logout' onClick={logOut}>
                log out
            </Button>
        }

        {token === null &&
            <>
              <Button color="inherit" component={Link} to='/login'>
                log in
              </Button>

              <Button color="inherit" component={Link} to='/signup'>
                sign up
              </Button>
            </>
        }
      </Box>


    </Toolbar>
  )
}

export default NavBar