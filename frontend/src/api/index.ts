import { useQuery, UseQueryResult } from '@tanstack/react-query'
import useAxios from '../hooks/useAxios'

export const prefix: string = '/api/v1'

export const useCheckConnection = () => {
    const api = useAxios()
    return useQuery<boolean>({
        queryKey: ['connection'],
        queryFn: async () => {
            const res = await api.get(`${prefix}/smoke/`)
            return res.status === 200
        },
    })
}
