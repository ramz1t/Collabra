import { useTranslation } from 'react-i18next'
import { IoCheckboxOutline, IoMailUnreadOutline } from 'react-icons/io5'
import { MembersAvatars } from '../../components'

const TeamStats = ({ team }) => {
    const { t } = useTranslation()

    return (
        <ul className="flex flex-col gap-2 pt-2 text-sm text-gray-600 dark:text-gray-400">
            <li className="flex items-center gap-1.5">
                <IoCheckboxOutline />
                {t('team_stats_tasks')} - 1
            </li>
            <li className="flex items-center gap-1.5">
                <IoMailUnreadOutline />
                {t('team_stats_messages')} - 12
            </li>
            <li className="flex items-center gap-1.5">
                <MembersAvatars members={team.members} />
                <p>{t('team_stats_users')} - 13</p>
            </li>
            {/*<li className="flex items-center gap-1.5">*/}
            {/*    <p className="text-red-500">*/}
            {/*        Next task deadline - Tomorrow 18PM*/}
            {/*    </p>*/}
            {/*</li>*/}
        </ul>
    )
}

export default TeamStats
