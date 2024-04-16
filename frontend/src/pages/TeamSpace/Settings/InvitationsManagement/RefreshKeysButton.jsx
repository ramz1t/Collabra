import { Button } from '../../../../components/index.js'
import { useTranslation } from 'react-i18next'
import { IoReload } from 'react-icons/io5'
import { useRefreshTeamKeys } from '../../../../api/invites.js'
import { useContext } from 'react'
import TeamContext from '../../../../contexts/TeamContext.jsx'

const RefreshKeysButton = () => {
    const { t } = useTranslation()
    const { team } = useContext(TeamContext)
    const { mutate: refreshKeys, isPending: updating } = useRefreshTeamKeys()

    return (
        <Button
            className="text-accent dark:text-accent-dark font-semibold text-lg flex items-center gap-3 transition-all w-fit"
            action={() => refreshKeys(team.id)}
        >
            <span className={updating ? 'animate-spin duration-75' : ''}>
                <IoReload />
            </span>

            {updating ? t('updating') : t('refresh_join_links')}
        </Button>
    )
}

export default RefreshKeysButton
