import useAxios from '../hooks/useAxios'
import {
    InvalidateQueryFilters,
    useMutation,
    useQuery,
    useQueryClient,
} from '@tanstack/react-query'
import { Tag, Task } from '../types'
import { prefix } from './index'
import { AxiosResponse } from 'axios'
import { useNavigate } from 'react-router-dom'

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

export const useCreateTask = (teamSlug: string, status: string) => {
    const api = useAxios()
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data: Partial<Task>): Promise<AxiosResponse<Tag>> =>
            api.post(`${prefix}/teams/${teamSlug}/tasks/`, data),
        onSuccess: async (res) => {
            const queryKey = ['tasks', { teamSlug: teamSlug, status: status }]
            const queryData = queryClient.getQueryData<Tag[]>(queryKey)
            if (!queryData) return
            queryClient.setQueryData(queryKey, [res.data, ...queryData])
        },
    })
}

export const useUpdateTask = (teamSlug: string, taskId: number) => {
    const api = useAxios()
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data: Partial<Task>): Promise<AxiosResponse<Tag>> =>
            api.patch(`${prefix}/teams/${teamSlug}/tasks/${taskId}/`, data),
        onSuccess: async (res) => {
            queryClient.setQueryData(['task', { id: res.data.id }], res.data)
            await queryClient.invalidateQueries([
                'tasks',
                { teamSlug: teamSlug },
            ] as InvalidateQueryFilters)
        },
    })
}

export const useDeleteTasks = (teamSlug: string) => {
    const api = useAxios()
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    return useMutation({
        mutationFn: (data: Record<string, any>) =>
            api.delete(`${prefix}/teams/${teamSlug}/tasks/`, { data: data }),
        onSuccess: () => {
            queryClient.invalidateQueries('task' as InvalidateQueryFilters)
            queryClient.invalidateQueries('tasks' as InvalidateQueryFilters)
            navigate(`/teams/${teamSlug}/tasks`)
        },
    })
}

export const useToggleStep = (teamSlug: string, taskId: number) => {
    const api = useAxios()
    return useMutation({
        mutationFn: (stepId: number) =>
            api.post(
                `${prefix}/teams/${teamSlug}/tasks/${taskId}/steps/${stepId}/toggle/`
            ),
    })
}
