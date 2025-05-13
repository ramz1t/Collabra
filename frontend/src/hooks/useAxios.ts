import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios'
import { useContext } from 'react'
import dayjs from 'dayjs'
import { jwtDecode, JwtPayload } from 'jwt-decode'
import AuthContext, { IAuthContext } from '../contexts/AuthContext'
import { useTranslation } from 'react-i18next'
import { error, success } from '../utils'
import { AuthTokens } from '../types'

const useAxios = () => {
    const { authTokens, setAuthTokens, logoutUser } = useContext(
        AuthContext
    ) as IAuthContext
    const { i18n, t } = useTranslation()

    const axiosInstance = axios.create({
        baseURL: import.meta.env.VITE_API_URL || '',
        headers: {
            Authorization: authTokens ? `Bearer ${authTokens?.access}` : null,
            'Accept-Language': i18n.resolvedLanguage,
        },
    })

    // @ts-ignore
    axiosInstance.interceptors.request.use(async (req) => {
        // Prevents unnecessary token updates when using a Mock server with hardcoded tokens
        if (import.meta.env.DEV) return req
        if (!authTokens) return req
        const user = jwtDecode(authTokens.access)
        const isExpired = dayjs.unix(user.exp || 0).diff(dayjs()) < 1

        if (!isExpired) return req
        const response = await fetch(
            `${import.meta.env.VITE_API_URL || ''}/api/v1/token/refresh/`,
            {
                method: 'POST',
                body: JSON.stringify({
                    refresh: authTokens.refresh,
                }),
            }
        )

        if (!response.ok) {
            error(t('session_expired'))
            logoutUser()
            return
        }

        const data = (await response.json()) as AuthTokens

        setAuthTokens({ ...authTokens, access: data.access })

        req.headers.Authorization = `Bearer ${data.access}`
        return req
    })

    axiosInstance.interceptors.response.use(
        (res) => {
            success(res.data?.message)
            return res
        },
        (err) => {
            if (err.response.data?.non_field_errors) {
                error(err.response.data?.non_field_errors.join('\n'))
            } else if (err.response.data?.detail) {
                error(err?.response.data?.detail)
            } else {
                error(err?.data?.message)
            }
            return Promise.reject(err)
        }
    )

    return axiosInstance
}

export default useAxios
