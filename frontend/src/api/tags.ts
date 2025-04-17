import useAxios from '../hooks/useAxios'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Tag } from '../types'
import { prefix } from './index'
import { AxiosResponse } from 'axios'

export const useTags = (teamSlug: string) => {
    const api = useAxios()
    return useQuery<Tag[]>({
        queryKey: ['tags', teamSlug],
        queryFn: async () => {
            const { data } = await api.get(`${prefix}/teams/${teamSlug}/tags`)
            return data
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
        onSuccess: ({ data: newTag }) => {
            const queryKey = ['tags', teamSlug]
            queryClient.setQueryData<Tag[]>(queryKey, (oldTags = []) => [
                ...oldTags,
                newTag,
            ])
        },
    })
}

export const useDeleteTag = (teamSlug: string) => {
    const api = useAxios()
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (tagId: number): Promise<AxiosResponse<{ id: number }>> =>
            api.delete(`${prefix}/teams/${teamSlug}/tags/${tagId}/`),
        onSuccess: (res) => {
            const queryKey = ['tags', teamSlug]
            queryClient.setQueryData<Tag[]>(queryKey, (oldTags = []) =>
                oldTags.filter((tag) => tag.id !== res.data.id)
            )
        },
    })
}

export const useEditTag = (teamSlug: string) => {
    const api = useAxios()
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (tagId: number): Promise<AxiosResponse<Tag>> =>
            api.patch(`${prefix}/teams/${teamSlug}/tags/${tagId}/`),
        onSuccess: (res) => {
            const updatedTag = res.data
            const queryKey = ['tags', { teamSlug }]
            queryClient.setQueryData<Tag[]>(queryKey, (oldTags) => {
                if (!oldTags) return
                return oldTags.map((tag) =>
                    tag.id === updatedTag.id ? updatedTag : tag
                )
            })
        },
    })
}
