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
        <li className="grid grid-cols-[3fr_2fr] odd:bg-gray-50 bg-gray-100 odd:dark:bg-slate-800 dark:bg-slate-900 px-5 py-4 gap-4 xl:gap-10">
            <div className="grid grid-cols-[160px_1fr]">
                <TaskTag tag={task.tag} />
                <Link
                    to={`${task.id}`}
                    className="max-md:col-span-full font-semibold text-lg line-clamp-2 hover:text-accent dark:hover:text-accent-dark hover:underline w-fit"
                >
                    {task.title}
                </Link>
            </div>
            <div className="grid grid-cols-[1fr_1fr_1fr]">
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
                <div className="flex items-center gap-3">
                    <Avatar user={task.assignee.user} />
                    {task.assignee.user.first_name}
                </div>

                <TaskStats task={task} />
            </div>
        </li>
    )
}

export default TaskRow
