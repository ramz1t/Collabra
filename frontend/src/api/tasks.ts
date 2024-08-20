import useAxios from '../hooks/useAxios'
import { useQuery } from '@tanstack/react-query'
import { Task } from '../types'
import { prefix } from './index'

export const useTasks = (teamSlug: string, params?: Record<string, any>) => {
    const api = useAxios()
    return useQuery({
        queryKey: ['tasks', { teamSlug: teamSlug, ...params }],
        queryFn: async (): Promise<Task[]> => {
            const res = await api.get(`${prefix}/teams/${teamSlug}/tasks`, {
                params: params,
            })
            return res.data
        },
    })
}

export const useTask = (teamSlug: string, taskId: number) => {
    const api = useAxios()
    return useQuery({
        queryKey: ['task', { id: taskId }],
        queryFn: async (): Promise<Task> => {
            const res = await api.get(
                `${prefix}/teams/${teamSlug}/tasks/${taskId}`
            )
            return res.data
        },
    })
}
