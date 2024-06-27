import { Divider } from '../index'
import cn from 'classnames'
import { useTranslation } from 'react-i18next'
import React from 'react'

export interface ListWithHeaderProps {
    title?: string
    emptyState?: React.ReactNode
    loadingState?: React.ReactNode
    isEmpty?: boolean
    isLoading?: boolean
    children: React.ReactNode
    className?: string
    cols?: number
}

const ListWithHeader = ({
    title,
    emptyState,
    loadingState,
    isEmpty,
    isLoading,
    children,
    className,
    cols = 2,
}: ListWithHeaderProps): React.ReactElement => {
    const { t } = useTranslation()
    return (
        <div className={cn('flex flex-col', className)}>
            {title && (
                <p className="font-semibold pb-1 text-gray-600 dark:text-gray-400 text-sm">
                    {title}
                </p>
            )}
            <Divider horizontal className="bg-gray-200" />
            <ul
                style={{
                    gridTemplateColumns: `repeat(${cols}, 1fr)`,
                }}
                className={cn(
                    'mt-3 grid max-md:!grid-cols-1 gap-3 max-h-80 overflow-y-auto overscroll-contain',
                    isEmpty ? '!grid-cols-1' : null
                )}
            >
                {isLoading
                    ? loadingState || t('loading')
                    : isEmpty
                      ? emptyState || t('nothing_found')
                      : children}
            </ul>
            <Divider horizontal className="bg-gray-200 mt-3" />
        </div>
    )
}

export default ListWithHeader
