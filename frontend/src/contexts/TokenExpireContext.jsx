import { createContext, useContext, useState, useEffect } from 'react'
import { jwtDecode } from 'jwt-decode'
import { useToken } from './TokenContext'

const TokenExpireContext = createContext()

// eslint-disable-next-line react-refresh/only-export-components
export const useTokenExpire = () => useContext(TokenExpireContext)

export const TokenExpireContextProvider = ({ children }) => {
  const { token } = useToken()
  const [expireIn, setExpireIn] = useState(0)

  // console.log('TokenExpireContextProvider rendered, everytime its state change', expireIn)

  useEffect(() => {
    const storedToken = localStorage.getItem('moviereveries-user-token')
    if (storedToken) {
      try {
        const decodedToken = jwtDecode(storedToken)
        const expirationTime = decodedToken.exp * 1000
        const currentTime = Date.now()

        if (expirationTime > currentTime) {

          const timeUntilExpiration = (expirationTime - currentTime) - 30000

          const expireTimeoutId = setTimeout(() => {
            setExpireIn(timeUntilExpiration)
          }, timeUntilExpiration)

          return () => {
            clearTimeout(expireTimeoutId)
            setExpireIn(0)
          }
        }

      } catch(error) {
        // console.log('In TokenContextProvider', error)
      }
    }

  }, [token])

  return (
    <TokenExpireContext.Provider value={{ expireIn }}>
      {children}
    </TokenExpireContext.Provider>
  )
}
