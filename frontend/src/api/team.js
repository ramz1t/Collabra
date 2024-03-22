import { useMutation, useQuery } from '@tanstack/react-query'
import useAxios from '../hooks/useAxios.js'

const prefix = '/api/v1'

export const useCreateTeam = () => {
    const api = useAxios()
    return useMutation({
        mutationFn: (data) => {
            return api.post(`${prefix}/teams/`, data)
        },
    })
}

export const useTeams = (teamName) => {
    const api = useAxios()
    return useQuery({
        queryKey: ['teams', { teamName: teamName }],
        queryFn: () => {
            return api
                .get(`${prefix}/teams`, { params: { name: teamName } })
                .then((res) => res.data)
        },
    })
}
