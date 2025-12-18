import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { HeroUIProvider } from '@heroui/react'
import TokenContextProvider from './Context/TokenContext.jsx'
import { Toaster } from 'react-hot-toast'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'


export const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <HeroUIProvider>
    <TokenContextProvider>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
        <Toaster />
    </TokenContextProvider>
  </HeroUIProvider>,
)
