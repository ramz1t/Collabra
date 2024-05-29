import { createContext, useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import { error, getCookie, success } from '../utils'
import { useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import TeamContext from './TeamContext'
import useLocalStorage from '../hooks/useLocalStorage.js'

const AuthContext = createContext()

export default AuthContext

export const AuthProvider = ({ children }) => {
    const { i18n } = useTranslation()
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const { setTeam } = useContext(TeamContext)

    const [authTokens, setAuthTokens] = useState(() =>
        localStorage.getItem('authTokens')
            ? JSON.parse(localStorage.getItem('authTokens'))
            : null
    )

    const [user, setUser] = useState(() =>
        localStorage.getItem('authTokens')
            ? jwtDecode(localStorage.getItem('authTokens'))
            : null
    )
    const [sca, setCookiesAccepted] = useLocalStorage('cookiesAccepted', false)
    const [scss, setCookiesSettingSaved] = useLocalStorage(
        'cookiesSettingSaved',
        false
    )

    const authWithTokens = (tokens, redirectFrom) => {
        setAuthTokens(tokens)
        localStorage.setItem('authTokens', JSON.stringify(tokens))
        navigate(redirectFrom ? redirectFrom : '/teams')
    }

    const loginUser = async ({ email, password, redirectFrom }, setError) => {
        if (email === '' || password === '') return

        fetch(`${import.meta.env.VITE_API_URL || ''}/api/v1/token/`, {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
                'Accept-Language': i18n.resolvedLanguage,
            },
            body: JSON.stringify({ email, password }),
        }).then(async (res) => {
            if (res.ok) {
                const data = await res.json()
                authWithTokens(data, redirectFrom)
            } else {
                const data = await res.json()
                error(data.detail)
            }
        })
    }

    const registerUser = (user, setError) => {
        fetch(`${import.meta.env.VITE_API_URL || ''}/api/v1/users/`, {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken'),
                'Accept-Language': i18n.resolvedLanguage,
            },
            body: JSON.stringify(user),
        }).then(async (res) => {
            if (res.ok) {
                const data = await res.json()
                success(data.message)
                authWithTokens(data)
            } else {
                // setError && setError(res)
                alert(JSON.stringify(res.statusText))
            }
        })
    }

    const logoutUser = () => {
        // Clear auth data
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')

        // Clear selected team
        setTeam(null)

        // Clear cached API data
        queryClient.clear()

        // Clear cookies preferences
        setCookiesAccepted(null)
        setCookiesSettingSaved(null)

        // Navigate to log in form
        navigate('/login')
    }

    const contextData = {
        user,
        setUser,
        loginUser,
        registerUser,
        authTokens,
        setAuthTokens,
        logoutUser,
    }

    useEffect(() => {
        if (authTokens) {
            setUser(jwtDecode(authTokens.access))
        }
    }, [authTokens])

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}
