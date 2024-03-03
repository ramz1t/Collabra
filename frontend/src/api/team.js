import { useMutation } from '@tanstack/react-query'
import useAxios from '../hooks/useAxios.js'

const prefix = '/api/v1'

export const useCreateTeam = () => {
    const api = useAxios()
    return useMutation({
        mutationFn: (data) => {
            api.post(`${prefix}/teams/`, data)
        },
    })
}
