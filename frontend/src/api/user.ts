import { useContext } from 'react'
import useAxios from '../hooks/useAxios.js'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import AuthContext, { IAuthContext } from '../contexts/AuthContext'
import { prefix } from './index'
import { AxiosError, AxiosResponse } from 'axios'
import { User, ValidationErrors } from '../types'

export const useUser = (userId: string | number) => {
    const api = useAxios()
    return useQuery({
        queryKey: ['user', { userId: userId }],
        queryFn: async (): Promise<User> => {
            const res = await api.get(`${prefix}/users/${userId}`)
            return res.data
        },
    })
}

export const useDeleteUser = () => {
    const api = useAxios()
    const { logoutUser } = useContext(AuthContext) as IAuthContext
    return useMutation({
        mutationFn: async (data: { password: string }) => {
            await api.delete(`${prefix}/users/me/`, { data: data })
        },
        onSuccess: () => logoutUser(),
    })
}

export const useChangePassword = () => {
    const api = useAxios()
    return useMutation({
        mutationFn: async (data: {
            old_password: string
            new_password: string
        }) => {
            await api.patch(`${prefix}/users/me/change-password/`, data)
        },
    })
}

export const useUpdateUser = () => {
    const api = useAxios()
    const queryClient = useQueryClient()
    return useMutation<
        AxiosResponse<User>,
        AxiosError<ValidationErrors>,
        Partial<User>
    >({
        mutationFn: async (data) => {
            return await api.patch(`${prefix}/users/me/`, data)
        },
        onSuccess: (res) => {
            queryClient.setQueryData(['user', { userId: 'me' }], res.data)
        },
    })
}
