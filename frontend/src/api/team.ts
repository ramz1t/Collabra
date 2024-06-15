import {
    InvalidateQueryFilters,
    QueryClient,
    useInfiniteQuery,
    useMutation,
    useQuery,
    useQueryClient,
} from '@tanstack/react-query'
import useAxios from '../hooks/useAxios'
import { useNavigate } from 'react-router-dom'
import { prefix } from './index'
import { AxiosResponse } from 'axios'
import { Member, PaginatedResponse, SearchParams, Team } from '../types'

const removeTeamFromCachedQueries = async (
    teamId: number,
    queryClient: QueryClient
): Promise<void> => {
    let data = queryClient.getQueryData<PaginatedResponse<Team>>([
        'teams',
        { name: null },
    ])
    if (!data) return

    let teamsList = data.results
    if (!teamsList) return

    await queryClient.invalidateQueries('teams' as InvalidateQueryFilters)
    teamsList = teamsList.filter((team) => team.id !== teamId)
    queryClient.setQueryData(['teams', { name: null }], teamsList)
}

const invalidateCachedTeam = async (
    teamSlug: string,
    queryClient: QueryClient
): Promise<void> => {
    await queryClient.invalidateQueries([
        'team',
        { slug: teamSlug },
    ] as InvalidateQueryFilters)
    await queryClient.invalidateQueries([
        'team-members',
        { slug: teamSlug },
    ] as InvalidateQueryFilters)
}

export const useCreateTeam = () => {
    const api = useAxios()
    const navigate = useNavigate()
    return useMutation({
        mutationFn: (
            data: Record<string, any>
        ): Promise<AxiosResponse<Team>> => {
            return api.post(`${prefix}/teams/`, data)
        },
        onSuccess: (res) => navigate(`/teams/${res.data.slug}/settings`),
    })
}

export const useTeams = (params: SearchParams) => {
    const api = useAxios()
    return useInfiniteQuery({
        queryKey: ['teams', params],
        queryFn: async ({ pageParam }): Promise<PaginatedResponse<Team>> => {
            const res = await api.get(`${prefix}/teams`, {
                params: { ...params, page: pageParam },
            })
            return res.data
        },
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            return lastPage.next !== null ? lastPage.page + 1 : null
        },
        select: (data) => ({
            teams: [...data.pages.flatMap((page) => page.results)],
        }),
    })
}

export const useTeam = (slug: string) => {
    const api = useAxios()
    return useQuery({
        queryKey: ['team', { slug: slug }],
        queryFn: async (): Promise<Team> => {
            const res = await api.get(`${prefix}/teams/${slug}`)
            return res.data
        },
    })
}

export const useUpdateTeam = (id: number) => {
    const api = useAxios()
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (
            data: Partial<Team>
        ): Promise<AxiosResponse<Team>> => {
            return await api.patch(`${prefix}/teams/${id}/`, data)
        },
        onSuccess: (res) => {
            queryClient.setQueryData(
                ['team', { slug: res.data.slug }],
                res.data
            )
        },
    })
}

export const useDeleteTeam = () => {
    const api = useAxios()
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data: {
            id: number
            password: string
        }): Promise<AxiosResponse<Team>> => {
            return api.delete(`${prefix}/teams/${data.id}/`, {
                data: {
                    password: data.password,
                },
            })
        },
        onSuccess: async (res) => {
            await removeTeamFromCachedQueries(res.data.id, queryClient)
            navigate('/teams')
        },
    })
}

export const useLeaveTeam = () => {
    const api = useAxios()
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data: { id: number; password: string }) => {
            return api.delete(`${prefix}/teams/${data.id}/exit/`, {
                data: {
                    password: data.password,
                },
            })
        },
        onSuccess: async (res) => {
            await removeTeamFromCachedQueries(res.data.id, queryClient)
            navigate('/teams')
        },
    })
}

export const useTransferOwnership = (teamSlug: string) => {
    const api = useAxios()
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data: {
            teamId: number
            user: number
            password: string
        }) => {
            return api.patch(`${prefix}/teams/${data.teamId}/transfer/`, {
                user: data.user,
                password: data.password,
            })
        },
        onSuccess: async () =>
            await invalidateCachedTeam(teamSlug, queryClient),
    })
}

export const useTeamMembers = (teamId: number, params: SearchParams) => {
    const api = useAxios()
    return useInfiniteQuery({
        queryKey: ['team-members', { teamId, ...params }],
        queryFn: async ({ pageParam }): Promise<PaginatedResponse<Member>> => {
            const response = await api.get(
                `${prefix}/teams/${teamId}/members`,
                {
                    params: { ...params, page: pageParam },
                }
            )
            return response.data
        },
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            return lastPage.next !== null ? lastPage.page + 1 : null
        },
        select: (data) => ({
            members: [...data.pages.flatMap((page) => page.results)],
        }),
    })
}

export const useDeleteMembers = (teamSlug: string) => {
    const api = useAxios()
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({
            teamId,
            memberIds,
        }: {
            teamId: number
            memberIds: number[]
        }) => {
            return api.delete(`${prefix}/teams/${teamId}/members/`, {
                data: {
                    ids: memberIds,
                },
            })
        },
        onSuccess: async () =>
            await invalidateCachedTeam(teamSlug, queryClient),
    })
}

export const useUpdateMember = (teamSlug: string) => {
    const api = useAxios()
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({
            teamId,
            memberId,
            data,
        }: {
            teamId: number
            memberId: number
            data: Partial<Member>
        }) => {
            return api.patch(
                `${prefix}/teams/${teamId}/members/${memberId}`,
                data
            )
        },
        onSuccess: async () =>
            await invalidateCachedTeam(teamSlug, queryClient),
    })
}
