import React, { useState, useCallback, SetStateAction } from 'react'
import { useParams } from 'react-router-dom'
import cn from 'classnames'
import { Checkbox } from '../../../../components'
import { useToggleStep } from '../../../../api/tasks'
import { Step } from '../../../../types'

interface TaskStepsProps {
    taskId: number
    steps: Step[]
    setDoneCounter?: React.Dispatch<SetStateAction<number>>
    disabled?: boolean
    className?: string
}

const TaskSteps: React.FC<TaskStepsProps> = ({
    taskId,
    steps,
    setDoneCounter,
    disabled,
    className,
}) => {
    const [stepsState, setStepsState] = useState(steps)
    const { teamSlug } = useParams()
    const { mutate: toggleStep } = useToggleStep(teamSlug!, taskId)

    const handleToggle = useCallback(
        (index: number) => {
            const step = stepsState[index]
            toggleStep(step.id, {
                onSuccess: () => {
                    setStepsState((prev) => {
                        const next = prev.map((s, i) =>
                            i === index ? { ...s, is_done: !s.is_done } : s
                        )
                        setDoneCounter?.(next.filter((s) => s.is_done).length)
                        return next
                    })
                },
            })
        },
        [stepsState, toggleStep, setDoneCounter]
    )

    return (
        <ul className={cn('grid gap-2.5', className)}>
            {stepsState.map((step, index) => (
                <li key={step.id}>
                    <Checkbox
                        value={step.is_done}
                        text={step.title}
                        disabled={disabled}
                        setValue={() => handleToggle(index)}
                    />
                </li>
            ))}
        </ul>
    )
}

export default TaskSteps
