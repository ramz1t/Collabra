import { Button, Input } from '../index.js'
import { AnimatePresence, motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import cn from 'classnames'

const SearchBar = ({ placeholder, inputInstance, className }) => {
    const { t } = useTranslation()

    return (
        <div
            className={cn(
                'flex gap-2 md:gap-5 w-full items-center flex-row',
                className
            )}
        >
            <Input instance={inputInstance} placeholder={placeholder} />
            <AnimatePresence>
                {inputInstance.rawValue && (
                    <motion.div
                        initial={{ width: 0, paddingRight: 0, opacity: 0 }}
                        animate={{
                            width: 'fit-content',
                            paddingRight: '12px',
                            opacity: 1,
                        }}
                        exit={{ width: 0, paddingRight: '12px', opacity: 0 }}
                        transition={{ duration: 0.05 }}
                        className="overflow-hidden"
                    >
                        <Button
                            style="tetriary"
                            action={() => inputInstance.clear()}
                        >
                            {t('cancel')}
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default SearchBar
