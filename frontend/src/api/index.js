import { useQuery } from '@tanstack/react-query'
import useAxios from '../hooks/useAxios.js'

export const prefix = '/api/v1'

export const useCheckConnection = () => {
    const api = useAxios()
    return useQuery({
        queryKey: ['connection'],
        queryFn: () => {
            return api.get(`${prefix}/connection`).then((res) => res.data)
        },
    })
}
