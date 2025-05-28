import { Task } from '../../../../types'
import React, { useContext, useState } from 'react'
import TeamContext, { ITeamContext } from '../../../../contexts/TeamContext'
import cn from 'classnames'
import { IoCheckmarkDoneOutline } from 'react-icons/io5'
import { SmoothContainer } from '../../../../components'
import TaskSteps from './TaskSteps'

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
                    'hover:cursor-pointer rounded-md py-1 pl-2 pr-3 border dark:border-gray-500 text-gray-400 dark:text-gray-500 flex items-center font-semibold gap-2 w-fit transition-all duration-75',
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

export default StepsProgress
