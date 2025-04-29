import React from 'react'
import cn from 'classnames'

interface TaskDetailInfoCellProps {
    icon: React.ReactElement
    title: string
    selfCenter?: boolean
    children: React.ReactNode
}

const TaskDetailInfoCell = ({
    icon,
    title,
    selfCenter,
    children,
}: TaskDetailInfoCellProps) => {
    return (
        <div className="flex flex-col md:grid grid-cols-[1fr_3fr] gap-3 md:gap-7 place-items-start">
            <div
                className={cn(
                    'flex items-center text-gray-600 dark:text-gray-400 font-semibold gap-3',
                    selfCenter && 'self-center'
                )}
            >
                <span className="text-lg">{icon}</span>
                {title}
            </div>
            {children}
        </div>
    )
}

export default TaskDetailInfoCell
