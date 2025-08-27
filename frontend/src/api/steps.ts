import useAxios from '../hooks/useAxios'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { prefix } from './index'
import { Step } from '../types'

export const useSteps = (teamSlug: string, taskId: number) => {
    const api = useAxios()
    return useQuery<Step[]>({
        queryKey: ['steps', { team: teamSlug, task: taskId }],
        queryFn: async () => {
            const { data } = await api.get(
                `${prefix}/teams/${teamSlug}/tasks/${taskId}/steps/`
            )
            return data
        },
    })
}

export const useToggleStep = (teamSlug: string, taskId: number) => {
    const api = useAxios()
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (stepId: number) =>
            api.patch<{ value: boolean }>(
                `${prefix}/teams/${teamSlug}/tasks/${taskId}/steps/${stepId}/toggle/`
            ),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['steps', { team: teamSlug, task: taskId }],
            })
        },
    })
}
