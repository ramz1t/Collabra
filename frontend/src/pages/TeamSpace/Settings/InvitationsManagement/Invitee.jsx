import { Avatar, Button } from '../../../../components/index.js'
import { IoRemoveOutline, IoAdd } from 'react-icons/io5'
import { useTranslation } from 'react-i18next'
import { useAddInvite, useRemoveInvite } from '../../../../api/invites.js'
import { useParams } from 'react-router-dom'
import { useContext } from 'react'
import TeamContext from '../../../../contexts/TeamContext.jsx'

const Invitee = ({ user, onSuccess = () => {} }) => {
    const { t } = useTranslation()
    const { teamSlug } = useParams()
    const { team } = useContext(TeamContext)
    const { mutate: addInvite } = useAddInvite(team.id)
    const { mutate: removeInvite } = useRemoveInvite(user.id, team.id)

    return (
        <li className="flex gap-3 items-center rounded-full border dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-700 px-2.5 py-2 transition-all duration-75">
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
                    <Button
                        className="text-gray-600 hover:text-red-500 ml-auto min-h-10 min-w-10 hover:scale-105 rounded-full"
                        action={() =>
                            removeInvite(
                                { teamId: team.id, userId: user.id },
                                { onSuccess: onSuccess }
                            )
                        }
                    >
                        <IoRemoveOutline />
                    </Button>
                ) : (
                    <Button
                        className="text-gray-600 hover:text-green-600 ml-auto min-h-10 min-w-10 hover:scale-110 rounded-full"
                        action={() =>
                            addInvite(
                                { teamId: team.id, userId: user.id },
                                { onSuccess: onSuccess }
                            )
                        }
                    >
                        <IoAdd />
                    </Button>
                )
            ) : null}
        </li>
    )
}

export default Invitee
