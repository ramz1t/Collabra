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
import Row from './Row'
import RowCell from './RowCell'
import StatusDropdown from './StatusDropdown'

const TaskRow = ({ task }: { task: Task }) => {
    return (
        <li className="grid lg:grid-cols-[130px_2fr_1fr_1fr_1fr_30px] odd:bg-gray-50/50 bg-gray-100/50 dark:bg-gray-800/[.5] odd:dark:bg-gray-900 px-5 pr-3 items-start gap-4 xl:gap-10">
            <RowCell>
                <TaskTag tag={task.tag} />
            </RowCell>
            <RowCell>
                <Link
                    to={`${task.id}`}
                    className="max-md:col-span-full font-semibold text-lg line-clamp-2 hover:text-accent dark:hover:text-accent-dark hover:underline w-fit"
                >
                    {task.title}
                </Link>
            </RowCell>
            <RowCell>
                <StatusDropdown task={task} />
            </RowCell>
            <RowCell>
                <Link
                    to={useProfilePath(task.assignee.user.id)}
                    className="flex items-center gap-3 w-fit"
                >
                    <Avatar user={task.assignee.user} />
                    {task.assignee.user.first_name}
                </Link>
            </RowCell>
            <RowCell>
                <span className="my-[11px]">
                    <StepsProgress task={task} parentOpen={true} />
                </span>
            </RowCell>
            <RowCell>
                <TaskMenu task={task} />
            </RowCell>
        </li>
    )
}

export default TaskRow
