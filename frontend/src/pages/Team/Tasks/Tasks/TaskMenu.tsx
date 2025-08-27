import { Task, MenuAction } from '../../../../types'
import { useTranslation } from 'react-i18next'
import {
    IoCheckmarkCircleOutline,
    IoEllipsisVerticalSharp,
    IoFlaskOutline,
    IoListOutline,
    IoPauseOutline,
    IoPencilOutline,
    IoPlayBackOutline,
    IoPlayOutline,
    IoTrashOutline,
} from 'react-icons/io5'
import { useContext, useState, useMemo } from 'react'
import { DialogWindow, Menu } from '../../../../components'
import AddTaskDialog from './Create/AddTaskDialog'
import { useDeleteTasks, useUpdateTask } from '../../../../api/tasks'
import { useParams } from 'react-router-dom'
import useIsAllowed from '../../../../hooks/useIsAllowed'
import AuthContext, { IAuthContext } from '../../../../contexts/AuthContext'
import { UserRole } from '../../../../utils/constants'

const TaskMenu = ({ task }: { task: Task }) => {
    const { t } = useTranslation()
    const { teamSlug } = useParams()
    const { user } = useContext(AuthContext) as IAuthContext
    const isAdmin = useIsAllowed([UserRole.ADMIN, UserRole.OWNER])
    const isAssignee = user?.user_id === task.assignee.user.id

    const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [isEditDialogOpen, setEditDialogOpen] = useState(false)

    const { mutate: updateTask } = useUpdateTask(teamSlug!, task.id)
    const { mutate: deleteTask, isPending: isDeleting } = useDeleteTasks(
        teamSlug!
    )

    const canSeeMenu = isAdmin || isAssignee
    if (!canSeeMenu) return null

    const handleStatusUpdate = (status: Task['status']) => () => {
        updateTask({ status })
    }

    const actions: MenuAction[] = useMemo(() => {
        const list: (MenuAction | false)[] = [
            task.status === 'to_do' && {
                title: t('start_the_task'),
                icon: <IoPlayOutline />,
                action: handleStatusUpdate('in_progress'),
            },
            !['to_do', 'done'].includes(task.status) && {
                title: t('pause_the_task'),
                icon: <IoPauseOutline />,
                action: handleStatusUpdate('to_do'),
            },
            !['need_review', 'done'].includes(task.status) && {
                title: t('send_to_review'),
                icon: <IoFlaskOutline />,
                action: handleStatusUpdate('need_review'),
            },
            ['need_review', 'done'].includes(task.status) &&
                isAdmin && {
                    title: t('needs_more_work'),
                    icon: <IoPlayBackOutline />,
                    action: handleStatusUpdate('in_progress'),
                },
            task.status !== 'done' &&
                (isAdmin || !task.requires_review) && {
                    title: t('mark_as_done'),
                    icon: <IoCheckmarkCircleOutline />,
                    action: handleStatusUpdate('done'),
                },
            isAdmin && {
                title: t('edit'),
                icon: <IoPencilOutline />,
                action: () => setEditDialogOpen(true),
            },
            isAdmin && {
                title: task.steps_count > 0 ? t('edit_steps') : t('add_steps'),
                icon: <IoListOutline />,
                action: () => console.log('open edit steps dialog'),
            },
            isAdmin && {
                title: t('delete'),
                icon: <IoTrashOutline />,
                action: () => setDeleteDialogOpen(true),
                color: '#e82c2c',
            },
        ]

        return list.filter(Boolean) as MenuAction[]
    }, [task.status, isAdmin, task.requires_review, t])

    return (
        <>
            <Menu actions={actions} position="left">
                <IoEllipsisVerticalSharp size="1.2em" className="min-w-10" />
            </Menu>

            <DialogWindow
                icon={<IoTrashOutline />}
                description={t('delete_task_dialog_desc')}
                isOpen={isDeleteDialogOpen}
                close={() => setDeleteDialogOpen(false)}
                onSuccess={() => deleteTask({ id: [task.id] })}
                successButtonText={t('delete')}
                isLoading={isDeleting}
                closeOnSuccess
            />

            <AddTaskDialog
                icon={<IoPencilOutline />}
                title={t('edit_task')}
                open={isEditDialogOpen}
                setOpen={setEditDialogOpen}
                onSuccess={updateTask}
                initialTask={task}
                successButtonText={t('save')}
            />
        </>
    )
}

export default TaskMenu
