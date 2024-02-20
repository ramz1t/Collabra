import axios from 'axios'
import { useContext } from 'react'
import dayjs from 'dayjs'
import { jwtDecode } from 'jwt-decode'
import AuthContext from '../contexts/AuthContext'
import { useTranslation } from 'react-i18next'
import toast from 'react-hot-toast'
import { error, success } from '../utils'

const useAxios = () => {
    const { authTokens, setUser, setAuthTokens, logoutUser } = useContext(AuthContext)
    const { i18n } = useTranslation()

    const axiosInstance = axios.create({
        baseURL: import.meta.env.VITE_API_URL || '',
        headers: {
            Authorization: authTokens ? `Bearer ${authTokens?.access}` : null,
            'Accept-Language': i18n.resolvedLanguage
        },
    })

    axiosInstance.interceptors.request.use(async (req) => {
        if (!authTokens) return req
        const user = jwtDecode(authTokens.access)
        const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1

        if (!isExpired) return req
        const response = await fetch(`/api/v1/token/refresh/`,
            {
                method: "POST"
            },
            {
                refresh: authTokens.refresh,
            })

        if (response.status === 401) {
            logoutUser()
            return
        }

        const data = await response.json()

        localStorage.setItem(
            'authTokens',
            JSON.stringify({
                access: data.access,
                refresh: authTokens.refresh,
            })
        )

        setAuthTokens({ ...authTokens, access: data.access })
        setUser(jwtDecode(data.access))

        req.headers.Authorization = `Bearer ${data.access}`
        return req
    })

    axiosInstance.interceptors.response.use(
        (res) => {
            success(res.data?.message)
            return res;
        },
        (err) => {
            error(err?.data?.message)
            return Promise.reject(err);
        }
    );

    return axiosInstance
}

export default useAxios
