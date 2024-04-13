import { useTeamInvites, useUsersToInvite } from '../../../../api/invites.js'
import { Divider } from '../../../../components/index.js'
import { useTranslation } from 'react-i18next'
import Invitee from './Invitee.jsx'
import useDebounce from '../../../../hooks/useDebounce.js'
import { useContext } from 'react'
import TeamContext from '../../../../contexts/TeamContext.jsx'

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
    const debouncedInfo = useDebounce(searchInfo, 250)

    return (
        <div className="flex flex-col">
            <p className="font-semibold pb-1 pt-5 text-gray-600 dark:text-gray-400 text-sm">
                {debouncedInfo ? t('found_users') : t('invited_members')}
            </p>
            <Divider horizontal className="bg-gray-200" />
            <ul className="mt-3 grid lg:grid-cols-2 gap-3 max-h-[40dvh] overflow-y-auto">
                {isLoading ? (
                    t('fetching_invited_users')
                ) : !debouncedInfo ? (
                    invitesData.invited_people.map((user) => (
                        <Invitee
                            key={user.id}
                            user={user}
                            onSuccess={clearSearch}
                        />
                    ))
                ) : (
                    <FoundInvitees
                        clearSearch={clearSearch}
                        info={debouncedInfo}
                    />
                )}
            </ul>
            <Divider horizontal className="bg-gray-200 mt-3" />
        </div>
    )
}

export default InvitedUsersList
