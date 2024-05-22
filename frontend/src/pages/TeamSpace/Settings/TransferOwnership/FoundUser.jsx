import { useTranslation } from 'react-i18next'
import { Avatar, Button, Spacer } from '../../../../components/index.js'

const FoundUser = ({ user, selectUser }) => {
    const { t } = useTranslation()

    return (
        <div className="p-2.5 flex items-center rounded-full border hover:bg-gray-50 gap-3">
            <Avatar user={user} />
            <div className="w-full">
                <p className="leading-[1.1] w-full">
                    {user.first_name} {user.last_name}
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-xs">
                    {user?.username}
                </p>
            </div>
            <Button
                className="px-2 ml-auto"
                style="tetriary"
                action={() => selectUser(user)}
            >
                {t('select')}
            </Button>
        </div>
    )
}

export default FoundUser
