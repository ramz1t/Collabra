import { Task } from '../../../../../types'
import {
    IoBookOutline,
    IoCheckmark,
    IoCheckmarkDoneOutline,
    IoChevronDown,
} from 'react-icons/io5'
import {
    Avatar,
    DialogWindow,
    RichDescription,
    SmoothContainer,
    TaskTag,
} from '../../../../../components'
import React, { memo, useContext, useState } from 'react'
import cn from 'classnames'
import { Link } from 'react-router-dom'
import TaskStats from '../TaskStats'
import TaskSteps from '../TaskSteps'
import TaskMenu from '../TaskMenu'
import useProfilePath from '../../../../../hooks/useProfilePath'
import TeamContext, { ITeamContext } from '../../../../../contexts/TeamContext'
import { useTranslation } from 'react-i18next'

interface CardProps {
    task: Task
    view: string
}

const StepsProgress = ({
    task,
    parentOpen,
}: {
    task: Task
    parentOpen: boolean
}) => {
    const [isOpen, setIsOpen] = useState(false)
    const [doneCount, setDoneCount] = useState(
        task.steps.filter((step) => step.is_done).length
    )
    const { team } = useContext(TeamContext) as ITeamContext

    if (!(team?.is_admin || team?.member_id === task.assignee.id)) return
    if (task.steps.length === 0) return

    return (
        <div>
            <span
                className={cn(
                    'hover:cursor-pointer rounded-md mt-3 py-1 pl-2 pr-3 border dark:border-gray-500 text-gray-400 dark:text-gray-500 flex items-center font-semibold gap-2 w-fit transition-all duration-75',
                    doneCount === task.steps.length
                        ? 'bg-gray-100 dark:bg-slate-700'
                        : 'hover:bg-gray-50 dark:hover:bg-slate-700'
                )}
                onClick={() => setIsOpen((prev) => !prev)}
            >
                <IoCheckmarkDoneOutline size="1.2em" />
                {doneCount}/{task.steps.length}
            </span>
            <SmoothContainer
                duration={200}
                isOpen={isOpen && parentOpen}
                className={cn(isOpen ? 'pt-4' : 'pt-0')}
            >
                <TaskSteps
                    taskId={task.id}
                    disabled={task.status === 'done'}
                    steps={task.steps}
                    setDoneCounter={setDoneCount}
                />
            </SmoothContainer>
        </div>
    )
}

const TaskCard = ({ task }: CardProps) => {
    const [isOpen, setIsOpen] = useState(task.status !== 'done')
    const [isDescriptionOpen, setIsDescriptionOpen] = useState(false)
    const { t } = useTranslation()

    const openTransitionDuration = 200

    return (
        <li
            className="bg-white dark:bg-slate-800 rounded-lg border dark:border-slate-700 transition-all"
            style={
                {
                    '--card-ms': `${openTransitionDuration}ms`,
                } as React.CSSProperties
            }
        >
            {/* TAG AND MENU */}
            <SmoothContainer
                isOpen={isOpen}
                className={cn(
                    'flex items-center duration-[--card-ms] pl-4 pr-1.5',
                    isOpen ? 'pt-4' : 'pt-0'
                )}
                duration={openTransitionDuration}
            >
                <TaskTag tag={task.tag} />
                <span className="ml-auto">
                    <TaskMenu task={task} />
                </span>
            </SmoothContainer>

            {/* TITLE AND EXPAND BUTTON */}
            <div
                className={cn(
                    'flex items-center gap-2 pl-4 pr-1.5 hover:cursor-pointer duration-[--card-ms]',
                    isOpen ? 'py-4' : 'py-1.5'
                )}
                onClick={() => setIsOpen((prev) => !prev)}
            >
                {task.status === 'done' && (
                    <span className="text-green-600 text-xl">
                        <IoCheckmark />
                    </span>
                )}
                <Link
                    to={`${task.id}`}
                    className="font-semibold text-lg line-clamp-2 hover:text-accent dark:hover:text-accent-dark hover:underline"
                >
                    {task.title}
                </Link>
                <span
                    className={cn(
                        'text-xl duration-[--card-ms] size-10 flex justify-center items-center ml-auto',
                        isOpen ? 'rotate-180' : null
                    )}
                >
                    <IoChevronDown />
                </span>
            </div>

            {/* DESCRIPTION AND STEPS */}
            <SmoothContainer
                isOpen={isOpen}
                duration={openTransitionDuration}
                className={cn(
                    'px-4',
                    isOpen
                        ? 'pb-4 border-b dark:border-b-slate-700'
                        : 'pb-0 border-0'
                )}
            >
                <p
                    className="text-gray-500 dark:text-gray-400 text-sm line-clamp-3 hover:cursor-help"
                    onClick={() => setIsDescriptionOpen(true)}
                >
                    {task.description}
                </p>
                <DialogWindow
                    icon={<IoBookOutline />}
                    title={t('description')}
                    isOpen={isDescriptionOpen}
                    close={() => setIsDescriptionOpen(false)}
                    closeButtonText={t('close')}
                >
                    <RichDescription text={task.description} />
                </DialogWindow>
                <StepsProgress task={task} parentOpen={isOpen} />
            </SmoothContainer>

            {/* FOOTER */}
            <SmoothContainer
                isOpen={isOpen}
                duration={openTransitionDuration}
                className={cn(
                    'px-4 flex items-center gap-3.5',
                    isOpen ? 'py-4' : 'py-0'
                )}
            >
                <Link
                    to={useProfilePath(task.assignee.user.id)}
                    className="flex items-center gap-3 font-semibold text-gray-600 dark:text-gray-400 mr-auto hover:opacity-90 transition-opacity duration-75"
                >
                    <Avatar user={task.assignee.user} />
                    {task.assignee.user.first_name}
                    {task.assignee.status && ` (${task.assignee.status})`}
                </Link>
                <TaskStats task={task} />
            </SmoothContainer>
        </li>
    )
}

export default memo(TaskCard)
