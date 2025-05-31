import React from 'react'
import BasePopupMenu from './BasePopupMenu'
import { MenuAction } from '../../types'

interface MenuProps {
    actions: MenuAction[]
    children: React.ReactNode
    className?: string
    position?: 'left' | 'right'
    verticalPositionOffset?: number
}

const Menu = ({
    actions,
    children,
    className,
    position,
    verticalPositionOffset = 0,
}: MenuProps) => {
    if (actions.length === 0) return null

    const menuContent = (
        <>
            {actions.map((action, idx) => (
                <button
                    key={idx}
                    className="flex items-center w-full justify-between whitespace-nowrap gap-8 px-3 min-h-9 disabled:hover:cursor-not-allowed disabled:!text-gray-300 dark:disabled:!text-gray-600 [&:not(:disabled)]:hover:bg-gray-100/50 [&:not(:disabled)]:dark:hover:bg-white/[0.025]"
                    onClick={action.action}
                    disabled={action.disabled}
                    style={{ color: action.color }}
                >
                    {action.title}
                    {action.icon}
                </button>
            ))}
        </>
    )

    return (
        <BasePopupMenu
            position={position}
            className={className}
            buttonContent={children}
            menuContent={menuContent}
            verticalPositionOffset={verticalPositionOffset}
        />
    )
}

export default Menu
