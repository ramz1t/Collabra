import { Task } from '../../../../../types'
import { Link } from 'react-router-dom'
import TaskTag from '../TaskTag'
import TaskStats from '../TaskStats'
import { Avatar } from '../../../../../components'
import cn from 'classnames'
import { useTranslation } from 'react-i18next'

const TaskRow = ({ task }: { task: Task }) => {
    const { t } = useTranslation()
    return (
        <li className="grid grid-cols-[3fr_36px_2fr] md:grid-cols-[160px_auto_120px_36px_110px] items-center odd:bg-gray-50 bg-gray-100 px-5 py-4 gap-4 xl:gap-10">
            <span className="max-md:col-span-full">
                <TaskTag tag={task.tag} />
            </span>
            <Link
                to={`${task.id}`}
                className="max-md:col-span-full font-semibold text-lg line-clamp-2 hover:text-accent dark:hover:text-accent-dark hover:underline w-fit"
            >
                {task.title}
            </Link>
            <div className="flex items-center gap-3">
                <span
                    className={cn(
                        'size-4 rounded-full bg-red-500 inline-block'
                    )}
                    style={{
                        backgroundColor: {
                            to_do: '#ff9100',
                            in_progress: '#006fff',
                            need_review: '#ffdd00',
                            done: '#1cc01f',
                        }[task.status],
                    }}
                ></span>
                {t(task.status)}
            </div>
            <Avatar user={task.assignee.user} />
            <div className="flex gap-3">
                <TaskStats task={task} />
            </div>
        </li>
    )
}

export default TaskRow
