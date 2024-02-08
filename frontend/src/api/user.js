import { useContext } from "react"
import useAxios from "../hooks/useAxios"
import { useMutation, useQuery } from "@tanstack/react-query"
import AuthContext from "../contexts/AuthContext"

const prefix = '/api/v1'

export const useUser = (userId) => {
    const api = useAxios()
    return useQuery({
        queryKey: ['user', userId],
        queryFn: () => api.get(`${prefix}/users/${userId}`).then((res) => res.data)
    })
}

export const useDeleteUser = () => {
    const api = useAxios()
    const { logoutUser } = useContext(AuthContext)
    return useMutation({
        mutationFn: (userId) => api.delete(`${prefix}/users/${userId}`),
        onSuccess: () => {
            logoutUser()
        }
    })
}