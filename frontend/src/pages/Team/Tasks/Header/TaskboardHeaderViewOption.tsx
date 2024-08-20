import { Button } from '../../../../components'
import React from 'react'
import cn from 'classnames'
import useScreenSize from '../../../../hooks/useScreenSize'

interface TaskboardHeaderViewOptionProps {
    icon: React.ReactElement
    title: string
    viewOption: string
    selectedViewOption: string | null
    setViewOption: React.Dispatch<string>
}

const TaskboardHeaderViewOption = ({
    icon,
    title,
    viewOption,
    selectedViewOption,
    setViewOption,
}: TaskboardHeaderViewOptionProps) => {
    if (selectedViewOption === null) selectedViewOption = 'board'
    const { isTablet } = useScreenSize()

    return (
        <Button
            className={cn(
                'px-4 py-1.5 rounded-md transition-all min-h-8',
                viewOption === selectedViewOption
                    ? 'text-accent dark:text-accent-dark bg-accent/10 dark:bg-accent-dark/10 hover:!opacity-100'
                    : ''
            )}
            action={() => setViewOption(viewOption)}
        >
            {icon}
            {isTablet && title}
        </Button>
    )
}

export default TaskboardHeaderViewOption
