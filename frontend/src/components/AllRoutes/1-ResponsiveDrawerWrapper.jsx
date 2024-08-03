import { useNavigate } from 'react-router-dom'
import { useApolloClient } from '@apollo/client'

import useNotification from '../../contexts/NotificationContext/useNotification'
import { useAddMovieList } from '../../contexts/AddMovieListContext'
import { useListInfo } from '../../contexts/ListInfoContext'
import { useToken } from '../../contexts/TokenContext'

import ResponsiveDrawer from '../HeadPart/ResponsiveDrawer/0-ResponsiveDrawer'


const ResponsiveDrawerWrapper = () => {
  const { token, setToken } = useToken()
  const { notify } = useNotification()
  const client = useApolloClient()
  const navigate = useNavigate()
  const { clearMovieLists } = useAddMovieList()
  const { clearListIfo } = useListInfo()

  /*  important to clear everything */
  const logOut =  () => {
    setToken(null)
    localStorage.removeItem('moviereveries-user-token')
    clearMovieLists()
    clearListIfo()
    try {
      // if use client.resetStore, async method. wrap it in try-catch
      client.clearStore()
      navigate('/login', { replace: true })
    } catch (error) {
      // console.error('Error during logout:', error)
      notify('error', 'log out error')
    }
  }
  // console.log('-- ResponsiveDrawerWrapper > ResponsiveDrawer render too much' , token)

  return (
    <ResponsiveDrawer logOut={ logOut } token={ token } />
  )
}

export default ResponsiveDrawerWrapper



/*
   logOut, token can passed further down help reduce re-render/ but good for now, move on
*/