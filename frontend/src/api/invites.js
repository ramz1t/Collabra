import useAxios from '../hooks/useAxios.js'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

const prefix = '/api/v1'

export const useUsersToInvite = (teamId, info) => {
    const api = useAxios()
    return useQuery({
        queryKey: ['users-to-invite', { team: teamId, info: info }],
        queryFn: () => {
            return api
                .get(`${prefix}/teams/${teamId}/get-users-to-invite/${info}`)
                .then((res) => res.data)
        },
    })
}

export const useAddInvite = (teamId) => {
    const api = useAxios()
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data) =>
            api.patch(`${prefix}/teams/${data.teamId}/invite/`, {
                user: data.userId,
            }),
        onSuccess: (res) => {
            const queryKey = ['team-invites', { team: teamId }]
            const queryData = queryClient.getQueryData(queryKey)
            queryClient.setQueryData(queryKey, {
                ...queryData,
                invited_people: [...queryData.invited_people, res.data.user],
            })
        },
    })
}

export const useRemoveInvite = (removedInviteeId, teamId) => {
    const api = useAxios()
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data) =>
            api.patch(`${prefix}/teams/${data.teamId}/remove-from-invited/`, {
                user: data.userId,
            }),
        onSuccess: () => {
            const queryKey = ['team-invites', { team: teamId }]
            const queryData = queryClient.getQueryData(queryKey)
            const filteredUsers = queryData.invited_people.filter(
                (user) => user.id !== removedInviteeId
            )
            queryClient.setQueryData(queryKey, {
                ...queryData,
                invited_people: filteredUsers,
            })
        },
    })
}

export const useTeamInvites = (teamId) => {
    const api = useAxios()
    return useQuery({
        queryKey: ['team-invites', { team: teamId }],
        queryFn: () => {
            return api
                .get(`${prefix}/teams/${teamId}/get-join-keys`)
                .then((res) => res.data)
        },
    })
}

export const useRefreshTeamKeys = (teamId) => {
    const api = useAxios()
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (teamId) =>
            api.patch(`${prefix}/teams/${teamId}/refresh-join-keys/`),
        onSuccess: () =>
            queryClient.refetchQueries({
                queryKey: ['team-invites', { teamId: teamId }],
            }),
    })
}

export const useJoinTeam = (teamSlug) => {
    const api = useAxios()
    const navigate = useNavigate()
    return useMutation({
        mutationFn: (data) =>
            api.post(`${prefix}/teams/${data.teamSlug}/join/${data.teamKey}/`),
        onSuccess: (res) => navigate(`/teams/${teamSlug}`),
    })
}

export const useJoinInfo = (teamSlug) => {
    const api = useAxios()
    return useQuery({
        queryKey: ['join-info', { teamSlug: teamSlug }],
        queryFn: () => {
            return api
                .get(`${prefix}/teams/${teamSlug}/join-info`)
                .then((res) => res.data)
        },
    })
}
