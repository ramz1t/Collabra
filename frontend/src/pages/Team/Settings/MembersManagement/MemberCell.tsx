import {
    Avatar,
    Button,
    Checkbox,
    DialogWindow,
    Input,
    PasswordSubmit,
    PrivateComponent,
} from '../../../../components'
import { useTranslation } from 'react-i18next'
import { Link, useParams } from 'react-router-dom'
import { IoChevronForward, IoCheckmark } from 'react-icons/io5'
import React, { memo, useContext, useState } from 'react'
import MemberCellInfo from './MemberCellInfo'
import useProfilePath from '../../../../hooks/useProfilePath'
import { UserRole } from '../../../../utils/constants'
import TeamContext, { ITeamContext } from '../../../../contexts/TeamContext'
import {
    useDeleteMembers,
    useTransferOwnership,
    useUpdateMember,
} from '../../../../api/team'
import useInput from '../../../../hooks/useInput'
import cn from 'classnames'
import AuthContext, { IAuthContext } from '../../../../contexts/AuthContext'
import { Member } from '../../../../types'
import { objectsDifference } from '../../../../utils'

export interface MemberCellProps {
    member: Member
    toggleMemberSelection(id: number): void
    selected: boolean
}

const MemberCell = ({
    member,
    toggleMemberSelection,
    selected,
}: MemberCellProps): React.ReactElement => {
    const { t } = useTranslation()
    const [dialogOpen, setDialogOpen] = useState<boolean>(false)
    const profilePath = useProfilePath(member.user.id)
    const { team } = useContext(TeamContext) as ITeamContext
    const { teamSlug } = useParams()
    const { mutate: transferOwnership, isPending: isTransfering } =
        useTransferOwnership(teamSlug!)
    const { mutateAsync: deleteMember, isPending: isDeleting } =
        useDeleteMembers(teamSlug!)
    const { mutate: updateMember, isPending: isSaving } = useUpdateMember(
        teamSlug!
    )
    const [isAdmin, setIsAdmin] = useState<boolean>(member.is_admin)
    const status = useInput(member.status || '')
    const { user } = useContext(AuthContext) as IAuthContext
    const selectable = !member.is_owner && member.user.id !== user!.user_id

    return (
        <div className="flex py-2 pr-3 pl-2.5 border dark:border-slate-700 items-center rounded-full gap-3 w-full">
            <span
                className={cn(
                    'rounded-full relative',
                    selectable
                        ? 'hover:cursor-pointer'
                        : 'hover:cursor-not-allowed'
                )}
                onClick={() => selectable && toggleMemberSelection(member.id)}
            >
                <div
                    className={cn(
                        'absolute size-9 bg-accent dark:bg-accent-dark rounded-full text-white flex items-center justify-center transition-all text-xl',
                        'left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
                        selected ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                    )}
                >
                    <IoCheckmark />
                </div>
                <Avatar user={member.user} />
            </span>
            <Link to={profilePath}>
                <MemberCellInfo member={member} />
            </Link>
            {(!member.is_owner || member.user.id === user!.user_id) && (
                <Button
                    style="tertiary"
                    className="!min-h-8 !rounded-full max-md:!gap-1 ml-auto"
                    action={() => setDialogOpen(true)}
                >
                    {t('manage')}
                    <IoChevronForward />
                </Button>
            )}
            <DialogWindow
                icon={<Avatar user={member.user} />}
                title={`${member.user.first_name} ${member.user.last_name}`}
                isOpen={dialogOpen}
                isLoading={isSaving}
                onSuccess={() =>
                    updateMember({
                        teamId: team!.id,
                        memberId: member.id,
                        data: objectsDifference(
                            {
                                is_admin: member.is_admin,
                                status: member.status,
                            },
                            {
                                is_admin: isAdmin,
                                status: status.value.trim().length
                                    ? status.value.trim()
                                    : null,
                            }
                        ),
                    })
                }
                disabled={
                    (status.value.trim() || null) === member.status &&
                    isAdmin === member.is_admin
                }
                close={() => setDialogOpen(false)}
                successButtonStyle="primary"
                successButtonText={t('save')}
                closeButtonText={t('close')}
                extraButtons={
                    !member.is_owner && user!.user_id !== member.user.id ? (
                        <Button
                            action={() =>
                                deleteMember({
                                    teamId: team!.id,
                                    memberIds: [member.id],
                                }).then(() => setDialogOpen(false))
                            }
                            style="destructive"
                            isLoading={isDeleting}
                        >
                            {t('delete')}
                        </Button>
                    ) : null
                }
            >
                <div className="pt-4 md:pt-2 grid gap-5">
                    {!member.is_owner && member.user.id !== user!.user_id && (
                        <Checkbox
                            text={t('is_admin')}
                            value={isAdmin}
                            setValue={setIsAdmin}
                        />
                    )}
                    <Input
                        instance={status}
                        title={t('member_status')}
                        hint={t('member_status_hint')}
                    />
                    {!member.is_owner && member.is_admin && (
                        <PrivateComponent allowedRoles={[UserRole.OWNER]}>
                            <div>
                                <p className="pl-1 pb-1">
                                    {t('transfer_ownership')}
                                </p>
                                <PasswordSubmit
                                    actionText={t('transfer_ownership')}
                                    buttonText={t('transfer')}
                                    isLoading={isTransfering}
                                    submitFn={transferOwnership}
                                    submitData={{
                                        user: member.user.id,
                                        teamId: team!.id,
                                    }}
                                    options={{
                                        onSuccess: () => setDialogOpen(false),
                                    }}
                                />
                            </div>
                        </PrivateComponent>
                    )}
                </div>
            </DialogWindow>
        </div>
    )
}

export default memo(MemberCell)
