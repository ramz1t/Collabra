import useAxios from '../hooks/useAxios'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Tag, TeamInvitesData } from '../types'
import { prefix } from './index'
import { AxiosResponse } from 'axios'

export const useTags = (teamSlug: string) => {
    const api = useAxios()
    return useQuery({
        queryKey: ['tags', { teamSlug: teamSlug }],
        queryFn: async (): Promise<Tag[]> => {
            const res = await api.get(`${prefix}/teams/${teamSlug}/tags`)
            return res.data
        },
    })
}

export const useCreateTag = (teamSlug: string) => {
    const api = useAxios()
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data: {
            title: string
            color: string
        }): Promise<AxiosResponse<Tag>> =>
            api.post(`${prefix}/teams/${teamSlug}/tags/`, data),
        onSuccess: (res) => {
            const queryKey = ['tags', { teamSlug: teamSlug }]
            const queryData = queryClient.getQueryData<Tag[]>(queryKey)
            if (!queryData) return
            queryClient.setQueryData(queryKey, [...queryData, res.data])
        },
    })
}

export const useDeleteTag = (teamSlug: string, tagId: number) => {
    const api = useAxios()
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (tagId: number): Promise<AxiosResponse> =>
            api.delete(`${prefix}/teams/${teamSlug}/tags/${tagId}`),
        onSuccess: (res) => {
            const queryKey = ['tags', { teamSlug: teamSlug }]
            const queryData = queryClient.getQueryData<Tag[]>(queryKey)
            if (!queryData) return
            queryClient.setQueryData(
                queryKey,
                queryData.filter((tag) => tag.id !== tagId)
            )
        },
    })
}
