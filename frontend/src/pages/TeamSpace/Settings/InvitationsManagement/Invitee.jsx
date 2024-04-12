import { Avatar, Button } from '../../../../components/index.js'
import { IoRemoveOutline, IoAdd } from 'react-icons/io5'
import { useTranslation } from 'react-i18next'

const Invitee = ({ user }) => {
    const { t } = useTranslation()
    return (
        <li className="flex gap-3 items-center rounded-full border dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-slate-700 px-1.5 py-1 transition-all duration-75">
            <Avatar user={user} />
            <div>
                <p className="leading-[1.1]">
                    {user.first_name} {user.last_name}
                </p>
                {user?.is_member ? (
                    <p className="text-xs text-green-600">
                        {t('already_in_team')}
                    </p>
                ) : user?.is_invited ? (
                    <p className="text-yellow-500 text-xs">
                        {t('user_invited')}
                    </p>
                ) : (
                    <p className="text-gray-600 dark:text-gray-400 text-xs">
                        {user?.username}
                    </p>
                )}
            </div>

            {!user?.is_member ? (
                user?.is_invited ? (
                    <Button className="text-gray-600 hover:text-red-500 ml-auto p-3 hover:scale-105 ">
                        <IoRemoveOutline />
                    </Button>
                ) : (
                    <Button className="text-gray-600 hover:text-green-600 ml-auto p-3 hover:scale-110">
                        <IoAdd />
                    </Button>
                )
            ) : null}
        </li>
    )
}

export default Invitee
