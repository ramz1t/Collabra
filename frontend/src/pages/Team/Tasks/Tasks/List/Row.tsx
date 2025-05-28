import { Task } from '../../../../../types'
import { Link } from 'react-router-dom'
import TaskStats from '../TaskStats'
import { Avatar, TaskTag } from '../../../../../components'
import cn from 'classnames'
import { useTranslation } from 'react-i18next'
import TaskMenu from '../TaskMenu'
import { getStatusColor } from '../../../../../utils'
import useProfilePath from '../../../../../hooks/useProfilePath'
import useScreenSize from '../../../../../hooks/useScreenSize'
import StepsProgress from '../StepsProgress'
import React from 'react'

const TaskRow = ({ task }: { task: Task }) => {
    const { t } = useTranslation()
    const { isTablet } = useScreenSize()

    return (
        <li className="grid lg:grid-cols-[2fr_2fr] odd:bg-gray-50/50 bg-gray-100/50 odd:dark:bg-slate-800 dark:bg-slate-900 px-5 pr-1.5 py-2.5 gap-4 xl:gap-10">
            <div className="grid grid-cols-[1fr_auto] md:grid-cols-[130px_1fr] place-items-center justify-items-start gap-3">
                <TaskTag tag={task.tag} />
                {!isTablet && <TaskMenu task={task} />}
                <Link
                    to={`${task.id}`}
                    className="max-md:col-span-full font-semibold text-lg line-clamp-2 hover:text-accent dark:hover:text-accent-dark hover:underline w-fit"
                >
                    {task.title}
                </Link>
            </div>
            <div className="grid max-md:gap-1 grid-cols-[1fr_1fr_80px] md:grid-cols-[1fr_1fr_1fr_40px]">
                <div className="flex items-center gap-3">
                    <span
                        className={cn('size-4 rounded-full inline-block')}
                        style={{
                            backgroundColor: getStatusColor(task.status),
                        }}
                    ></span>
                    {t(task.status)}
                </div>
                <Link
                    to={useProfilePath(task.assignee.user.id)}
                    className="flex items-center gap-3 w-fit"
                >
                    <Avatar user={task.assignee.user} />
                    {task.assignee.user.first_name}
                </Link>
                {/*<TaskStats task={task} />*/}
                {task.steps.length > 0 ? (
                    <StepsProgress task={task} parentOpen={true} />
                ) : (
                    <span></span> // placeholder for grid layout
                )}
                {isTablet && <TaskMenu task={task} />}
            </div>
        </li>
    )
}

export default TaskRow
