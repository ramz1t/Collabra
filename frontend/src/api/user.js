import { useContext } from "react"
import useAxios from "../hooks/useAxios"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import AuthContext from "../contexts/AuthContext"

const prefix = '/api/v1'

export const useUser = (userId) => {
    const api = useAxios()
    return useQuery({
        queryKey: ['users', { userId: userId }],
        queryFn: () => api.get(`${prefix}/users/${userId}`).then((res) => res.data)
    })
}

export const useDeleteUser = () => {
    const api = useAxios()
    const { logoutUser } = useContext(AuthContext)
    return useMutation({
        mutationFn: (data) => api.delete(`${prefix}/users/me/`, { data: data }),
        onSuccess: () => logoutUser()
    })
}

export const useChangePassword = () => {
    const api = useAxios()
    return useMutation({
        mutationFn: (data) => api.patch(`${prefix}/users/me/change-password/`, data)
    })
}

export const useUpdateUser = () => {
    const api = useAxios()
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data) => api.patch(`${prefix}/users/me/`, data),
        onSuccess: () => queryClient.invalidateQueries({
            queryKey: ['users', { userId: 'me' }]
        })
    })
}