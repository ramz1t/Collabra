import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import './i18n'
import { AuthProvider } from './contexts/AuthContext'
import { ThemeProvider } from './contexts/ThemeContext'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { TeamProvider } from './contexts/TeamContext'
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

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <TeamProvider>
                    <AuthProvider>
                        <ThemeProvider>
                            <HelmetProvider>
                                <App />
                                <ReactQueryDevtools />
                                <Toaster
                                    containerClassName="max-md:!top-20 max-md:!inset-x-2"
                                    position="top-right"
                                />
                            </HelmetProvider>
                        </ThemeProvider>
                    </AuthProvider>
                </TeamProvider>
            </QueryClientProvider>
        </BrowserRouter>
    </React.StrictMode>
)
