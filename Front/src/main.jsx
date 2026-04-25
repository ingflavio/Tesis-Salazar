import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.scss'
import App from './App'
import { UserProvider } from './context/user'
import { ScreenProvider } from './context/screen'
import { BrowserRouter } from 'react-router'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ScreenProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </ScreenProvider>
    </BrowserRouter>
  </StrictMode>,
)
