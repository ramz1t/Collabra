import { createContext, useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import { getCookie } from '../utils'
import { useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import TeamContext from './TeamContext'

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

    const [user, setUser] = useState(
        () =>
            localStorage.getItem('authTokens')
                ? jwtDecode(localStorage.getItem('authTokens'))
                : null // #TODO: change to null on prod or with server
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
                setError &&
                    setError({
                        status: res.status,
                        message: res.data,
                    })
                alert(res.status)
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
                authWithTokens(data)
            } else {
                // setError && setError(res)
                alert(JSON.stringify(res.statusText))
            }
        })
    }

    const logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        setTeam(null)
        queryClient.clear()
        localStorage.removeItem('authTokens')
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
