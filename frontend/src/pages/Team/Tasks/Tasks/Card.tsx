import { Step, Task } from '../../../../types'
import {
    IoChatboxEllipsesOutline,
    IoCheckmark,
    IoCheckmarkDoneOutline,
    IoChevronDown,
    IoDocumentAttachOutline,
    IoEllipsisVerticalSharp,
} from 'react-icons/io5'
import { Checkbox, MembersAvatars } from '../../../../components'
import { useState } from 'react'
import cn from 'classnames'

interface CardProps {
    task: Task
    view: string
}

const StepsProgress = ({
    steps,
    parentOpen,
}: {
    steps: Step[]
    parentOpen: boolean
}) => {
    const [isOpen, setIsOpen] = useState(false)
    const [stepsState, setStepsState] = useState(steps)
    const doneCount = steps.filter((el) => el.is_done).length
    console.log(steps)
    return (
        <div>
            <span
                className={cn(
                    'hover:cursor-pointer rounded-md mt-3 py-1 pl-2 pr-3 border dark:border-gray-500 text-gray-400 dark:text-gray-500 flex items-center font-semibold gap-2 w-fit transition-all duration-75',
                    doneCount === steps.length
                        ? 'bg-gray-100'
                        : 'hover:bg-gray-50'
                )}
                onClick={() => setIsOpen((prev) => !prev)}
            >
                <IoCheckmarkDoneOutline size="1.2em" />
                {doneCount}/{steps.length}
            </span>
            <ul
                className={cn(
                    'transition-all duration-200 grid gap-1',
                    isOpen && parentOpen
                        ? 'max-h-[1000px] pt-2 gap-1.5 opacity-100'
                        : 'max-h-0 pt-0.5 gap-0 opacity-0 pointer-events-none'
                )}
            >
                {steps.map((step, key) => (
                    <span
                        className="transition-all duration-200"
                        style={{
                            translate: `0px -${isOpen ? 0 : key * 14}px`,
                        }}
                    >
                        <Checkbox
                            key={key}
                            value={stepsState[key].is_done}
                            text={step.title}
                            id={step.id}
                            setValue={(value) => {
                                let copy = [...stepsState]
                                copy[key].is_done = !copy[key].is_done
                                setStepsState(copy)
                            }}
                        />
                    </span>
                ))}
            </ul>
        </div>
    )
}

const Card = ({ task }: CardProps) => {
    const [isOpen, setIsOpen] = useState(task.status !== 'done')
    return (
        <li className="bg-white dark:bg-slate-800 rounded-lg border dark:border-slate-700">
            <div
                className={cn(
                    'flex items-center overflow-hidden transition-all duration-200 px-4',
                    isOpen
                        ? 'max-h-52 pt-4 opacity-100'
                        : 'max-h-0 pt-0 opacity-0'
                )}
            >
                <span
                    className="rounded-full px-3 py-1 bg-orange-100 dark:bg-orange-500 text-orange-500 dark:text-orange-100 font-bold"
                    // style={{ color: tag.color, backgroundColor: tag.color }}
                >
                    {task.tag.title}
                </span>
                <span className="text-xl ml-auto">
                    <IoEllipsisVerticalSharp />
                </span>
            </div>
            <div
                className={cn(
                    'flex items-center gap-2 p-4',
                    task.status === 'done' ? 'hover:cursor-pointer' : null
                )}
                onClick={() =>
                    task.status === 'done' && setIsOpen((prev) => !prev)
                }
            >
                {task.status === 'done' && (
                    <span className="text-green-600 text-lg">
                        <IoCheckmark />
                    </span>
                )}
                <p className="font-semibold text-lg line-clamp-2">
                    {task.title}
                </p>
                <span
                    className={cn(
                        'text-xl p-2 transition-all duration-200 ml-auto',
                        isOpen ? 'rotate-180' : null,
                        task.status !== 'done' ? 'hidden' : null
                    )}
                >
                    <IoChevronDown />
                </span>
            </div>
            <div
                className={cn(
                    'px-4 grid overflow-hidden transition-all duration-200',
                    isOpen
                        ? 'pb-4 max-h-[1000px] border-b dark:border-b-slate-700 opacity-100'
                        : 'pb-0 max-h-0 border-0 opacity-0'
                )}
            >
                <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-3">
                    {task.description}
                </p>
                <StepsProgress steps={task.steps} parentOpen={isOpen} />
            </div>
            <div
                className={cn(
                    'px-4 flex items-center gap-3.5 overflow-hidden transition-all duration-200',
                    isOpen
                        ? 'max-h-52 py-4 opacity-100'
                        : 'max-h-0 py-0 opacity-0'
                )}
            >
                <MembersAvatars
                    users={task.assignees.map((assignee) => assignee.user)}
                />
                <span className="flex text-gray-400 dark:text-gray-500 items-center gap-1.5 font-semibold ml-auto">
                    <IoChatboxEllipsesOutline />
                    {task.comments}
                </span>
                <span className="flex text-gray-400 dark:text-gray-500 items-center gap-1.5 font-semibold">
                    <IoDocumentAttachOutline />
                    {6}
                </span>
            </div>
        </li>
    )
}

export default Card
