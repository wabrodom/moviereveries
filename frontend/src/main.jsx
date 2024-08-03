import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'

import { ThemeProvider } from '@mui/material'
import theme from './assets/theme'
import { TokenContextProvider } from './contexts/TokenContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <ThemeProvider theme={theme}>
      <TokenContextProvider>
        <App />
      </TokenContextProvider>
    </ThemeProvider>
  </Router>

)