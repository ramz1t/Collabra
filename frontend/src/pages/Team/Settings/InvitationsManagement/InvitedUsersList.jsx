import { useTeamInvites, useUsersToInvite } from '../../../../api/invites.js'
import { Divider } from '../../../../components/index.js'
import { useTranslation } from 'react-i18next'
import Invitee from './Invitee.jsx'
import useDebounce from '../../../../hooks/useDebounce.js'
import { useContext } from 'react'
import TeamContext from '../../../../contexts/TeamContext.jsx'
import ListWithHeader from '../../../../components/ListWithHeader/index.jsx'

const FoundInvitees = ({ info, clearSearch }) => {
    const { team } = useContext(TeamContext)
    const { data: foundUsers, isLoading } = useUsersToInvite(team.id, info)
    const { t } = useTranslation()
    return isLoading
        ? t('loading_users')
        : foundUsers?.length
          ? foundUsers?.map((user) => (
                <Invitee user={user} key={user.id} onSuccess={clearSearch} />
            ))
          : t('no_users_found')
}

const InvitedUsersList = ({ searchInfo, clearSearch }) => {
    const { team } = useContext(TeamContext)
    const { data: invitesData, isLoading } = useTeamInvites(team.id)
    const { t } = useTranslation()

    return (
        <ListWithHeader
            isLoading={isLoading}
            title={searchInfo ? t('found_users') : t('invited_members')}
            loadingState={t('fetching_invited_users')}
            emptyState={t('no_invited_users')}
            isEmpty={!invitesData?.invited_people?.length}
        >
            {!searchInfo ? (
                invitesData?.invited_people.map((user) => (
                    <Invitee
                        key={user.id}
                        user={user}
                        onSuccess={clearSearch}
                    />
                ))
            ) : (
                <FoundInvitees clearSearch={clearSearch} info={searchInfo} />
            )}
        </ListWithHeader>
    )
}

export default InvitedUsersList
