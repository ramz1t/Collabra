import useAxios from '../hooks/useAxios'
import { useQuery } from '@tanstack/react-query'
import { Task } from '../types'
import { prefix } from './index'

export const useTasks = (teamSlug: string, status: string) => {
    const api = useAxios()
    return useQuery({
        queryKey: ['tasks', { teamSlug: teamSlug, status: status }],
        queryFn: async (): Promise<Task[]> => {
            const res = await api.get(`${prefix}/teams/${teamSlug}/tasks`, {
                params: { status: status },
            })
            return res.data
        },
    })
}
