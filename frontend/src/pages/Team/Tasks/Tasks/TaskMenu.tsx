import { Task } from '../../../../types'
import Menu, { MenuAction } from '../../../../components/Menu'
import { useTranslation } from 'react-i18next'
import {
    IoCheckmark,
    IoCheckmarkCircleOutline,
    IoCheckmarkDoneOutline,
    IoEllipsisVerticalSharp,
    IoFlaskOutline,
    IoPencilOutline,
    IoTrashOutline,
} from 'react-icons/io5'
import { useState } from 'react'
import { DialogWindow } from '../../../../components'

const TaskMenu = ({ task }: { task: Task }) => {
    const { t } = useTranslation()
    const actions: MenuAction[] = [
        {
            title: t('send_to_review'),
            icon: <IoFlaskOutline />,
            action() {},
        },
        {
            title: t('mark_as_done'),
            icon: <IoCheckmarkCircleOutline />,
            action() {},
        },
        {
            title: t('edit'),
            icon: <IoPencilOutline />,
            action() {},
        },
        {
            title: t('delete'),
            icon: <IoTrashOutline />,
            action: () => setIsDeleteDialogOpen(true),
            color: '#e82c2c',
        },
    ]
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
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
                onSuccess={() => {}}
                successButtonText={t('delete')}
            />
        </>
    )
}

export default TaskMenu
