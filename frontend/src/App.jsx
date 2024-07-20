import { SearchMovieToAddContextProvider } from './contexts/SearchMovieToAddContext'
import { AddMovieListContextProvider } from './contexts/AddMovieListContext'
import { ListInfoContextProvider } from './contexts/ListInfoContext'
import { NotificationProvider } from './contexts/NotificationContext/NotificationContext'
import AllRoutes from './AllRoutes'

const App = () => {

  return (
    <div>

      <SearchMovieToAddContextProvider>
        <AddMovieListContextProvider>
          <ListInfoContextProvider>
            <NotificationProvider>

              <AllRoutes />

            </NotificationProvider>
          </ListInfoContextProvider>
        </AddMovieListContextProvider>
      </SearchMovieToAddContextProvider>


    </div>

  )
}

export default App