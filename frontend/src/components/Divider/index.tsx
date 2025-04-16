import cn from 'classnames'
import React, { memo } from 'react'

export interface DividerProps {
    vertical?: boolean
    horizontal?: boolean
    className?: string
}

const Divider = ({
    vertical,
    horizontal,
    className,
}: DividerProps): React.ReactElement => {
    return (
        <span
            className={cn(
                vertical
                    ? 'min-w-px h-full row-span-full'
                    : horizontal
                      ? 'min-h-px w-full col-span-full'
                      : '',
                'bg-accent/30 dark:bg-accent-dark/50',
                className
            )}
        ></span>
    )
}

export default memo(Divider)
