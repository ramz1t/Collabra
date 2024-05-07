import { useTranslation } from 'react-i18next'
import { Avatar, Button, Spacer } from '../../../../components/index.js'
import { useTeamMember } from '../../../../api/team.js'
import { useContext } from 'react'
import TeamContext from '../../../../contexts/TeamContext.jsx'

const FoundUser = ({ info, selectUser }) => {
    const { t } = useTranslation()
    const { team } = useContext(TeamContext)
    const { data: user, isLoading } = useTeamMember(team.id, info)

    if (isLoading) return t('loading')
    if (!user) return t('no_user_found')

    return (
        <div className="p-2.5 flex items-center rounded-full border hover:bg-gray-50 gap-3 md:w-fit">
            <Avatar user={user} />
            <div>
                <p className="leading-[1.1]">
                    {user.first_name} {user.last_name}
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-xs">
                    {user?.username}
                </p>
            </div>
            <Spacer />
            <Button
                className="px-2"
                style="tetriary"
                action={() => selectUser(user)}
            >
                {t('select')}
            </Button>
        </div>
    )
}

export default FoundUser
