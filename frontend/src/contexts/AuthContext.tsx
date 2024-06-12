import React, {
    createContext,
    useState,
    useEffect,
    useContext,
    Dispatch,
    SetStateAction,
} from 'react'
import { NavigateFunction, useNavigate } from 'react-router-dom'
import { jwtDecode, JwtHeader, JwtPayload } from 'jwt-decode'
import { error, getCookie, success } from '../utils'
import { QueryClient, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import TeamContext, { ITeamContext } from './TeamContext'
import useLocalStorage from '../hooks/useLocalStorage'
import { AuthTokens, TokenUser } from '../types'

interface ILoginUserFunc {
    ({
        email,
        password,
        redirectFrom,
    }: {
        email: string
        password: string
        redirectFrom?: string | undefined | null
    }): Promise<void>
    setError?(error: string): void
}

export interface IAuthContext {
    user: TokenUser | null
    setUser: Dispatch<SetStateAction<TokenUser | null>>
    loginUser: ILoginUserFunc
    authTokens: AuthTokens | null
    registerUser(
        data: Record<string, any>,
        setError: React.Dispatch<SetStateAction<string | undefined>>
    ): void
    setAuthTokens: Dispatch<SetStateAction<AuthTokens | null>>
    logoutUser(): void
}

const AuthContext = createContext<IAuthContext | null>(null)

export default AuthContext

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
    const { i18n: i18n } = useTranslation()
    const navigate: NavigateFunction = useNavigate()
    const queryClient: QueryClient = useQueryClient()
    const { setTeam } = useContext(TeamContext) as ITeamContext

    const [authTokens, setAuthTokens] = useLocalStorage<AuthTokens | null>(
        'authTokens',
        null
    )
    const [user, setUser] = useState<TokenUser | null>(() =>
        authTokens ? (jwtDecode(JSON.stringify(authTokens)) as TokenUser) : null
    )
    const [sca, setCookiesAccepted] = useLocalStorage<boolean>(
        'cookiesAccepted',
        false
    )
    const [scss, setCookiesSettingSaved] = useLocalStorage<boolean>(
        'cookiesSettingSaved',
        false
    )

    const authWithTokens = (
        tokens: AuthTokens,
        redirectFrom?: string | null
    ) => {
        setAuthTokens(tokens)
        localStorage.setItem('authTokens', JSON.stringify(tokens))
        navigate(redirectFrom || '/teams')
    }

    const loginUser: ILoginUserFunc = async (
        {
            email,
            password,
            redirectFrom,
        }: {
            email: string
            password: string
            redirectFrom?: string | undefined | null
        },
        setError?: (error: string) => void
    ) => {
        if (email === '' || password === '') return

        fetch(`${import.meta.env.VITE_API_URL || ''}/api/v1/token/`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Accept-Language': i18n.resolvedLanguage || 'en',
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

    const registerUser = (
        user: Record<string, string>,
        setError: (value: string | undefined) => void
    ) => {
        fetch(`${import.meta.env.VITE_API_URL || ''}/api/v1/users/`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken') || '',
                'Accept-Language': i18n.resolvedLanguage || 'en',
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

    const logoutUser = (): void => {
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
