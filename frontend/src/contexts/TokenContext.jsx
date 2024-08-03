import { createContext, useContext, useState } from 'react'

const TokenContext = createContext()

// eslint-disable-next-line react-refresh/only-export-components
export const useToken = () => useContext(TokenContext)

export const TokenContextProvider = ({ children }) => {
  const [token, setToken] = useState(null)

  return (
    <TokenContext.Provider value={{ token, setToken }}>
      {children}
    </TokenContext.Provider>
  )
}
