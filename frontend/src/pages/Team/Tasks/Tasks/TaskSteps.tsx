import { Task } from '../../../../types'
import cn from 'classnames'
import { Checkbox } from '../../../../components'
import { useState } from 'react'

const TaskSteps = ({
    task,
    isOpen,
    disabled,
}: {
    task: Task
    isOpen?: boolean
    disabled?: boolean
}) => {
    const [stepsState, setStepsState] = useState(task.steps)

    return (
        <ul
            className={cn(
                'transition-all duration-200 grid gap-2.5',
                isOpen
                    ? 'max-h-[1000px] pt-4 gap-1.5 opacity-100'
                    : 'max-h-0 pt-0.5 gap-0 opacity-0 pointer-events-none'
            )}
        >
            {task.steps.map((step, key) => (
                <span
                    className="transition-all duration-200"
                    style={{
                        translate: `0px -${isOpen ? 0 : key * 14}px`,
                    }}
                    key={step.id}
                >
                    <Checkbox
                        key={key}
                        value={stepsState[key].is_done}
                        text={step.title}
                        id={step.id}
                        disabled={disabled}
                        setValue={(value) => {
                            let copy = [...stepsState]
                            copy[key].is_done = !copy[key].is_done
                            setStepsState(copy)
                        }}
                    />
                </span>
            ))}
        </ul>
    )
}

export default TaskSteps
