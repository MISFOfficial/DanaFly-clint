import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from 'react-router'
import { router } from './Router/Router.jsx'
import AuthProvider from './Auth/AuthProvider.jsx'
import { ToastContainer } from 'react-toastify'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClint = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ToastContainer></ToastContainer>
    <QueryClientProvider client={queryClint}>
      <div  
      className=''>
        <AuthProvider>
          <RouterProvider router={router}>
          </RouterProvider>
        </AuthProvider>
      </div>
    </QueryClientProvider>
  </StrictMode>,
)
