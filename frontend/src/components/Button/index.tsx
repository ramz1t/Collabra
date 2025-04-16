import cn from 'classnames'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import React, { memo } from 'react'

export interface ButtonProps {
    style?: 'primary' | 'secondary' | 'tertiary' | 'destructive'
    children: React.ReactNode
    className?: string
    type?: 'submit' | 'reset' | 'button'
    w_full?: boolean
    disabled?: boolean
    to?: string
    isLoading?: boolean
    loadingText?: React.ReactNode
    action?: () => void
    target?: string
}

const Button: React.FC<ButtonProps> = ({
    style,
    action,
    children,
    className,
    type = 'button',
    w_full,
    disabled,
    to,
    isLoading,
    loadingText,
    target,
}) => {
    const { t } = useTranslation()

    const buttonStyles = {
        primary:
            'bg-accent dark:bg-accent-dark border-accent dark:border-accent-dark text-white font-bold hover:bg-accent/90 dark:hover:bg-accent-dark/90',
        secondary:
            'border-accent border-2 dark:border-accent-dark text-accent hover:bg-accent/5 dark:text-accent-dark dark:hover:bg-accent-dark/5',
        tertiary: 'text-slate-600 dark:text-slate-400',
        destructive:
            'bg-red-600 dark:bg-red-800 border-red-600 text-white font-bold hover:bg-red-700 dark:hover:bg-red-900 hover:border-red-700',
    }

    const classes = cn(
        'flex items-center justify-center gap-3 transition-all duration-75 h-fit whitespace-nowrap rounded-md',
        'focus-visible:ring-accent focus-visible:dark:ring-accent-dark focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
        'disabled:cursor-not-allowed disabled:bg-gray-100 disabled:dark:bg-slate-800 disabled:dark:border-slate-500 disabled:!text-slate-500 disabled:dark:!text-slate-400',
        style ? buttonStyles[style] : '',
        ['primary', 'secondary', 'destructive'].includes(style ?? '')
            ? 'px-4 min-h-10'
            : 'hover:opacity-80',
        w_full ? 'w-full' : 'w-fit',
        className
    )

    const content = isLoading ? loadingText ?? t('loading') : children

    if (to) {
        return (
            <Link to={to} className={classes} target={target}>
                {content}
            </Link>
        )
    }

    return (
        <button
            className={classes}
            type={type}
            disabled={disabled || isLoading}
            onClick={action}
        >
            {content}
        </button>
    )
}

export default memo(Button)
