import React, { memo, useMemo } from 'react'
import cn from 'classnames'

interface SmoothContainerProps {
    isOpen: boolean
    children: React.ReactNode
    vertical?: boolean
    duration?: number
    className?: string
}

const SmoothContainer = ({
    isOpen,
    children,
    vertical = true,
    duration = 150,
    className,
}: SmoothContainerProps) => {
    const containerStyle = useMemo(() => {
        if (vertical) {
            return {
                gridTemplateRows: isOpen ? '1fr' : '0fr',
            }
        } else {
            return {
                gridTemplateColumns: isOpen ? '1fr' : '0fr',
            }
        }
    }, [isOpen, vertical])

    return (
        <div
            className="grid transition-all duration-[--duration]"
            style={{
                ...containerStyle,
                ['--duration' as string]: `${duration}ms`,
            }}
        >
            <div
                className={cn(
                    'transition-all overflow-hidden duration-[--duration]',
                    isOpen ? 'opacity-100' : 'opacity-0',
                    className
                )}
                aria-hidden={!isOpen}
            >
                {children}
            </div>
        </div>
    )
}

export default memo(SmoothContainer)
