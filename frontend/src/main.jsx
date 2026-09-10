import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { LmsProvider } from "./context/LmsContext";
import './index.css'
import './lms.css'
import App from './App.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LmsProvider>
      <App />
    </LmsProvider>
  </StrictMode>
)
