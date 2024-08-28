import { createContext, useContext, useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'

const TokenContext = createContext()

// eslint-disable-next-line react-refresh/only-export-components
export const useToken = () => useContext(TokenContext)

export const TokenContextProvider = ({ children }) => {
  const [token, setToken] = useState(null)

  useEffect(() => {
    const storedToken = localStorage.getItem('moviereveries-user-token')
    if (storedToken) {
      try {
        const decodedToken = jwtDecode(storedToken)
        const expirationTime = decodedToken.exp * 1000
        const currentTime = Date.now()

        if (expirationTime > currentTime) {
          setToken(storedToken)
        } else {
          setToken(null)
          localStorage.removeItem('moviereveries-user-token')
        }

      } catch(error) {
        // console.log('In TokenContextProvider', error)
      }


    }
  }, [])

  return (
    <TokenContext.Provider value={{ token, setToken }}>
      {children}
    </TokenContext.Provider>
  )
}
