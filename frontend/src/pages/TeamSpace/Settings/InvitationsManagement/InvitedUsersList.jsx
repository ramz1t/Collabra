import { useParams } from 'react-router-dom'
import { useTeamInvites } from '../../../../api/invites.js'
import { Divider } from '../../../../components/index.js'
import { useTranslation } from 'react-i18next'
import Invitee from './Invitee.jsx'

const InvitedUsersList = ({ searchInfo }) => {
    const { teamSlug } = useParams()
    const { data: invitesData, isLoading } = useTeamInvites(teamSlug)
    const { t } = useTranslation()

    if (isLoading) return 'loading'

    return (
        <div className="flex flex-col">
            <p className="font-semibold pb-1 pt-5 text-gray-600 text-sm">
                {searchInfo ? t('found_users') : t('invited_members')}
            </p>
            <Divider horizontal className="bg-gray-200" />
            <ul className="mt-3 grid lg:grid-cols-2 gap-3 max-h-[40dvh] overflow-y-auto">
                {invitesData.invited_people.map((user, key) => (
                    <Invitee key={key} user={user} />
                ))}
            </ul>
            <Divider horizontal className="bg-gray-200 mt-3" />
        </div>
    )
}

export default InvitedUsersList
