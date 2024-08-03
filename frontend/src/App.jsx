import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
  split,
} from '@apollo/client'
import { getMainDefinition } from '@apollo/client/utilities'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { createClient } from 'graphql-ws'
import { setContext } from '@apollo/client/link/context'
import { jwtDecode } from 'jwt-decode'
import { useToken } from './contexts/TokenContext'

import { TokenExpireContextProvider } from './contexts/TokenExpireContext'
import { SearchMovieToAddContextProvider } from './contexts/SearchMovieToAddContext'
import { AddMovieListContextProvider } from './contexts/AddMovieListContext'
import { ListInfoContextProvider } from './contexts/ListInfoContext'
import { NotificationProvider } from './contexts/NotificationContext/NotificationContext'
import AllRoutesWrapper from './components/AllRoutes/0-AllRoutesWrapper'

const App = () => {
  const { setToken } = useToken()
  const authLink = setContext((request, previousContext) => {
    const token = localStorage.getItem('moviereveries-user-token')
    if (token === null) {
      setToken(null)   // reset token
      return {
        headers: {
          ...previousContext.headers,
          authorization: null
        }
      }
    }
    try {
      const { exp } = jwtDecode(token)  //number of seconds since 1 January 1970
      const expirationTime = (exp * 1000)  // in millseconds - 1 min (- 60000)
      if (Date.now() >= expirationTime) {
        setToken(null)   // reset token
        localStorage.removeItem('moviereveries-user-token')
        return {
          headers: {
            ...previousContext.headers,
            authorization: null
          }
        }
      }

      return {
        headers: {
          ...previousContext.headers,
          authorization: token ? `Bearer ${token}` : null
        }
      }

    } catch (error) {
      // console.log(error)
    }
  })

  const httpLink = createHttpLink({ uri: import.meta.env.VITE_BACKEND_URL })

  const wsLink = new GraphQLWsLink(createClient({ url: import.meta.env.VITE_GRAPHQLWSLINK }))

  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query)
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      )
    },
    wsLink,
    authLink.concat(httpLink),
  )

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: splitLink
  })

  return (
    <ApolloProvider client={client}>
      <TokenExpireContextProvider>
        <SearchMovieToAddContextProvider>
          <AddMovieListContextProvider>
            <ListInfoContextProvider>
              <NotificationProvider>

                <AllRoutesWrapper />

              </NotificationProvider>
            </ListInfoContextProvider>
          </AddMovieListContextProvider>
        </SearchMovieToAddContextProvider>

      </TokenExpireContextProvider>
    </ApolloProvider>

  )
}

export default App


/*
// old authLink
  const authLink = setContext((request, previousContext) => {
    const token = localStorage.getItem('moviereveries-user-token')
    return {
      headers: {
        ...previousContext.headers,
        authorization: token ? `Bearer ${token}` : null
      }
    }
  })

*/
