import { useContext } from "react"
import useAxios from "../hooks/useAxios"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import AuthContext from "../contexts/AuthContext"

const prefix = '/api/v1'

export const useUser = (userId) => {
    const api = useAxios()
    return useQuery({
        queryKey: ['user', { userId: userId }],
        queryFn: () => api.get(`${prefix}/users/${userId}`).then((res) => res.data)
    })
}

export const useDeleteUser = () => {
    const api = useAxios()
    const { logoutUser } = useContext(AuthContext)
    return useMutation({
        mutationFn: (userId) => api.delete(`${prefix}/users/${userId}/`),
        onSuccess: () => {
            logoutUser()
        }
    })
}

export const useChangePassword = () => {
    const api = useAxios()
    return useMutation({
        mutationFn: (data) => api.post(`${prefix}/users/set_password/`, data)
    })
}

export const useUpdateUser = () => {
    const api = useAxios()
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data) => api.patch(`${prefix}/users/${data.userId}/`, data.updates),
        onSuccess: () => queryClient.invalidateQueries({
            queryKey: ['users', { userId: 'me' }]
        })
    })
}