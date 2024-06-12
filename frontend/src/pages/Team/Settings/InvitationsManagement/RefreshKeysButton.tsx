import { Button } from '../../../../components'
import { useTranslation } from 'react-i18next'
import { IoReload } from 'react-icons/io5'
import { useRefreshTeamKeys } from '../../../../api/invites'
import { useContext } from 'react'
import TeamContext, { ITeamContext } from '../../../../contexts/TeamContext'

const RefreshKeysButton = () => {
    const { t } = useTranslation()
    const { team } = useContext(TeamContext) as ITeamContext
    const { mutate: refreshKeys, isPending } = useRefreshTeamKeys(team!.id)

    return (
        <Button
            className="text-accent dark:text-accent-dark font-semibold text-lg flex items-center gap-3 transition-all w-fit"
            action={() => !isPending && refreshKeys(team!.id)}
        >
            <span className={isPending ? 'animate-spin duration-75' : ''}>
                <IoReload />
            </span>
            {isPending ? t('updating') : t('refresh_join_links')}
        </Button>
    )
}

export default RefreshKeysButton
