import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './i18n.js'
import { AuthProvider } from './contexts/AuthContext.jsx'
import { ThemeProvider } from './contexts/ThemeContext.jsx'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { TeamProvider } from './contexts/TeamContext.jsx'
import { Toaster } from 'react-hot-toast'
import { HelmetProvider } from 'react-helmet-async'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retryDelay: 0,
            retry: 0,
            refetchOnWindowFocus: false,
        },
    },
})

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <TeamProvider>
                    <AuthProvider>
                        <ThemeProvider>
                            <HelmetProvider>
                                <App />
                                <ReactQueryDevtools />
                                <Toaster position="top-right" />
                            </HelmetProvider>
                        </ThemeProvider>
                    </AuthProvider>
                </TeamProvider>
            </QueryClientProvider>
        </BrowserRouter>
    </React.StrictMode>
)
