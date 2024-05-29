import {
    Avatar,
    Button,
    Dialog,
    PasswordSubmit,
} from '../../../../components/index.js'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { IoPencil, IoChevronForward } from 'react-icons/io5'
import { useContext, useState } from 'react'
import AuthContext from '../../../../contexts/AuthContext.jsx'

const MemberCell = ({ member }) => {
    const { t } = useTranslation()
    const { user } = useContext(AuthContext)
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

    return (
        <div className="flex lg:h-14 px-2 lg:pr-3 lg:pl-2.5 max-lg:py-2 border items-center rounded-lg lg:rounded-full gap-3 w-full flex-wrap max-lg:justify-end">
            <div className="flex gap-3 items-center mr-auto max-lg:w-full">
                <Avatar user={member.user} />
                <Link to={`/users/${member.id}`} className="hover:underline">
                    <span className="grid">
                        <span className="font-semibold">
                            {member.user.first_name} {member.user.last_name}
                            {member.is_owner && ` (${t('owner')})`}
                            {member.id === user.user_id && ` (${t('me')})`}
                        </span>
                        <span className="text-xs text-gray-600">
                            {member.user.username}
                        </span>
                    </span>
                </Link>
            </div>
            <Button
                style="tertiary"
                className="!min-h-8 !rounded-full"
                action={() => setDeleteDialogOpen(true)}
            >
                {t('manage')}
                <IoChevronForward />
            </Button>
            <Dialog
                icon={<IoPencil />}
                title={`${t('manage')} ${member.user.first_name}`}
                open={deleteDialogOpen}
                onAbort={() => setDeleteDialogOpen(false)}
                close={() => setDeleteDialogOpen(false)}
                onSuccess={() => {}}
                successButtonStyle="primary"
                successButtonText={t('save')}
                extraActions={
                    <div className="pt-2">
                        <p className="py-1 pl-1">{t('role')}</p>
                        <ul className="grid grid-cols-[1fr_1fr] gap-5 pb-5">
                            <li className="rounded-lg min-h-10 flex items-center group/role outline outline-0 outline-slate-400 has-[:checked]:outline-accent has-[:checked]:outline-2 bg-gray-50 px-3">
                                <input
                                    type="radio"
                                    name="role"
                                    className="mr-3 checked:!bg-accent checked:!border-accent"
                                    id="role-user"
                                ></input>
                                <label
                                    htmlFor="role-user"
                                    className="group-has-[:checked]/role:text-accent w-full h-full flex items-center"
                                >
                                    User
                                </label>
                            </li>
                            <li className="rounded-lg min-h-10 flex items-center group/role outline outline-0 outline-slate-400 has-[:checked]:outline-accent has-[:checked]:outline-2 bg-gray-50 px-3">
                                <input
                                    type="radio"
                                    name="role"
                                    className="mr-3 checked:!bg-accent checked:!border-accent"
                                    id="role-admin"
                                ></input>
                                <label
                                    htmlFor="role-admin"
                                    className="group-has-[:checked]/role:text-accent w-full h-full flex items-center"
                                >
                                    Admin
                                </label>
                            </li>
                        </ul>
                        <label className="pl-1">{t('remove_member')}</label>
                        <PasswordSubmit
                            actionText={t('remove_member')}
                            buttonText={t('remove')}
                        />
                    </div>
                }
            />
        </div>
    )
}

export default MemberCell
