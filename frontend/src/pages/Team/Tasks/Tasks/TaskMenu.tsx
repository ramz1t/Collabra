import { Task } from '../../../../types'
import Menu, { MenuAction } from '../../../../components/Menu'
import { useTranslation } from 'react-i18next'
import {
    IoCheckmark,
    IoCheckmarkCircleOutline,
    IoCheckmarkDoneOutline,
    IoEllipsisVerticalSharp,
    IoFlaskOutline,
    IoTrashOutline,
} from 'react-icons/io5'

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
            title: t('delete'),
            icon: <IoTrashOutline />,
            action() {},
            color: '#e82c2c',
        },
    ]
    return (
        <Menu actions={actions} position="left">
            <IoEllipsisVerticalSharp size="1.2em" />
        </Menu>
    )
}

export default TaskMenu
