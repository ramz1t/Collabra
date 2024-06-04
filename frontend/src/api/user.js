import { useContext } from 'react'
import useAxios from '../hooks/useAxios'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import AuthContext from '../contexts/AuthContext'
import { prefix } from './index.js'

export const useUser = (userId) => {
    const api = useAxios()
    return useQuery({
        queryKey: ['user', { userId: userId }],
        queryFn: () => {
            return api.get(`${prefix}/users/${userId}`).then((res) => res.data)
        },
    })
}

export const useDeleteUser = () => {
    const api = useAxios()
    const { logoutUser } = useContext(AuthContext)
    return useMutation({
        mutationFn: async (data) => {
            await api.delete(`${prefix}/users/me/`, { data: data })
        },
        onSuccess: () => logoutUser(),
    })
}

export const useChangePassword = () => {
    const api = useAxios()
    return useMutation({
        mutationFn: async (data) => {
            await api.patch(`${prefix}/users/me/change-password/`, data)
        },
    })
}

export const useUpdateUser = () => {
    const api = useAxios()
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data) => {
            return api.patch(`${prefix}/users/me/`, data).then((res) => res)
        },
        onSuccess: (res) => {
            queryClient.setQueryData(['user', { userId: 'me' }], res.data)
        },
    })
}
