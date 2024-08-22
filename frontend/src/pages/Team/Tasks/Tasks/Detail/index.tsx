import { useParams } from 'react-router-dom'
import { useTask } from '../../../../../api/tasks'
import { Avatar, Checkbox } from '../../../../../components'
import {
    IoCalendarNumberOutline,
    IoCheckmarkDoneOutline,
    IoDocumentAttachOutline,
    IoPersonOutline,
    IoPricetagOutline,
    IoText,
} from 'react-icons/io5'
import { FaRegDotCircle } from 'react-icons/fa'
import { useTranslation } from 'react-i18next'
import TaskTag from '../TaskTag'
import cn from 'classnames'
import TaskSteps from '../TaskSteps'

const TaskDetails = () => {
    const { t, i18n } = useTranslation()
    const { taskId, teamSlug } = useParams()
    const { data: task } = useTask(teamSlug!, parseInt(taskId!))

    if (!task) return 'task not found'
    return (
        <div className="p-5 md:p-10 grid md:grid-cols-[1fr_1fr] gap-10">
            <div className="grid gap-5 md:gap-10">
                <h1 className="text-3xl font-semibold">
                    #{task.id} - {task.title}
                </h1>
                <div className="flex flex-col md:grid grid-cols-[1fr_3fr] gap-3 md:gap-7 place-items-start">
                    <div className="flex items-center text-gray-600 dark:text-gray-400 font-semibold gap-3">
                        <FaRegDotCircle />
                        {t('status')}
                    </div>
                    <div className="flex items-center gap-3 max-md:mb-4">
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
                    <div className="flex items-center text-gray-600 dark:text-gray-400 font-semibold gap-3">
                        <IoCalendarNumberOutline />
                        {t('due_date')}
                    </div>
                    <div className="max-md:mb-4">
                        {new Date(task.deadline).toLocaleDateString(
                            i18n.resolvedLanguage,
                            {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            }
                        )}
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-400 font-semibold gap-3">
                        <IoPricetagOutline />
                        {t('tag')}
                    </div>
                    <TaskTag tag={task.tag} />
                    <div className="flex items-center text-gray-600 dark:text-gray-400 font-semibold gap-3 max-md:mt-4">
                        <IoPersonOutline />
                        {t('assignee')}
                    </div>
                    <div className="flex items-center whitespace-nowrap gap-3">
                        <Avatar user={task.assignee.user} />
                        {task.assignee.user.first_name}{' '}
                        {task.assignee.user.last_name}
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-400 font-semibold gap-2">
                        <IoDocumentAttachOutline />
                        {t('attachments')}
                    </div>
                    <ul className="max-md:mb-4">
                        {task.attachments.length > 0
                            ? 'list'
                            : t('no_attachments')}
                    </ul>
                    <div className="col-span-2  max-md:mb-4">
                        <div className="flex items-center text-gray-600 dark:text-gray-400 font-semibold gap-2 pb-2">
                            <IoText />
                            {t('description')}
                        </div>
                        <div className="rounded-xl border dark:border-slate-800 p-3">
                            {task.description}
                        </div>
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-400 font-semibold gap-2">
                        <IoCheckmarkDoneOutline />
                        {t('subtasks')}
                    </div>
                    {task.steps.length > 0 ? (
                        <TaskSteps steps={task.steps} isOpen={true} />
                    ) : (
                        t('no_subtasks')
                    )}
                </div>
            </div>
        </div>
    )
}

export default TaskDetails
