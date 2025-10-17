import useAxios from '../hooks/useAxios'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { prefix } from './index'
import { Invitee, TeamInvitesData, Team } from '../types'

export const useUsersToInvite = (teamId: number, info: string) => {
    const api = useAxios()
    return useQuery({
        queryKey: ['users-to-invite', { team: teamId, info: info }],
        queryFn: async () => {
            const res = await api.get<{ results: Invitee[] }>(
                `${prefix}/teams/${teamId}/get-users-to-invite/${info}/`
            )
            return res.data
        },
    })
}

export const useAddInvite = (teamId: number) => {
    const api = useAxios()
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data: { teamId: number; userId: number }) =>
            api.patch(`${prefix}/teams/${data.teamId}/invite/`, {
                user: data.userId,
            }),
        onSuccess: (res) => {
            const queryKey = ['team-invites', { team: teamId }]
            const queryData =
                queryClient.getQueryData<TeamInvitesData>(queryKey)
            queryClient.setQueryData(queryKey, {
                ...queryData,
                invited_people: [...queryData!.invited_people, res.data.user],
            })
        },
    })
}

export const useRemoveInvite = (removedInviteeId: number, teamId: number) => {
    const api = useAxios()
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data: { teamId: number; userId: number }) =>
            api.patch(`${prefix}/teams/${data.teamId}/remove-from-invited/`, {
                user: data.userId,
            }),
        onSuccess: () => {
            const queryKey = ['team-invites', { team: teamId }]
            const queryData =
                queryClient.getQueryData<TeamInvitesData>(queryKey)
            const filteredUsers = queryData!.invited_people.filter(
                (user) => user.id !== removedInviteeId
            )
            queryClient.setQueryData(queryKey, {
                ...queryData,
                invited_people: filteredUsers,
            })
        },
    })
}

export const useTeamInvites = (teamId: number) => {
    const api = useAxios()
    return useQuery({
        queryKey: ['team-invites', { team: teamId }],
        queryFn: async (): Promise<TeamInvitesData> => {
            const res = await api.get(
                `${prefix}/teams/${teamId}/get-join-keys/`
            )
            return res.data
        },
    })
}

export const useRefreshTeamKeys = (teamId: number) => {
    const api = useAxios()
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (teamId: number) =>
            api.patch(`${prefix}/teams/${teamId}/refresh-join-keys/`),
        onSuccess: () =>
            queryClient.refetchQueries({
                queryKey: ['team-invites', { teamId: teamId }],
            }),
    })
}

export const useJoinTeam = (teamSlug: string) => {
    const api = useAxios()
    const navigate = useNavigate()
    return useMutation({
        mutationFn: (data: { teamSlug: string; teamKey: string }) =>
            api.post(`${prefix}/teams/${data.teamSlug}/join/${data.teamKey}/`),
        onSuccess: () => navigate(`/teams/${teamSlug}`),
    })
}

export const useJoinInfo = (teamSlug: string) => {
    const api = useAxios()
    return useQuery({
        queryKey: ['join-info', { teamSlug: teamSlug }],
        queryFn: async (): Promise<Team> => {
            const res = await api.get(`${prefix}/teams/${teamSlug}/join-info/`)
            return res.data
        },
    })
}
