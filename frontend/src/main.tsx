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
import { scan } from 'react-scan'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retryDelay: 0,
            retry: 0,
            refetchOnWindowFocus: false,
        },
    },
})

scan({
    enabled: true,
})

const root = document.getElementById('root')
if (!root) throw 'No root set up in DOM'

ReactDOM.createRoot(root).render(
    <React.StrictMode>
        <BrowserRouter basename="/collabra/">
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
