import {
    Avatar,
    Button,
    Checkbox,
    DialogWindow,
    Input,
    PasswordSubmit,
    PrivateComponent,
} from '../../../../components/index.js'
import { useTranslation } from 'react-i18next'
import { Link, useParams } from 'react-router-dom'
import { IoPencil, IoChevronForward } from 'react-icons/io5'
import { useContext, useState } from 'react'
import MemberCellInfo from './MemberCellInfo.jsx'
import useProfilePath from '../../../../hooks/useProfilePath.js'
import { UserRole } from '../../../../hooks/useIsAllowed.js'
import TeamContext from '../../../../contexts/TeamContext.jsx'
import {
    useDeleteMembers,
    useTransferOwnership,
    useUpdateMember,
} from '../../../../api/team.js'
import useInput from '../../../../hooks/useInput.js'

const MemberCell = ({ member }) => {
    const { t } = useTranslation()
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const profilePath = useProfilePath(member.user.id)
    const { team } = useContext(TeamContext)
    const { teamSlug } = useParams()
    const { mutate: transferOwnership, isPending: isTransfering } =
        useTransferOwnership(teamSlug)
    const { mutate: deleteMember, isPending: isDeleting } =
        useDeleteMembers(teamSlug)
    const { mutate: updateMember, isPending: isSaving } =
        useUpdateMember(teamSlug)
    const [isAdmin, setIsAdmin] = useState(member.is_admin)
    const memberUsername = useInput('')

    return (
        <div className="flex h-14 px-2 pr-3 pl-2.5  border dark:border-slate-700 items-center rounded-full gap-3 w-full flex-wrap ">
            <div className="flex gap-3 items-center mr-auto ">
                <Avatar user={member.user} />
                <Link to={profilePath} className="hover:underline">
                    <MemberCellInfo member={member} />
                </Link>
            </div>
            <Button
                style="tertiary"
                className="!min-h-8 !rounded-full max-md:!gap-1"
                action={() => setDeleteDialogOpen(true)}
            >
                {t('manage')}
                <IoChevronForward />
            </Button>
            <DialogWindow
                icon={<IoPencil />}
                title={`${member.user.first_name} ${member.user.last_name}`}
                isOpen={deleteDialogOpen}
                isLoading={isSaving}
                onSuccess={() =>
                    updateMember({
                        teamId: team.id,
                        memberId: member.id,
                        data: {
                            is_admin: isAdmin,
                        },
                    })
                }
                close={() => setDeleteDialogOpen(false)}
                successButtonStyle="primary"
                successButtonText={t('save')}
                extraActions={
                    <div className="pt-5 grid gap-5">
                        <Checkbox
                            id="admin"
                            text={t('is_admin')}
                            value={isAdmin}
                            setValue={setIsAdmin}
                        />
                        <Input
                            instance={memberUsername}
                            title={t('member_username')}
                            hint={t('member_username_hint')}
                        />
                        {!member.is_owner && member.is_admin && (
                            <PrivateComponent allowedRoles={[UserRole.OWNER]}>
                                <div>
                                    <p className="pl-1 pb-1">
                                        {t('transfer_ownership')}
                                    </p>
                                    <PasswordSubmit
                                        label={t('transfer_ownership')}
                                        actionText={t('transfer_ownership')}
                                        buttonText={t('transfer')}
                                        isLoading={isTransfering}
                                        submitFn={transferOwnership}
                                        submitData={{
                                            user: member.user.id,
                                            teamId: team.id,
                                        }}
                                    />
                                </div>
                            </PrivateComponent>
                        )}
                    </div>
                }
                extraButtons={
                    <Button
                        action={() =>
                            deleteMember({
                                teamId: team.id,
                                memberIds: [member.id],
                            })
                        }
                        style="destructive"
                        isLoading={isDeleting}
                    >
                        {t('delete')}
                    </Button>
                }
            />
        </div>
    )
}

export default MemberCell
