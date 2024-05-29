import { useEffect } from 'react'
import { Button } from '../index.js'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'

const Dialog = ({
    icon,
    title,
    description,
    onAbort,
    onSuccess,
    close,
    successButtonStyle = 'destructive',
    successButtonText,
    open = false,
    extraActions,
}) => {
    const { t } = useTranslation()
    useEffect(() => {
        if (open) {
            const scrollTop =
                window.scrollY || document.documentElement.scrollTop
            const scrollLeft =
                window.scrollX || document.documentElement.scrollLeft
            window.onscroll = () => window.scrollTo(scrollLeft, scrollTop)
        } else {
            window.onscroll = () => {}
        }
    }, [open])

    useEffect(() => {
        return () => (window.onscroll = () => {})
    }, [])

    return (
        <AnimatePresence>
            {open && (
                <motion.div className="fixed z-[900] h-dvh w-dvw bg-slate-500/25 backdrop-blur-sm top-0 left-0 flex items-center justify-center">
                    <AnimatePresence>
                        {open && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{
                                    opacity: 1,
                                }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.1 }}
                                className="w-11/12 md:w-1/2 xl:w-2/5 md:translate-x-[36px]"
                            >
                                <div className="rounded-lg overflow-hidden">
                                    <div className="flex gap-5 p-7 bg-white w-full">
                                        <div className="text-4xl text-accent">
                                            {icon}
                                        </div>
                                        <div className="w-full">
                                            <p className="font-bold text-lg">
                                                {title}
                                            </p>
                                            {description && (
                                                <p className="text-gray-600">
                                                    {description}
                                                </p>
                                            )}
                                            {extraActions}
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-end px-5 py-3 bg-gray-100 gap-3 w-full">
                                        <Button
                                            action={() =>
                                                onAbort().then(() => close())
                                            }
                                            className="min-h-10 bg-white transiton-all duration-75 rounded-md px-3 border border-slate-400"
                                        >
                                            {t('cancel')}
                                        </Button>
                                        {onSuccess && (
                                            <Button
                                                style={successButtonStyle}
                                                action={() =>
                                                    onSuccess().then(() =>
                                                        close()
                                                    )
                                                }
                                            >
                                                {successButtonText}
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default Dialog
