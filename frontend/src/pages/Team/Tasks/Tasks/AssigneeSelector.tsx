import { Member } from '../../../../types'
import React, { SetStateAction, useCallback, useContext, useState } from 'react'
import {
    Avatar,
    Button,
    ListWithHeader,
    LoadMoreMarker,
    SearchBar,
    SmoothContainer,
} from '../../../../components'
import { useTeamMembers } from '../../../../api/team'
import TeamContext, { ITeamContext } from '../../../../contexts/TeamContext'
import { useTranslation } from 'react-i18next'
import useInput from '../../../../hooks/useInput'
import cn from 'classnames'
import { TbArrowsDiagonalMinimize2 } from 'react-icons/tb'

interface AssigneeSelectorProps {
    assignee?: Member | null
    setAssignee: React.Dispatch<SetStateAction<Member | null>>
}

const AssigneeSelector = ({ assignee, setAssignee }: AssigneeSelectorProps) => {
    const { t } = useTranslation()
    const { team } = useContext(TeamContext) as ITeamContext
    const search = useInput('', {}, 100)
    const {
        data: members,
        isFetching,
        hasNextPage,
        fetchNextPage,
    } = useTeamMembers(team?.id!, { search: search.value.trim() })
    const [isOpen, setOpen] = useState(false)

    const handleClick = useCallback(
        (member: Member) => {
            setAssignee(member)
            setOpen(false)
        },
        [setOpen, setAssignee]
    )

    return (
        <div>
            <SmoothContainer isOpen={!isOpen}>
                {assignee ? (
                    <span className="flex gap-3">
                        <Avatar user={assignee.user} size="assigneeOption" />
                        {assignee.user.first_name} {assignee.user.last_name}
                        {assignee.status && ` (${assignee.status})`}
                        <Button
                            action={() => setOpen(true)}
                            className="text-accent dark:text-accent-dark hover:opacity-80 font-semibold inline ml-2"
                        >
                            {t('change')}
                        </Button>
                        <Button
                            style="tertiary"
                            action={() => setAssignee(null)}
                        >
                            {t('remove')}{' '}
                        </Button>
                    </span>
                ) : (
                    <Button
                        action={() => setOpen(true)}
                        className="text-accent dark:text-accent-dark font-semibold after:content-['*'] after:text-red-500 dark:after:text-red-700 after:-translate-x-2"
                    >
                        {t('select_assignee')}
                    </Button>
                )}
            </SmoothContainer>
            <SmoothContainer
                isOpen={isOpen}
                className={cn('grid gap-3 p-0.5', isOpen ? ' py-3' : 'py-0')}
            >
                <SearchBar
                    inputInstance={search}
                    placeholder={t('members_email_name_or_surname')}
                />
                <ListWithHeader
                    className="max-h-52"
                    innerClassName="!gap-4"
                    title={t('select_assignee')}
                    actions={
                        <Button
                            style="tertiary"
                            className="text-sm !gap-1.5 font-semibold"
                            action={() => setOpen(false)}
                        >
                            <TbArrowsDiagonalMinimize2 /> {t('close')}
                        </Button>
                    }
                    cols={1}
                    isEmpty={members?.length === 0}
                >
                    {members?.map((member) => (
                        <li key={member.id} className="flex items-center gap-2">
                            <Avatar user={member.user} size="task" />
                            <p>
                                {member.user.first_name} {member.user.last_name}{' '}
                            </p>
                            {member.status && (
                                <p className="text-sm font-semibold text-gray-500">
                                    ({member.status})
                                </p>
                            )}
                            <Button
                                className="ml-auto text-accent dark:text-accent-dark bg-gray-200 dark:bg-gray-800 font-semibold !rounded-full px-3"
                                action={() => handleClick(member)}
                            >
                                {member.id === assignee?.id
                                    ? t('selected')
                                    : t('select')}
                            </Button>
                        </li>
                    ))}
                    <LoadMoreMarker
                        isFetching={isFetching}
                        hasNextPage={hasNextPage}
                        fetch={fetchNextPage}
                    />
                </ListWithHeader>
            </SmoothContainer>
        </div>
    )
}

export default AssigneeSelector
