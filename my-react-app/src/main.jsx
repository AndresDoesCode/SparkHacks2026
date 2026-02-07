import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Layout from "./Layout.jsx"
import { BrowserRouter } from 'react-router-dom'

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Layout/>
    </BrowserRouter>
  </StrictMode>
)
