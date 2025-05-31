import React, { useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import useMenu from '../../hooks/useMenu'
import { Button } from '../index'
import cn from 'classnames'
import { createPortal } from 'react-dom'
import { MenuPosition } from '../../types'

type BasePopupMenuProps = {
    position?: MenuPosition
    className?: string
    buttonContent: React.ReactNode
    menuContent: React.ReactNode
    onOpenChange?: (open: boolean) => void
    verticalPositionOffset?: number
}

const BasePopupMenu = ({
    position = 'right',
    className,
    buttonContent,
    menuContent,
    onOpenChange,
    verticalPositionOffset,
}: BasePopupMenuProps) => {
    const btnRef = useRef<HTMLButtonElement>(null)
    const menuRef = useRef<HTMLUListElement>(null)
    const { coords, placement, isOpen, setIsOpen, updatePosition } = useMenu(
        btnRef,
        menuRef,
        position,
        verticalPositionOffset
    )

    return (
        <>
            <div className={cn('inline-block', className)}>
                <Button
                    ref={btnRef}
                    className="min-h-10"
                    action={() => {
                        setIsOpen((prev) => {
                            const next = !prev
                            onOpenChange?.(next)
                            return next
                        })
                    }}
                >
                    {buttonContent}
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
                                'absolute z-50 border dark:border-0 divide-y dark:divide-gray-700 min-w-20 bg-white/70 dark:bg-white/5 backdrop-blur-2xl rounded-lg overflow-hidden drop-shadow-xl',
                                position === 'left'
                                    ? placement === 'top'
                                        ? 'origin-bottom-right'
                                        : 'origin-top-right'
                                    : placement === 'top'
                                      ? 'origin-bottom-left'
                                      : 'origin-top-left'
                            )}
                            style={{
                                top: coords.top,
                                left: coords.left,
                                pointerEvents: isOpen ? 'auto' : 'none',
                            }}
                            onClick={() => setIsOpen(false)}
                        >
                            {menuContent}
                        </motion.ul>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </>
    )
}

export default BasePopupMenu
