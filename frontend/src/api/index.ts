import { useQuery, UseQueryResult } from '@tanstack/react-query'
import useAxios from '../hooks/useAxios'

export const prefix: string = '/api/v1'

export const useCheckConnection = () => {
    const api = useAxios()
    return useQuery({
        queryKey: ['connection'],
        queryFn: async (): Promise<boolean> => {
            const res = await api.get(`${prefix}/smoke`)
            return res.data
        },
    })
}
