import React, { useState, useCallback, SetStateAction, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import cn from 'classnames'
import { Checkbox } from '../../../../components'
import { useSteps, useToggleStep } from '../../../../api/steps'
import { Step, Task } from '../../../../types'

interface TaskStepsProps {
    task: Task
    setDoneCounter?: React.Dispatch<SetStateAction<number>>
    disabled?: boolean
    className?: string
}

const TaskSteps: React.FC<TaskStepsProps> = ({
    task,
    setDoneCounter,
    disabled,
    className,
}) => {
    const { teamSlug } = useParams()
    const { data: steps, isLoading } = useSteps(teamSlug!, task.id)
    const [stepsState, setStepsState] = useState<Step[] | undefined>(
        steps?.results
    )
    const { mutate: toggleStep } = useToggleStep(teamSlug!, task.id)

    const handleToggle = useCallback(
        (index: number) => {
            if (!stepsState) return
            const step = stepsState[index]
            toggleStep(step.id, {
                onSuccess: (res) => {
                    setStepsState((prev) => {
                        if (!prev) return
                        const next = prev.map((s, i) =>
                            i === index ? { ...s, is_done: res.data.value } : s
                        )
                        setDoneCounter?.(next.filter((s) => s.is_done).length)
                        return next
                    })
                },
            })
        },
        [stepsState, toggleStep, setDoneCounter]
    )

    useEffect(() => {
        setStepsState(steps?.results)
        if (steps !== undefined && setDoneCounter) {
            setDoneCounter(steps.results.filter((s) => s.is_done).length)
        }
    }, [steps])

    if (isLoading || !stepsState) return
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
