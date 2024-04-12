import { Button } from '../../../../components/index.js'
import { useTranslation } from 'react-i18next'
import { IoReload, IoClipboardOutline } from 'react-icons/io5'
import { useParams } from 'react-router-dom'
import { useRefreshTeamKeys, useTeamInvites } from '../../../../api/invites.js'
import { success } from '../../../../utils/index.jsx'

const TeamJoinLinks = () => {
    const { t } = useTranslation()
    const { teamSlug } = useParams()
    const { data: teamInvitesData, isLoading } = useTeamInvites(teamSlug)
    const { mutate: refreshKeys, isPending: updating } = useRefreshTeamKeys()

    return (
        <div className="flex flex-col gap-2">
            <Button
                className="text-accent hover:text-accent/80 dark:text-accent-dark dark:hover:text-accent-dark/80 font-semibold text-lg flex items-center gap-3 transition-all w-fit"
                action={() => refreshKeys(teamSlug)}
            >
                <span className={updating ? 'animate-spin duration-75' : ''}>
                    <IoReload />
                </span>

                {updating ? t('updating') : t('refresh_join_links')}
            </Button>
        </div>
    )
}

export default TeamJoinLinks
