import { createRoot } from 'react-dom/client'
import './index.css'
import './all.min.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import UserProvider from './Components/Context/Context.jsx'
import { LanguageProvider } from './Components/Context/LanguageContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <LanguageProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </LanguageProvider>
  </BrowserRouter>,
)

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  });
}
