import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import useAxios from '../hooks/useAxios.js'
import { useNavigate } from 'react-router-dom'

const prefix = '/api/v1'

export const useCreateTeam = () => {
    const api = useAxios()
    const navigate = useNavigate()
    return useMutation({
        mutationFn: (data) => {
            return api.post(`${prefix}/teams/`, data)
        },
        onSuccess: (res) => navigate(`/teams/${res.data.slug}/settings`),
    })
}

export const useTeams = (params) => {
    const api = useAxios()
    return useQuery({
        queryKey: ['teams', params],
        queryFn: () => {
            return api
                .get(`${prefix}/teams`, { params: params })
                .then((res) => res.data)
        },
    })
}

export const useTeam = (slug) => {
    const api = useAxios()
    return useQuery({
        queryKey: ['team', { slug: slug }],
        queryFn: () => {
            return api.get(`${prefix}/teams/${slug}`).then((res) => res.data)
        },
    })
}

export const useUpdateTeam = (slug, id) => {
    const api = useAxios()
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data) => {
            return api.patch(`${prefix}/teams/${id}/`, data).then((res) => res)
        },
        onSuccess: (res) => {
            console.log(res)
            queryClient.setQueryData(
                ['team', { slug: res.data.slug }],
                res.data
            )
        },
    })
}

export const useDeleteTeam = () => {
    const api = useAxios()
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data) => {
            return api.delete(`${prefix}/teams/${data.id}`, {
                data: {
                    password: data.password,
                },
            })
        },
        onSuccess: async (res) => {
            let teamsList = queryClient.getQueryData(['teams', { name: null }])
            if (teamsList) {
                await queryClient.invalidateQueries('teams')
                teamsList = teamsList.filter((el) => el.id !== res.data.id)
                queryClient.setQueryData(['teams', { name: null }], teamsList)
            }
            navigate('/teams')
        },
    })
}

export const useLeaveTeam = () => {
    const api = useAxios()
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data) => {
            return api.delete(`${prefix}/teams/${data.id}/exit/`, {
                data: {
                    password: data.password,
                },
            })
        },
        onSuccess: async (res) => {
            let teamsList = queryClient.getQueryData(['teams', { name: null }])
            if (teamsList) {
                await queryClient.invalidateQueries('teams')
                teamsList = teamsList.filter((el) => el.id !== res.data.id)
                queryClient.setQueryData(['teams', { name: null }], teamsList)
            }
            navigate('/teams')
        },
    })
}
