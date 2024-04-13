import { useParams } from 'react-router-dom'
import { useTeamInvites, useUsersToInvite } from '../../../../api/invites.js'
import { Divider } from '../../../../components/index.js'
import { useTranslation } from 'react-i18next'
import Invitee from './Invitee.jsx'
import useDebounce from '../../../../hooks/useDebounce.js'

const FoundInvitees = ({ info, clearSearch }) => {
    const { teamSlug } = useParams()
    const { data: foundUsers } = useUsersToInvite(teamSlug, info)
    return foundUsers
        ? foundUsers?.map((user) => (
              <Invitee user={user} key={user.id} onSuccess={clearSearch} />
          ))
        : 'no users found: ' + info
}

const InvitedUsersList = ({ searchInfo, clearSearch }) => {
    const { teamSlug } = useParams()
    const { data: invitesData, isLoading } = useTeamInvites(teamSlug)
    const { t } = useTranslation()
    const debouncedInfo = useDebounce(searchInfo, 500)

    if (isLoading) return 'loading'

    return (
        <div className="flex flex-col">
            <p className="font-semibold pb-1 pt-5 text-gray-600 text-sm">
                {debouncedInfo ? t('found_users') : t('invited_members')}
            </p>
            <Divider horizontal className="bg-gray-200" />
            <ul className="mt-3 grid lg:grid-cols-2 gap-3 max-h-[40dvh] overflow-y-auto">
                {!debouncedInfo ? (
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
