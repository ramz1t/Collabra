import cn from 'classnames'
import { PiBinocularsBold } from 'react-icons/pi'
import { useTranslation } from 'react-i18next'
import { Button } from '../index'
import { useContext } from 'react'
import AuthContext, { IAuthContext } from '../../contexts/AuthContext'
import { useUser } from '../../api/user'
import { AnimatePresence, motion } from 'framer-motion'

const DemoControls = () => {
    const { user } = useContext(AuthContext) as IAuthContext

    if (!user) return
    return (
        <AnimatePresence>
            {user && (
                <motion.div
                    initial={{ bottom: -30, scale: 0.8, opacity: 0 }}
                    animate={{ bottom: 15, scale: 1, opacity: 100 }}
                    exit={{ bottom: -30, scale: 0.8, opacity: 0 }}
                    transition={{ duration: 0.1 }}
                    style={{ left: '50%', translateX: '-50%' }}
                    className="fixed z-[999]"
                >
                    <DemoControlsInner />
                </motion.div>
            )}
        </AnimatePresence>
    )
}

const DemoControlsInner = () => {
    const { t } = useTranslation()
    const { logoutUser } = useContext(AuthContext) as IAuthContext
    const { data: user, isLoading, isError } = useUser('me')

    if (isLoading || isError || !user?.is_demo) return
    return (
        <div
            className={cn(
                'flex items-center',
                'bg-white dark:bg-gray-900 dark:border-gray-800 border p-5 rounded-full shadow-md'
            )}
        >
            <span className="text-accent dark:text-accent-dark text-2xl mr-4">
                <PiBinocularsBold />
            </span>
            <p className="font-semibold">{t('demo_mode_active')}</p>
            <Button
                className="ml-4 text-accent dark:text-accent-dark font-semibold"
                action={logoutUser}
            >
                {t('exit')}
            </Button>
        </div>
    )
}

export default DemoControls
