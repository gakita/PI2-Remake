import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import RoutesApp from './routes/routes.tsx'
import { AuthProvider } from './hooks/AuthContext.tsx'
import { ThemeProvider } from './hooks/ThemeContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <RoutesApp />
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>,
)
