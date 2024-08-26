import React, { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import useScreenSize from '../../hooks/useScreenSize'
import { Button } from '../index'
import { useTranslation } from 'react-i18next'
import cn from 'classnames'

export interface MenuAction {
    title: string
    icon: React.ReactNode
    action(): void
    color?: string
    disabled?: boolean
}

interface MenuProps {
    actions: MenuAction[]
    children: React.ReactNode
    className?: string
    position?: 'left' | 'right'
}

const Menu = ({
    children,
    actions,
    className,
    position = 'right',
}: MenuProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const menuRef = useRef<HTMLDivElement>(null)
    const { isTablet } = useScreenSize()

    const handleClickOutside = useCallback(
        (event: MouseEvent) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false)
            }
        },
        [menuRef, setIsOpen]
    )

    const handlePageScroll = useCallback(() => {
        setIsOpen(false)
    }, [setIsOpen])

    useEffect(() => {
        window.addEventListener('scroll', handlePageScroll)
        window.addEventListener('click', handleClickOutside)
        return () => {
            window.removeEventListener('scroll', handlePageScroll)
            window.removeEventListener('click', handleClickOutside)
        }
    }, [])

    return (
        <div
            className={cn('relative', className)}
            ref={menuRef}
            key={`${isTablet}`}
        >
            <div
                className="hover:cursor-pointer min-h-10 flex items-center justify-center min-w-10"
                onClick={() => setIsOpen((prev) => !prev)}
            >
                {children}
            </div>
            <AnimatePresence>
                {isOpen && (
                    <motion.ul
                        initial={{
                            opacity: 0,
                            scale: 0.5,
                        }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                        }}
                        exit={{
                            opacity: 0,
                            scale: 0.5,
                        }}
                        transition={{
                            duration: 0.125,
                        }}
                        style={{
                            pointerEvents: isOpen ? 'auto' : 'none',
                        }}
                        className={cn(
                            position === 'left'
                                ? 'origin-top-right right-0'
                                : '',
                            position === 'right'
                                ? 'origin-top-left left-0'
                                : '',
                            'absolute z-50 top-11 border dark:border-0 divide-y dark:divide-gray-700 min-w-20 max-md:max-h-fit bg-white/70 dark:bg-white/5 backdrop-blur-2xl rounded-lg overflow-hidden drop-shadow-xl grid'
                        )}
                    >
                        {actions.map((action, key) => (
                            <button
                                className="flex items-center justify-between whitespace-nowrap gap-8 px-3 min-h-9 disabled:hover:cursor-not-allowed disabled:text-gray-300 dark:disabled:text-gray-600 [&:not(:disabled)]:hover:bg-gray-100/50 [&:not(:disabled)]:dark:hover:bg-white/[0.025]"
                                key={key}
                                onClick={() => {
                                    action.action()
                                    setIsOpen(false)
                                }}
                                disabled={action.disabled}
                                style={{ color: action.color }}
                            >
                                {action.title}
                                {action.icon}
                            </button>
                        ))}
                    </motion.ul>
                )}
            </AnimatePresence>
        </div>
    )
}

export default Menu
