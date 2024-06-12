import { useTeamInvites, useUsersToInvite } from '../../../../api/invites'
import { useTranslation } from 'react-i18next'
import Invitee from './Invitee'
import React, { useContext } from 'react'
import TeamContext, { ITeamContext } from '../../../../contexts/TeamContext'
import { ListWithHeader } from '../../../../components'

interface FoundInviteesProps {
    info: string
    clearSearch(): void
}

const FoundInvitees = ({
    info,
    clearSearch,
}: FoundInviteesProps): React.ReactNode => {
    const { team } = useContext(TeamContext) as ITeamContext
    const { data: foundUsers, isLoading } = useUsersToInvite(team!.id, info)
    const { t } = useTranslation()
    return isLoading
        ? t('loading')
        : foundUsers?.length
          ? foundUsers?.map((user) => (
                <Invitee user={user} key={user.id} onSuccess={clearSearch} />
            ))
          : t('no_users_found')
}

interface InvitedUsersListProps {
    searchInfo: string
    clearSearch(): void
}

const InvitedUsersList = ({
    searchInfo,
    clearSearch,
}: InvitedUsersListProps): React.ReactElement => {
    const { team } = useContext(TeamContext) as ITeamContext
    const { data: invitesData, isLoading } = useTeamInvites(team!.id)
    const { t } = useTranslation()

    return (
        <ListWithHeader
            isLoading={isLoading}
            title={searchInfo ? t('found_users') : t('invited_members')}
        >
            {!searchInfo ? (
                invitesData?.invited_people.length ? (
                    invitesData?.invited_people.map((user) => (
                        <Invitee
                            key={user.id}
                            user={user}
                            onSuccess={clearSearch}
                        />
                    ))
                ) : (
                    t('no_invited_users')
                )
            ) : (
                <FoundInvitees clearSearch={clearSearch} info={searchInfo} />
            )}
        </ListWithHeader>
    )
}

export default InvitedUsersList
