import React, { useCallback, useEffect } from 'react'
import { Button } from '../index'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { IoAlert } from 'react-icons/io5'
import { ButtonProps } from '../Button'
import useScreenSize from '../../hooks/useScreenSize'
import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '../../../tailwind.config'

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
    isOpen = false,
    isLoading,
    extraButtons,
    duration = 150,
    disabledClickOutside,
    closeOnSuccess,
    disabled,
    children,
}: DialogWindowProps): React.ReactElement => {
    const { t } = useTranslation()
    const { isTablet } = useScreenSize()
    const fullConfig = resolveConfig(tailwindConfig)

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

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: duration / 1000 }}
                    className="fixed z-[900] h-dvh w-dvw bg-slate-500/25 dark:bg-slate-950/65 backdrop-blur-sm top-0 left-0 flex items-center justify-center"
                >
                    <motion.div
                        initial={{
                            scale: 0.85,
                            translateX: isTablet
                                ? fullConfig.theme.spacing['nav-half']
                                : 0,
                            translateY: isTablet
                                ? 0
                                : fullConfig.theme.spacing['nav-half'],
                        }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 1.15 }}
                        transition={{ duration: duration / 1000 }}
                        className="dialog w-11/12 max-w-2xl md:w-full max-md:-translate-y-nav-half md:translate-x-nav-half shadow-2xl rounded-lg overflow-hidden"
                    >
                        <div className="flex p-7 flex-col items-end bg-white dark:bg-slate-900">
                            <div className="flex gap-5 items-center w-full">
                                <div className="text-4xl text-accent dark:text-accent-dark">
                                    {icon || <IoAlert />}
                                </div>
                                <p className="font-bold text-lg">
                                    {title || t('are_you_sure')}
                                </p>
                            </div>
                            <div className="w-full pt-3 md:pl-14">
                                {description && (
                                    <p className="text-gray-600 dark:text-gray-400">
                                        {description}
                                    </p>
                                )}
                                {children}
                            </div>
                        </div>
                        <div className="flex items-center px-5 py-3 bg-gray-100 dark:bg-slate-800 gap-3 w-full">
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
        </AnimatePresence>
    )
}

export default DialogWindow
