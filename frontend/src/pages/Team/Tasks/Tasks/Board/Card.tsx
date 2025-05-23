import { Task } from '../../../../../types'
import {
    IoBookOutline,
    IoCheckmark,
    IoCheckmarkDoneOutline,
    IoChevronDown,
    IoPerson,
    IoPersonOutline,
} from 'react-icons/io5'
import {
    Avatar,
    DialogWindow,
    FireIcon,
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
import useLocalStorage from '../../../../../hooks/useLocalStorage'
import AuthContext, { IAuthContext } from '../../../../../contexts/AuthContext'

interface CardProps {
    task: Task
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
                openedClassName="pt-4"
                closedClassName="pt-0"
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
    const [cardStyle] = useLocalStorage('cardStyle', 'expanded')
    const [isOpen, setIsOpen] = useState(
        task.status !== 'done' && cardStyle === 'expanded'
    )
    const [isDescriptionOpen, setIsDescriptionOpen] = useState(false)
    const { t } = useTranslation()
    const { user } = useContext(AuthContext) as IAuthContext

    const isAssignee = task.assignee.user.id === user?.user_id
    const isDeadline = false

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
                className="flex items-center duration-[--card-ms] pl-4 pr-1.5"
                openedClassName="pt-4"
                closedClassName="pt-0"
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
                    'flex items-center pl-3.5 pr-1.5 hover:cursor-pointer duration-[--card-ms]',
                    isOpen ? 'py-4' : 'py-1.5'
                )}
                onClick={() => setIsOpen((prev) => !prev)}
            >
                {(isAssignee || isDeadline) && (
                    <SmoothContainer
                        duration={openTransitionDuration}
                        vertical={false}
                        isOpen={!isOpen}
                        openedClassName="mr-3.5 min-w-3"
                        closedClassName="mr-0 min-w-0"
                        className="flex flex-col items-center flex-shrink-0"
                    >
                        {isDeadline && (
                            <span className="min-w-4 flex-shrink-0 scale-75">
                                <FireIcon />
                            </span>
                        )}
                        {isAssignee && (
                            <IoPerson
                                size={'0.8em'}
                                className="flex-shrink-0"
                            />
                        )}
                    </SmoothContainer>
                )}
                {task.status === 'done' && (
                    <span className="text-green-600 text-xl pr-2">
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
                        'text-xl duration-[--card-ms] size-10 flex justify-center items-center ml-auto px-2',
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
                className="px-4"
                openedClassName="pb-4 border-b dark:border-b-slate-700"
                closedClassName="pb-0 border-0"
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
                className="px-4 flex items-center gap-3.5"
                openedClassName="py-4"
                closedClassName="py-0"
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
