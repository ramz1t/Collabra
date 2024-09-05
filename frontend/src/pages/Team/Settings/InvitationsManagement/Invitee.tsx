import { Avatar, Button } from '../../../../components'
import { IoRemoveOutline, IoAdd } from 'react-icons/io5'
import { useTranslation } from 'react-i18next'
import { useAddInvite, useRemoveInvite } from '../../../../api/invites'
import React, { useContext } from 'react'
import TeamContext, { ITeamContext } from '../../../../contexts/TeamContext'
import { Invitee as IInvitee } from '../../../../types'

interface InviteeProps {
    user: IInvitee
    onSuccess(): void
}

const Invitee = ({ user, onSuccess }: InviteeProps): React.ReactElement => {
    const { t } = useTranslation()
    const { team } = useContext(TeamContext) as ITeamContext
    const { mutate: addInvite } = useAddInvite(team!.id)
    const { mutate: removeInvite } = useRemoveInvite(user.id, team!.id)

    return (
        <li className="flex gap-3 items-center rounded-full border dark:border-slate-700 px-2.5 py-2 transition-all duration-75">
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

            {!user?.is_member &&
                (user?.is_invited ? (
                    <Button
                        className="text-slate-400 text-2xl hover:text-red-500 ml-auto min-h-10 min-w-10 hover:scale-105 rounded-full"
                        action={() =>
                            removeInvite(
                                { teamId: team!.id, userId: user.id },
                                { onSuccess: onSuccess }
                            )
                        }
                    >
                        <IoRemoveOutline />
                    </Button>
                ) : (
                    <Button
                        className="text-slate-400 text-2xl hover:text-green-600 ml-auto min-h-10 min-w-10 hover:scale-110 rounded-full"
                        action={() =>
                            addInvite(
                                { teamId: team!.id, userId: user.id },
                                { onSuccess: onSuccess }
                            )
                        }
                    >
                        <IoAdd />
                    </Button>
                ))}
        </li>
    )
}

export default Invitee
