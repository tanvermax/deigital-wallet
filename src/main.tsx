import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import { Provider as ReduxProvider } from 'react-redux'
import { router } from './routes/index.tsx'
import { store } from './redux/store.ts'
import { Toaster } from './components/ui/sonner.tsx'
import { ThemeProvider } from './providers/theme.provider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <ReduxProvider store={store}>
        <RouterProvider router={router} />
        <Toaster richColors />
      </ReduxProvider>
    </ThemeProvider>
  </StrictMode>,
)
