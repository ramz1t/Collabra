import React, {
    useCallback,
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
} from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { createPortal } from 'react-dom'
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
    const [isOpen, setIsOpen] = useState(false)
    const [coords, setCoords] = useState({ top: 0, left: 0 })
    const btnRef = useRef<HTMLButtonElement>(null)
    const menuRef = useRef<HTMLUListElement>(null)
    const { isTablet } = useScreenSize()

    const updatePosition = useCallback(() => {
        if (!(btnRef.current && menuRef.current)) return
        const rect = btnRef.current.getBoundingClientRect()
        const menuWidth = menuRef.current.offsetWidth
        setCoords({
            top: rect.bottom + window.scrollY,
            left:
                rect.left +
                (position === 'left' ? rect.width : 0) -
                (position === 'left' ? menuWidth : 0),
        })
    }, [position])

    useLayoutEffect(() => {
        if (isOpen) {
            updatePosition()
        }
    }, [isOpen, updatePosition])

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target as Node) &&
                btnRef.current &&
                !btnRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false)
            }
        }

        const handleScroll = () => {
            setIsOpen(false)
        }

        window.addEventListener('click', handleClickOutside)
        window.addEventListener('scroll', handleScroll)
        window.addEventListener('resize', updatePosition)
        return () => {
            window.removeEventListener('click', handleClickOutside)
            window.removeEventListener('scroll', handleScroll)
            window.removeEventListener('resize', updatePosition)
        }
    }, [])

    if (actions.length === 0) return null

    return (
        <>
            <div className={cn('inline-block', className)} key={`${isTablet}`}>
                <Button
                    ref={btnRef}
                    className="min-h-10 min-w-10"
                    action={() => setIsOpen((prev) => !prev)}
                >
                    {children}
                </Button>
            </div>
            {createPortal(
                <AnimatePresence>
                    {isOpen && (
                        <motion.ul
                            ref={menuRef}
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            transition={{ duration: 0.125 }}
                            className={cn(
                                'absolute z-50 border dark:border-0 divide-y dark:divide-gray-700 min-w-20 bg-white/70 dark:bg-white/5 backdrop-blur-2xl rounded-lg overflow-hidden drop-shadow-xl grid',
                                position === 'left'
                                    ? 'origin-top-right'
                                    : 'origin-top-left'
                            )}
                            style={{
                                position: 'absolute',
                                top: coords.top,
                                left: coords.left,
                                pointerEvents: isOpen ? 'auto' : 'none',
                            }}
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
                </AnimatePresence>,
                document.body
            )}
        </>
    )
}

export default Menu
