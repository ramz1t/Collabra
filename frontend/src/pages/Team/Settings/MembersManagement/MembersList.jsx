import React, { useContext, useState } from 'react'
import TeamContext from '../../../../contexts/TeamContext.jsx'
import { useDeleteMembers, useTeamMembers } from '../../../../api/team.js'
import useInput from '../../../../hooks/useInput.js'
import {
    Button,
    DialogWindow,
    LoadMoreMarker,
    SearchBar,
} from '../../../../components/index.js'
import { useTranslation } from 'react-i18next'
import MemberCell from './MemberCell.jsx'
import ListWithHeader from '../../../../components/ListWithHeader/index.jsx'
import cn from 'classnames'
import { IoTrashOutline } from 'react-icons/io5'
import { useParams } from 'react-router-dom'

const MembersList = () => {
    const { team } = useContext(TeamContext)
    const { teamSlug } = useParams()
    const { t } = useTranslation()
    const search = useInput('', {}, 250)
    const [selectedMembers, setSelectedMembers] = useState([])

    const {
        data,
        isLoading,
        hasNextPage,
        isFetchingNextPage,
        fetchNextPage,
        error,
    } = useTeamMembers(team.id, { email: search.value.trim() || null })
    const { mutateAsync: deleteMembers, isPending: isDeleting } =
        useDeleteMembers(teamSlug)
    const [deleteMembersDialogOpen, setDeleteMembersDialogOpen] =
        useState(false)

    const toggleMemberSelection = (memberId) => {
        if (!selectedMembers.includes(memberId)) {
            setSelectedMembers((prevState) => [...prevState, memberId])
        } else {
            setSelectedMembers((prevState) =>
                prevState.filter((id) => id !== memberId)
            )
        }
    }

    return (
        <div className="grid gap-3">
            <div className="relative min-h-10">
                <SearchBar
                    inputInstance={search}
                    placeholder={t('members_email')}
                    className={cn(
                        'absolute z-10 left-0 transition-all',
                        selectedMembers.length
                            ? 'bottom-full opacity-0 pointer-events-none'
                            : 'bottom-0 opacity-100'
                    )}
                />
                <div
                    className={cn(
                        'flex transition-all items-center',
                        selectedMembers.length ? 'opacity-100' : 'opacity-0'
                    )}
                >
                    <p className="font-semibold mr-auto">
                        {selectedMembers.length > 1
                            ? t('users_selected', {
                                  number: selectedMembers.length,
                              })
                            : t('user_selected')}
                    </p>
                    <Button
                        style="destructive"
                        action={() => setDeleteMembersDialogOpen(true)}
                    >
                        <IoTrashOutline />
                        {t('delete')}
                    </Button>
                    <DialogWindow
                        icon={<IoTrashOutline />}
                        title={t('delete_members_dialog_head')}
                        description={t('delete_members_dialog_desc')}
                        onSuccess={() =>
                            deleteMembers(
                                {
                                    teamId: team.id,
                                    memberIds: selectedMembers,
                                },
                                {
                                    onSuccess: () => setSelectedMembers([]),
                                }
                            )
                        }
                        successButtonText={t('delete')}
                        isLoading={isDeleting}
                        isOpen={deleteMembersDialogOpen}
                        close={() => setDeleteMembersDialogOpen(false)}
                        closeOnSuccess={true}
                    />
                </div>
            </div>
            {isLoading && t('loading')}
            {data && (
                <ListWithHeader cols={1} isLoading={isLoading}>
                    {data.pages.map((page, key) => (
                        <React.Fragment key={key}>
                            {page.results.map((member) => (
                                <MemberCell
                                    member={member}
                                    key={member.id}
                                    toggleMemberSelection={
                                        toggleMemberSelection
                                    }
                                    selected={selectedMembers.includes(
                                        member.id
                                    )}
                                />
                            ))}
                        </React.Fragment>
                    ))}
                    <LoadMoreMarker
                        hasNextPage={hasNextPage}
                        error={error}
                        fetch={fetchNextPage}
                        isFetching={isFetchingNextPage}
                    />
                </ListWithHeader>
            )}
        </div>
    )
}

export default MembersList
