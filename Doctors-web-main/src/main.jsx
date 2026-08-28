import { createRoot } from 'react-dom/client'
import './index.css'
import './all.min.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import UserProvider from './Components/Context/Context.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <UserProvider>
      <App />
    </UserProvider>
  </BrowserRouter>,
)
