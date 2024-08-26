import { Step, Task } from '../../../../types'
import cn from 'classnames'
import { Checkbox } from '../../../../components'
import React, { SetStateAction, useState } from 'react'

const TaskSteps = ({
    steps,
    setDoneCounter,
    isOpen,
    disabled,
}: {
    steps: Step[]
    setDoneCounter?: React.Dispatch<SetStateAction<number>>
    isOpen?: boolean
    disabled?: boolean
}) => {
    const [stepsState, setStepsState] = useState(steps)

    return (
        <ul
            className={cn(
                'transition-all duration-200 grid gap-2.5',
                isOpen
                    ? 'max-h-[1000px] gap-1.5 opacity-100'
                    : 'max-h-0 pt-0.5 gap-0 opacity-0 pointer-events-none'
            )}
        >
            {steps.map((step, key) => (
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
                        disabled={disabled}
                        setValue={(value) => {
                            let copy = [...stepsState]
                            copy[key].is_done = !copy[key].is_done
                            setStepsState(copy)
                            setDoneCounter &&
                                setDoneCounter(
                                    copy.filter((step) => step.is_done).length
                                )
                        }}
                    />
                </span>
            ))}
        </ul>
    )
}

export default TaskSteps
