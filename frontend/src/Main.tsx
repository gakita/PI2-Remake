import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import RoutesApp from './routes/routes.tsx'
import { AuthProvider } from './services/AuthContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <RoutesApp />
    </AuthProvider>
  </StrictMode>,
)
