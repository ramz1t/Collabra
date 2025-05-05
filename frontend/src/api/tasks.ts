import useAxios from '../hooks/useAxios'
import {
    InfiniteData,
    InvalidateQueryFilters,
    useInfiniteQuery,
    useMutation,
    useQuery,
    useQueryClient,
} from '@tanstack/react-query'
import { Member, PaginatedResponse, SearchParams, Tag, Task } from '../types'
import { prefix } from './index'
import { AxiosResponse } from 'axios'
import { useNavigate } from 'react-router-dom'

export const useTasks = (teamSlug: string, params?: Record<string, any>) => {
    const api = useAxios()
    return useInfiniteQuery({
        queryKey: ['tasks', { teamSlug, ...params }],
        queryFn: async ({ pageParam }): Promise<PaginatedResponse<Task>> => {
            const response = await api.get(
                `${prefix}/teams/${teamSlug}/tasks/`,
                {
                    params: { ...params, page: pageParam },
                }
            )
            return response.data
        },
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            return lastPage.next !== null ? lastPage.current_page + 1 : null
        },
        select: (data) => [...data.pages.flatMap((page) => page.results)],
    })
}

export const useTask = (teamSlug: string, taskId: number) => {
    const api = useAxios()
    return useQuery({
        queryKey: ['task', { id: taskId }],
        queryFn: async (): Promise<Task> => {
            const { data } = await api.get(
                `${prefix}/teams/${teamSlug}/tasks/${taskId}/`
            )
            return data
        },
    })
}

export const useCreateTask = (teamSlug: string, status: string) => {
    const api = useAxios()
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: Partial<Task>): Promise<AxiosResponse<Task>> => {
            return api.post(`${prefix}/teams/${teamSlug}/tasks/`, data)
        },
        onSuccess: (res) => {
            const queryKey = ['tasks', { teamSlug, status }]
            const previousData =
                queryClient.getQueryData<InfiniteData<PaginatedResponse<Task>>>(
                    queryKey
                )

            if (!previousData) return

            const updatedPages = [...previousData.pages]
            const lastPageIndex = updatedPages.length - 1

            updatedPages[lastPageIndex] = {
                ...updatedPages[lastPageIndex],
                results: [res.data, ...updatedPages[lastPageIndex].results],
            }

            queryClient.setQueryData(queryKey, {
                ...previousData,
                pages: updatedPages,
            })
        },
    })
}

export const useUpdateTask = (teamSlug: string, taskId: number) => {
    const api = useAxios()
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: Partial<Task>): Promise<AxiosResponse<Task>> =>
            api.patch(`${prefix}/teams/${teamSlug}/tasks/${taskId}/`, data),
        onSuccess: async (res) => {
            const updatedTask = res.data

            queryClient.setQueryData(
                ['task', { id: updatedTask.id }],
                updatedTask
            )

            await queryClient.invalidateQueries({
                queryKey: ['tasks', { teamSlug }],
            } as InvalidateQueryFilters)
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
            api.patch(
                `${prefix}/teams/${teamSlug}/tasks/${taskId}/steps/${stepId}/toggle/`
            ),
    })
}
