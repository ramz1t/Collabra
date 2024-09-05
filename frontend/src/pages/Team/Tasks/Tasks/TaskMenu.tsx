import { Task } from '../../../../types'
import Menu, { MenuAction } from '../../../../components/Menu'
import { useTranslation } from 'react-i18next'
import {
    IoCheckmarkCircleOutline,
    IoEllipsisVerticalSharp,
    IoFlaskOutline,
    IoPencilOutline,
    IoPlayBackOutline,
    IoPlayOutline,
    IoTrashOutline,
} from 'react-icons/io5'
import { useContext, useState } from 'react'
import { DialogWindow } from '../../../../components'
import AddTaskDialog from './AddTaskDialog'
import { useDeleteTasks, useUpdateTask } from '../../../../api/tasks'
import { useParams } from 'react-router-dom'
import useIsAllowed, { UserRole } from '../../../../hooks/useIsAllowed'
import AuthContext, { IAuthContext } from '../../../../contexts/AuthContext'

const TaskMenu = ({ task }: { task: Task }) => {
    const { t } = useTranslation()
    const { teamSlug } = useParams()
    const { user } = useContext(AuthContext) as IAuthContext
    const isAdmin = useIsAllowed([UserRole.ADMIN, UserRole.OWNER])
    const isAssignee = user?.user_id === task.assignee.user.id

    const { mutate: updateTask } = useUpdateTask(teamSlug!, task.id)
    const { mutate: deleteTask, isPending: isDeleting } = useDeleteTasks(
        teamSlug!
    )

    const isToDo = task.status === 'to_do'
    const isInProgress = task.status === 'in_progress'
    const isNeedReview = task.status === 'need_review'
    const isDone = task.status === 'done'

    const actions: MenuAction[] = [
        isToDo && {
            title: t('start_the_task'),
            icon: <IoPlayOutline />,
            action: () => updateTask({ status: 'in_progress' }),
        },
        !isNeedReview &&
            !isDone && {
                title: t('send_to_review'),
                icon: <IoFlaskOutline />,
                action: () => updateTask({ status: 'need_review' }),
            },
        !isDone &&
            (isAdmin || !task.requires_review) && {
                title: t('mark_as_done'),
                icon: <IoCheckmarkCircleOutline />,
                action: () => updateTask({ status: 'done' }),
            },
        isDone &&
            isAdmin && {
                title: t('needs_more_work'),
                icon: <IoPlayBackOutline />,
                action: () => updateTask({ status: 'in_progress' }),
            },
        isAdmin && {
            title: t('edit'),
            icon: <IoPencilOutline />,
            action: () => setIsEditDialogOpen(true),
        },
        isAdmin && {
            title: t('delete'),
            icon: <IoTrashOutline />,
            action: () => setIsDeleteDialogOpen(true),
            color: '#e82c2c',
        },
    ].filter(Boolean) as MenuAction[]

    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

    if (!(isAdmin || isAssignee)) return

    return (
        <>
            <Menu actions={actions} position="left">
                <IoEllipsisVerticalSharp size="1.2em" />
            </Menu>
            <DialogWindow
                icon={<IoTrashOutline />}
                description={t('delete_task_dialog_desc')}
                isOpen={isDeleteDialogOpen}
                close={() => setIsDeleteDialogOpen(false)}
                onSuccess={() => deleteTask({ id: task.id })}
                successButtonText={t('delete')}
                isLoading={isDeleting}
                closeOnSuccess
            />
            <AddTaskDialog
                icon={<IoPencilOutline />}
                title={t('edit_task')}
                open={isEditDialogOpen}
                setOpen={setIsEditDialogOpen}
                onSuccess={updateTask}
                initialTask={task}
                successButtonText={t('save')}
            />
        </>
    )
}

export default TaskMenu
