import { useParams } from 'react-router-dom'
import { useTask } from '../../../../../api/tasks'
import { Avatar, RichDescription, TaskTag } from '../../../../../components'
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
import cn from 'classnames'
import TaskSteps from '../TaskSteps'
import TaskMenu from '../TaskMenu'
import { getStatusColor } from '../../../../../utils'
import TaskDeadline from '../TaskDeadline'
import TaskDetailInfoCell from './TaskDetailInfoCell'

const TaskDetails = () => {
    const { t, i18n } = useTranslation()
    const { taskId, teamSlug } = useParams()
    const { data: task } = useTask(teamSlug!, parseInt(taskId!))

    if (!task) return 'task not found'
    return (
        <div className="p-5 md:p-10 grid md:grid-cols-[3fr_2fr] gap-10">
            <div className="grid gap-5 md:gap-10 dark:border-slate-700 rounded-2xl">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-semibold flex items-center justify-between">
                        #{task.id} - {task.title}
                    </h1>
                    <TaskMenu task={task} />
                </div>
                <div className="grid gap-3 md:gap-7">
                    <TaskDetailInfoCell
                        icon={<FaRegDotCircle />}
                        title={t('status')}
                    >
                        <div className="flex items-center gap-3">
                            <span
                                className={cn(
                                    'size-4 rounded-full inline-block'
                                )}
                                style={{
                                    backgroundColor: getStatusColor(
                                        task.status
                                    ),
                                }}
                            ></span>
                            {t(task.status)}
                        </div>
                    </TaskDetailInfoCell>

                    <TaskDetailInfoCell
                        icon={<IoCalendarNumberOutline />}
                        title={t('due_date')}
                    >
                        <TaskDeadline date={task.deadline} />
                    </TaskDetailInfoCell>

                    <TaskDetailInfoCell
                        icon={<IoPricetagOutline />}
                        title={t('tag')}
                        selfCenter
                    >
                        <TaskTag tag={task.tag} />
                    </TaskDetailInfoCell>

                    <TaskDetailInfoCell
                        icon={<IoPersonOutline />}
                        title={t('assignee')}
                        selfCenter
                    >
                        <div className="flex items-center whitespace-nowrap gap-3">
                            <Avatar user={task.assignee.user} />
                            {task.assignee.user.first_name}{' '}
                            {task.assignee.user.last_name}
                        </div>
                    </TaskDetailInfoCell>

                    <TaskDetailInfoCell
                        icon={<IoDocumentAttachOutline />}
                        title={t('attachments')}
                    >
                        <ul>
                            {task.attachments.length > 0
                                ? 'list'
                                : t('no_attachments')}
                        </ul>
                    </TaskDetailInfoCell>

                    <TaskDetailInfoCell
                        icon={<IoText />}
                        title={t('description')}
                    >
                        <RichDescription text={task.description} />
                    </TaskDetailInfoCell>

                    <TaskDetailInfoCell
                        icon={<IoCheckmarkDoneOutline />}
                        title={t('subtasks')}
                    >
                        {task.steps_count > 0 ? (
                            <TaskSteps task={task} />
                        ) : (
                            <p>{t('no_subtasks')}</p>
                        )}
                    </TaskDetailInfoCell>
                </div>
            </div>
        </div>
    )
}

export default TaskDetails
