
import GoTopButton from '../Common/GoToTopButton'
import AllRoutes from './2-AllRoutes'
import MainContent from './1-MainContent'
import Box from '@mui/material/Box'
import ResponsiveDrawerWrapper from './1-ResponsiveDrawerWrapper'
import NotificationWrapper from './1-NotificationWraper'

const AllRoutesWrapper = () => {
  // console.log('AllRoutesWrapper render 1 time' )
  return (
    <Box>

      <Box sx={{ display: 'flex' }}>
        <ResponsiveDrawerWrapper />

        <MainContent>
          <AllRoutes />
        </MainContent>
      </Box>

      <GoTopButton />
      <NotificationWrapper/>

    </Box>

  )
}

export default AllRoutesWrapper



/*
import { VALIDATE_TOKEN } from './graphql/queries'
    const validateToken = async (token) => {
    try {
      const { data } = await client.query({
        query: VALIDATE_TOKEN,
        variables: { token },
      })

      return data.validateToken
    } catch (error) {
      // console.log(error)
      // console.log(error.graphQLErrors[0].message)
      return null
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('moviereveries-user-token')
    const checkToken = async () => {
      if (token === null) {
        navigate('/login', { replace: true })
        return
      }
      const currentUser = await validateToken(token)
      if (currentUser === null) {
        setToken(null)
        localStorage.removeItem('moviereveries-user-token')
        navigate('/login', { replace: true })
      }
    }
    checkToken()

  } ,[])


*/