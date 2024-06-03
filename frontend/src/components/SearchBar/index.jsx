import { Button, Input } from '../index.js'
import { AnimatePresence, motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { IoSearchOutline } from 'react-icons/io5'
import cn from 'classnames'

const SearchBar = ({ placeholder, inputInstance, className }) => {
    const { t } = useTranslation()

    return (
        <div className={cn('flex w-full items-center flex-row', className)}>
            <Input
                instance={inputInstance}
                placeholder={placeholder}
                innerIcon={<IoSearchOutline />}
            />
            <AnimatePresence>
                {inputInstance.rawValue && (
                    <motion.div
                        initial={{ width: 0, paddingRight: 0, opacity: 0 }}
                        animate={{
                            width: 'fit-content',
                            opacity: 1,
                        }}
                        exit={{ width: 0, opacity: 0 }}
                        transition={{ duration: 0.05 }}
                        className="overflow-hidden h-10 flex items-center justify-center"
                    >
                        <Button
                            style="tertiary"
                            className="hover:text-accent rounded-md pl-7 pr-2 h-full"
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
