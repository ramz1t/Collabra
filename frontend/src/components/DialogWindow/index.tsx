import React, { memo, useCallback, useEffect, useRef, useState } from 'react'
import { Button } from '../index'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { IoAlert } from 'react-icons/io5'
import { ButtonProps } from '../Button'
import useScreenSize from '../../hooks/useScreenSize'
import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '../../../tailwind.config'
import cn from 'classnames'
import { createPortal } from 'react-dom'
import { IoExpandOutline, IoContractOutline } from 'react-icons/io5'
import useLocalStorage from '../../hooks/useLocalStorage'

export interface DialogWindowProps {
    icon?: React.ReactElement | React.ReactNode
    title?: string
    description?: string
    closeButtonText?: React.ReactNode
    successButtonStyle?: ButtonProps['style']
    successButtonText?: string
    isOpen: boolean
    isLoading?: boolean
    extraButtons?: React.ReactElement[] | React.ReactElement | null
    duration?: number
    disabledClickOutside?: boolean
    closeOnSuccess?: boolean
    close(): void
    onSuccess?: (() => void) | (() => Promise<void>)
    disabled?: boolean
    children?: React.ReactNode
    isCover?: boolean
    className?: string
    expandable?: boolean
}

const DialogWindow = ({
    icon,
    title,
    description,
    onSuccess,
    close,
    closeButtonText,
    successButtonStyle = 'destructive',
    successButtonText,
    isOpen,
    isLoading,
    extraButtons,
    duration = 150,
    disabledClickOutside = false,
    closeOnSuccess,
    disabled,
    children,
    isCover,
    className,
    expandable,
}: DialogWindowProps): React.ReactElement => {
    const { t } = useTranslation()
    const { isTablet } = useScreenSize()
    const fullConfig = resolveConfig(tailwindConfig)
    const dialogRef = useRef<HTMLDivElement>(null)
    const [isFullscreen, setIsFullscreen] = useLocalStorage(
        'dialogFullScreen',
        false
    )

    useEffect(() => {
        if (isOpen) {
            const scrollTop: number =
                window.scrollY || document.documentElement.scrollTop
            const scrollLeft: number =
                window.scrollX || document.documentElement.scrollLeft
            window.onscroll = () => window.scrollTo(scrollLeft, scrollTop)
        } else {
            window.onscroll = (): void => {}
        }
    }, [isOpen])

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                !disabledClickOutside &&
                isOpen &&
                dialogRef.current &&
                !dialogRef.current.contains(event.target as Node)
            ) {
                close()
            }
        }

        document.addEventListener('mousedown', handleClickOutside)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isOpen, dialogRef, close])

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent): void => {
            if (e.key === 'Escape') close()
        }

        window.addEventListener('keydown', handleKeyDown)

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
            window.onscroll = (): void => {}
        }
    }, [])

    const handleSubmit = useCallback(() => {
        if (!onSuccess) return
        if (disabled) return
        const result = onSuccess()

        if (result instanceof Promise) {
            result.then(() => closeOnSuccess && close())
        } else {
            closeOnSuccess && close()
        }
    }, [onSuccess, disabled, closeOnSuccess])

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: duration / 1000 }}
                    key={`${isTablet}`}
                    className="fixed z-[999] h-dvh w-dvw bg-slate-500/25 dark:bg-slate-950/65 backdrop-blur-sm top-0 left-0 flex items-center justify-center"
                >
                    <motion.div
                        initial={{
                            scale: 0.85,
                        }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 1.15 }}
                        transition={{ duration: duration / 1000 }}
                        className={cn(
                            isCover
                                ? 'max-md:max-h-dvh max-md:min-h-dvh'
                                : 'max-md:max-h-[80dvh] max-md:w-11/12',
                            isFullscreen
                                ? 'md:max-h-dvh md:min-h-dvh min-w-[100dvw]'
                                : 'md:max-h-[90dvh] max-w-2xl',
                            (isCover && !isTablet) || isFullscreen
                                ? 'rounded-none'
                                : 'rounded-lg',
                            'relative bg-white dark:bg-slate-900 overflow-y-auto w-full shadow-2xl overflow-hidden flex flex-col',
                            className
                        )}
                        ref={dialogRef}
                    >
                        {isTablet && expandable && (
                            <Button
                                className="absolute top-5 right-5 text-black dark:text-white z-[999] text-lg"
                                action={() =>
                                    setIsFullscreen((prevState) => !prevState)
                                }
                            >
                                {isFullscreen ? (
                                    <IoContractOutline />
                                ) : (
                                    <IoExpandOutline />
                                )}
                            </Button>
                        )}
                        <div
                            className={cn(
                                isCover && 'max-md:pt-3',
                                'flex gap-5 items-center w-full fixed:top-0 p-7 pb-3 sticky top-0 bg-white dark:bg-slate-900'
                            )}
                        >
                            <div className="text-4xl text-accent dark:text-accent-dark">
                                {icon || <IoAlert />}
                            </div>
                            <p className="font-bold text-lg">
                                {title || t('are_you_sure')}
                            </p>
                        </div>
                        <div className="flex px-7 pb-7 flex-col items-end overflow-y-auto grow">
                            <div className="w-full md:pl-14">
                                {description && (
                                    <p className="text-gray-600 dark:text-gray-400">
                                        {description}
                                    </p>
                                )}
                                {children}
                            </div>
                        </div>
                        <div className="flex items-center px-5 py-3 bg-gray-100 dark:bg-slate-800 gap-3 w-full sticky z-40 bottom-0">
                            {extraButtons}
                            <Button
                                action={close}
                                className="ml-auto min-h-10 bg-white dark:bg-slate-700 transiton-all duration-75 rounded-md px-3 border border-slate-400 dark:border-slate-600"
                            >
                                {closeButtonText
                                    ? closeButtonText
                                    : t('cancel')}
                            </Button>
                            {onSuccess && (
                                <Button
                                    style={successButtonStyle}
                                    action={handleSubmit}
                                    isLoading={isLoading}
                                    disabled={disabled}
                                    className="disabled:!bg-gray-200 disabled:dark:!bg-slate-900"
                                >
                                    {isLoading
                                        ? t('loading')
                                        : successButtonText || t('close')}
                                </Button>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body
    )
}

export default memo(DialogWindow)
