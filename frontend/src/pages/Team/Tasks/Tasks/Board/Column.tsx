import { IoEllipsisVerticalSharp, IoTrashOutline } from 'react-icons/io5'
import {
    DialogWindow,
    LoadingState,
    LoadMoreMarker,
} from '../../../../../components'
import { useTranslation } from 'react-i18next'
import TaskCard from './Card'
import { useState } from 'react'
import { useDeleteTasks, useTasks } from '../../../../../api/tasks'
import { useParams } from 'react-router-dom'
import AddNewTaskButton from '../Create/AddNewTaskButton'
import Menu, { MenuAction } from '../../../../../components/Menu'
import {
    LuPanelRightClose,
    LuPanelRightOpen,
    LuRectangleVertical,
} from 'react-icons/lu'
import { getStatusColor } from '../../../../../utils'
import useIsAllowed, { UserRole } from '../../../../../hooks/useIsAllowed'
import useLocalStorage from '../../../../../hooks/useLocalStorage'
import { useTeamStats } from '../../../../../api/team'
import { TeamStats } from '../../../../../types'

export interface ColumnProps {
    status: string
    canAdd?: boolean
    moveColumn(fromIndex: number, toIndex: number): void
    index: number
}

const Column = ({ canAdd = true, status, moveColumn, index }: ColumnProps) => {
    const [addNewTaskOpen, setAddNewTaskOpen] = useState(false)
    const { teamSlug } = useParams()
    const [orderBy] = useLocalStorage(status + '_orderBy', 'modified_at')
    const {
        data: tasks,
        isLoading,
        hasNextPage,
        fetchNextPage,
        isFetching,
    } = useTasks(teamSlug!, { status: status, ordering: orderBy })
    const { data: stats, isLoading: statsLoading } = useTeamStats(teamSlug!)
    const { t } = useTranslation()
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    const { mutate: deleteTasks } = useDeleteTasks(teamSlug!)
    const isAdmin = useIsAllowed([UserRole.OWNER, UserRole.ADMIN])

    const marker = (
        <span
            className="size-4 rounded-full"
            style={{ backgroundColor: getStatusColor(status) }}
        ></span>
    )

    const menuActions: MenuAction[] = [
        {
            title: t('move_col_left'),
            action: () => moveColumn(index, index - 1),
            disabled: index === 0,
            icon: <LuPanelRightOpen />,
        },
        {
            title: t('move_col_right'),
            action: () => moveColumn(index, index + 1),
            disabled: index === 3,
            icon: <LuPanelRightClose />,
        },
        isAdmin && {
            title: t('clear_col'),
            action: () => setIsDeleteDialogOpen(true),
            icon: <LuRectangleVertical />,
            color: '#e82c2c',
            disabled: !tasks?.length,
        },
    ].filter(Boolean) as MenuAction[]

    return (
        <div className="grid gap-5 min-w-72 transition-transform duration-500">
            <div className="flex items-center gap-3">
                {marker}
                <p className="font-semibold text-lg">{t(status)}</p>
                <span className="bg-white dark:bg-slate-800 rounded-full px-5 font-bold py-1 shadow-md">
                    {stats?.[status as keyof TeamStats] ?? 0}
                </span>
                <Menu actions={menuActions} className="ml-auto" position="left">
                    <IoEllipsisVerticalSharp size="1.2em" />
                </Menu>
                <DialogWindow
                    isOpen={isDeleteDialogOpen}
                    close={() => setIsDeleteDialogOpen(false)}
                    icon={<IoTrashOutline />}
                    description={t('clear_col_dialog_desc')}
                    onSuccess={() => deleteTasks({ status: status })}
                    successButtonText={t('clear')}
                    closeOnSuccess
                />
            </div>
            {canAdd && isAdmin && <AddNewTaskButton status={status} />}
            {!isLoading && tasks && (
                <ul className="grid gap-3">
                    {tasks.map((task) => (
                        <TaskCard task={task} key={task.id} />
                    ))}
                    <LoadMoreMarker
                        isFetching={isFetching}
                        hasNextPage={hasNextPage}
                        fetch={fetchNextPage}
                    />
                </ul>
            )}
            {isLoading && <LoadingState />}
        </div>
    )
}

export default Column
