import useAxios from '../hooks/useAxios'
import {
    InfiniteData,
    InvalidateQueryFilters,
    QueryClient,
    useInfiniteQuery,
    useMutation,
    useQuery,
    useQueryClient,
} from '@tanstack/react-query'
import { PaginatedResponse, Task } from '../types'
import { prefix } from './index'
import { AxiosResponse } from 'axios'
import { useNavigate } from 'react-router-dom'
import qs from 'qs'

export const invalidateTasks = async (queryClient: QueryClient) => {
    await queryClient.invalidateQueries({
        queryKey: ['tasks'],
    } as InvalidateQueryFilters)
}

export const invalidateTeamStats = async (
    teamSlug: string,
    queryClient: QueryClient
) => {
    await queryClient.invalidateQueries({
        queryKey: ['teamStats', { teamSlug }],
    })
}

export const useTasks = (teamSlug: string, params?: Record<string, any>) => {
    const api = useAxios()
    return useInfiniteQuery({
        queryKey: ['tasks', { teamSlug, ...params }],
        queryFn: async ({ pageParam }): Promise<PaginatedResponse<Task>> => {
            const response = await api.get(
                `${prefix}/teams/${teamSlug}/tasks/`,
                {
                    params: { ...params, page: pageParam },
                    paramsSerializer: (params) =>
                        qs.stringify(params, {
                            arrayFormat: 'repeat',
                            skipNulls: false,
                            strictNullHandling: true,
                        }),
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

export const useCreateTask = (
    teamSlug: string,
    status: string,
    withForceReload: boolean
) => {
    const api = useAxios()
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: Partial<Task>): Promise<AxiosResponse<Task>> => {
            return api.post(`${prefix}/teams/${teamSlug}/tasks/`, data)
        },
        onSuccess: async (res) => {
            const columnOrdering = JSON.parse(
                localStorage.getItem(`collabra_${res.data.status}_orderBy`)!
            )
            const queryKey = [
                'tasks',
                { teamSlug, status, ordering: columnOrdering },
            ]
            const previousData =
                queryClient.getQueryData<InfiniteData<PaginatedResponse<Task>>>(
                    queryKey
                )

            // Data update for board view
            if (previousData) {
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
            }

            // Data update for list view
            if (withForceReload) await invalidateTasks(queryClient)

            await invalidateTeamStats(teamSlug, queryClient)
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

            await invalidateTeamStats(teamSlug, queryClient)
            await invalidateTasks(queryClient)
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
        onSuccess: async () => {
            await queryClient.invalidateQueries(
                'task' as InvalidateQueryFilters
            )
            await invalidateTeamStats(teamSlug, queryClient)
            await invalidateTasks(queryClient)

            navigate(`/teams/${teamSlug}/tasks`)
        },
    })
}
