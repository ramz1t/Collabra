import cn from 'classnames'
import React, { memo } from 'react'

export interface RichHeaderProps {
    icon: React.ReactElement
    title: string
    description?: string
    actions?: React.ReactNode
    className?: string
}

const RichHeader = ({
    icon,
    title,
    description,
    actions,
    className,
}: RichHeaderProps): React.ReactElement => {
    return (
        <div
            className={cn('flex flex-col items-center w-full gap-1', className)}
        >
            <span className="text-accent dark:text-accent-dark mb-2 text-5xl">
                {icon}
            </span>
            <p className="text-xl font-bold">{title}</p>
            {description && (
                <p className="text-gray-600 dark:text-gray-400 md:px-16 text-center text-sm">
                    {description}
                </p>
            )}
            {actions && <div className="mt-5">{actions}</div>}
        </div>
    )
}

export default memo(RichHeader)
