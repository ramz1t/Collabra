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
import TaskMenu from '../TaskMenu'
import { getStatusColor } from '../../../../../utils'
import TaskDeadline from '../TaskDeadline'

const TaskDetails = () => {
    const { t, i18n } = useTranslation()
    const { taskId, teamSlug } = useParams()
    const { data: task } = useTask(teamSlug!, parseInt(taskId!))

    if (!task) return 'task not found'
    return (
        <div className="p-5 md:p-10 grid md:grid-cols-[1fr_1fr] gap-10">
            <div className="grid gap-5 md:gap-10 md:p-10 md:border dark:border-slate-700 rounded-2xl">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-semibold flex items-center justify-between">
                        #{task.id} - {task.title}
                    </h1>
                    <TaskMenu task={task} />
                </div>

                <div className="flex flex-col md:grid grid-cols-[1fr_3fr] gap-3 md:gap-7 place-items-start max-md:[&>*:nth-child(even)]:mb-4 max-md:[&>*:last-child]:!mb-0">
                    <div className="flex items-center text-gray-600 dark:text-gray-400 font-semibold gap-3">
                        <FaRegDotCircle />
                        {t('status')}
                    </div>
                    <div className="flex items-center gap-3">
                        <span
                            className={cn('size-4 rounded-full inline-block')}
                            style={{
                                backgroundColor: getStatusColor(task.status),
                            }}
                        ></span>
                        {t(task.status)}
                    </div>

                    <div className="flex items-center text-gray-600 dark:text-gray-400 font-semibold gap-3">
                        <IoCalendarNumberOutline />
                        {t('due_date')}
                    </div>
                    <TaskDeadline date={task.deadline} />

                    <div className="flex items-center text-gray-600 dark:text-gray-400 font-semibold gap-3 self-center">
                        <IoPricetagOutline />
                        {t('tag')}
                    </div>
                    <TaskTag tag={task.tag} />

                    <div className="flex items-center text-gray-600 dark:text-gray-400 font-semibold gap-3 self-center">
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
                    <ul>
                        {task.attachments.length > 0
                            ? 'list'
                            : t('no_attachments')}
                    </ul>

                    <div className="flex items-center text-gray-600 dark:text-gray-400 font-semibold gap-2">
                        <IoText />
                        {t('description')}
                    </div>
                    <p>{task.description}</p>

                    <div className="flex items-center text-gray-600 dark:text-gray-400 font-semibold gap-2">
                        <IoCheckmarkDoneOutline />
                        {t('subtasks')}
                    </div>
                    {task.steps.length > 0 ? (
                        <TaskSteps
                            taskId={task.id}
                            steps={task.steps}
                            isOpen={true}
                        />
                    ) : (
                        <p>{t('no_subtasks')}</p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default TaskDetails
