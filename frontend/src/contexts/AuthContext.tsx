import React, {
    createContext,
    useState,
    useEffect,
    useContext,
    Dispatch,
    SetStateAction,
    useCallback,
    useMemo,
} from 'react'
import { NavigateFunction, useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import { error, getCookie, success } from '../utils'
import { QueryClient, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import TeamContext, { ITeamContext } from './TeamContext'
import useLocalStorage from '../hooks/useLocalStorage'
import { AuthTokens, TokenUser, ValidationErrors } from '../types'
import { StorageKey } from '../utils/constants'

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
        setError: React.Dispatch<SetStateAction<ValidationErrors | undefined>>
    ): void
    setAuthTokens: Dispatch<SetStateAction<AuthTokens | null>>
    logoutUser(): void
}

const AuthContext = createContext<IAuthContext | null>(null)

export default AuthContext

export const AuthProvider = ({
    children,
}: {
    children: React.ReactElement
}) => {
    const { i18n, t } = useTranslation()
    const navigate: NavigateFunction = useNavigate()
    const queryClient: QueryClient = useQueryClient()
    const { setTeam } = useContext(TeamContext) as ITeamContext

    const [authTokens, setAuthTokens] = useLocalStorage<AuthTokens | null>(
        StorageKey.AUTH_TOKENS,
        null
    )

    const decodedUser = useMemo(() => {
        try {
            return authTokens
                ? (jwtDecode(authTokens.access) as TokenUser)
                : null
        } catch {
            return null
        }
    }, [authTokens])
    const [user, setUser] = useState<TokenUser | null>(decodedUser)

    const [, setCookiesAccepted] = useLocalStorage<boolean>(
        StorageKey.COOKIES_ACCEPTED,
        false
    )
    const [, setCookiesSettingSaved] = useLocalStorage<boolean>(
        StorageKey.COOKIES_SETTINGS_SAVED,
        false
    )

    const authWithTokens = useCallback(
        (tokens: AuthTokens, redirectFrom?: string | null) => {
            setAuthTokens(tokens)
            navigate(redirectFrom || '/teams')
        },
        [navigate, setAuthTokens]
    )

    const apiBaseUrl = useMemo(() => import.meta.env.VITE_API_URL || '', [])

    const getCommonHeaders = useCallback(
        () => ({
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Accept-Language': i18n.resolvedLanguage || 'en',
        }),
        [i18n.resolvedLanguage]
    )

    const loginUser: ILoginUserFunc = useCallback(
        async (
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
            if (!email || !password) return

            try {
                const res = await fetch(`${apiBaseUrl}/api/v1/token/`, {
                    method: 'POST',
                    headers: getCommonHeaders(),
                    body: JSON.stringify({ email, password }),
                })

                const data = await res.json()

                if (res.ok) {
                    authWithTokens(data, redirectFrom)
                } else {
                    error(data.detail)
                    setError?.(data.detail)
                }
            } catch (err) {
                error(t('Network error'))
                setError?.('Network error')
            }
        },
        [authWithTokens, i18n.resolvedLanguage]
    )

    const registerUser = useCallback(
        async (
            user: Record<string, string>,
            setError: (value: ValidationErrors) => void
        ) => {
            try {
                const res = await fetch(`${apiBaseUrl}/api/v1/users/`, {
                    method: 'POST',
                    headers: {
                        ...getCommonHeaders(),
                        'X-CSRFToken': getCookie('csrftoken') || '',
                    },
                    body: JSON.stringify(user),
                })

                const data = await res.json()

                if (res.ok) {
                    success(data.message)
                    authWithTokens(data, '/users/me/settings')
                } else {
                    setError(data as ValidationErrors)
                }
            } catch (err) {
                error(t('Network error'))
            }
        },
        [authWithTokens, i18n.resolvedLanguage]
    )

    const logoutUser = useCallback(() => {
        setAuthTokens(null)
        setUser(null)
        localStorage.clear()

        setTeam(null)

        setCookiesAccepted(null)
        setCookiesSettingSaved(null)

        queryClient.clear()

        navigate('/login')
    }, [
        setAuthTokens,
        setUser,
        setTeam,
        queryClient,
        setCookiesAccepted,
        setCookiesSettingSaved,
        navigate,
    ])

    useEffect(() => {
        if (authTokens?.access) {
            try {
                setUser(jwtDecode(authTokens.access))
            } catch (e) {
                console.error('Invalid token:', e)
                error(t('internal_token_err'))
                logoutUser()
            }
        }
    }, [authTokens, logoutUser])

    const contextData = useMemo(
        () => ({
            user,
            setUser,
            loginUser,
            registerUser,
            authTokens,
            setAuthTokens,
            logoutUser,
        }),
        [
            user,
            setUser,
            loginUser,
            registerUser,
            authTokens,
            setAuthTokens,
            logoutUser,
        ]
    )

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}
