import { useEffect } from 'react'
import { Button } from '../index.js'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { IoAlert } from 'react-icons/io5'

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
    extraActions,
    extraButtons,
    duration = 150,
    disabledClickOutside = false,
}) => {
    const { t } = useTranslation()

    useEffect(() => {
        if (isOpen) {
            const scrollTop =
                window.scrollY || document.documentElement.scrollTop
            const scrollLeft =
                window.scrollX || document.documentElement.scrollLeft
            window.onscroll = () => window.scrollTo(scrollLeft, scrollTop)
        } else {
            window.onscroll = () => {}
        }
    }, [isOpen])

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') close()
        }

        window.addEventListener('keydown', handleKeyDown)

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
            window.onscroll = () => {}
        }
    }, [])

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: duration / 1000 }}
                    className="fixed z-[900] h-dvh w-dvw bg-slate-500/25 dark:bg-slate-950/50 backdrop-blur-sm top-0 left-0 flex items-center justify-center"
                >
                    {isOpen && (
                        <motion.div
                            initial={{ scale: 0.85 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 1.15 }}
                            transition={{ duration: duration / 1000 }}
                            className="dialog w-11/12 max-w-2xl md:w-full max-md:-translate-y-9 md:translate-x-9 shadow-2xl rounded-lg overflow-hidden"
                        >
                            <div className="flex p-7 flex-col items-end bg-white dark:bg-slate-900">
                                <div className="flex gap-5 items-center w-full">
                                    <div className="text-4xl text-accent dark:text-accent-dark">
                                        {icon || <IoAlert />}
                                    </div>
                                    <p className="font-bold text-lg">{title}</p>
                                </div>
                                <div className="w-full pl-14">
                                    {description && (
                                        <p className="text-gray-600 dark:text-gray-400">
                                            {description}
                                        </p>
                                    )}
                                    {extraActions}
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
                                        action={onSuccess}
                                        isLoading={isLoading}
                                    >
                                        {isLoading
                                            ? t('loading')
                                            : successButtonText}
                                    </Button>
                                )}
                            </div>
                        </motion.div>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default DialogWindow
