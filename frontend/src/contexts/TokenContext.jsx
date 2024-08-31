import { createContext, useContext, useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'

const TokenContext = createContext()

// eslint-disable-next-line react-refresh/only-export-components
export const useToken = () => useContext(TokenContext)

export const TokenContextProvider = ({ children }) => {
  const [token, setToken] = useState(null)
  const [tokenReady, setTokenReady] = useState(false)

  // when reload, component mount, useEffect run -> tokenReady === true
  useEffect(() => {
    const storedToken = localStorage.getItem('moviereveries-user-token')
    if (storedToken) {
      try {
        const decodedToken = jwtDecode(storedToken)
        const expirationTime = decodedToken.exp * 1000
        const currentTime = Date.now()
        const timeUntilExpiration = expirationTime - currentTime

        if (expirationTime > currentTime) {
          setToken(storedToken)
          setTokenReady(true)
          const expireTimeoutId = setTimeout(() => {
            setToken(null)
            localStorage.removeItem('moviereveries-user-token')
          }, timeUntilExpiration)

          return () => clearTimeout(expireTimeoutId)
        } else {
          setToken(null)
          setTokenReady(true)
          localStorage.removeItem('moviereveries-user-token')
        }

      } catch(error) {
        // console.log('In TokenContextProvider', error)
        setToken(null)
        localStorage.removeItem('moviereveries-user-token')
      }


    } else {
      setTokenReady(true)
    }
  }, [])

  return (
    <TokenContext.Provider value={{ token, setToken, tokenReady }}>
      {children}
    </TokenContext.Provider>
  )
}
