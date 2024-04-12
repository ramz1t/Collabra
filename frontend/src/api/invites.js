import useAxios from '../hooks/useAxios.js'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

const prefix = '/api/v1'

export const useUsersToInvite = (teamSlug, info) => {
    const api = useAxios()
    return useQuery({
        queryKey: ['users-to-invite', { team: teamSlug, info: info }],
        queryFn: api
            .get(`${prefix}/teams/${teamSlug}/get-users-to-invite/${info}`)
            .then((res) => res.data),
    })
}

export const useAddInvite = () => {
    const api = useAxios()
    return useMutation({
        mutationFn: (data) =>
            api.patch(`${prefix}/teams/${data.teamId}/invite/`, {
                user: data.userId,
            }),
        onSuccess: () => {},
    })
}

export const useRemoveInvite = () => {
    const api = useAxios()
    return useMutation({
        mutationFn: (data) =>
            api.patch(`${prefix}/teams/${data.teamId}/remove-from-invited/`, {
                user: data.userId,
            }),
        onSuccess: () => {},
    })
}

export const useTeamInvites = (teamSlug) => {
    const api = useAxios()
    return useQuery({
        queryKey: ['team-invites', { slug: teamSlug }],
        queryFn: () => {
            return api
                .get(`${prefix}/teams/${teamSlug}/get-join-keys`)
                .then((res) => res.data)
        },
    })
}

export const useRefreshTeamKeys = () => {
    const api = useAxios()
    return useMutation({
        mutationFn: (teamId) =>
            api.patch(`${prefix}/teams/${teamId}/refresh-join-keys/`),
    })
}

export const useJoinTeam = () => {
    const api = useAxios()
    const navigate = useNavigate()
    return useMutation({
        mutationFn: (data) =>
            api.post(`${prefix}/teams/${data.teamSlug}/join/${data.teamKey}/`),
        onSuccess: (res) => navigate(`/teams/${res.data.slug}`),
    })
}
