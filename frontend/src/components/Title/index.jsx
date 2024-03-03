import cn from 'classnames'
import { Button } from '../index.js'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { IoChevronBack } from 'react-icons/io5'

const Title = ({
    children,
    className,
    position = 'center',
    backButton = false,
}) => {
    const { t } = useTranslation()
    const navigate = useNavigate()
    return (
        <h1
            className={cn(
                'font-bold text-xl md:text-3xl pt-5 pb-10 mx-auto w-full flex gap-3 items-center sticky top-0 bg-white dark:bg-slate-800 after:bg-red-500 after:w-full after:absolute',
                position === 'center' ? 'justify-center' : '',
                position === 'left' ? 'justify-start' : '',
                position === 'right' ? 'justify-end' : '',
                backButton ? '!justify-start' : '',
                className
            )}
        >
            {backButton && (
                <Button
                    action={() => navigate(-1)}
                    className="text-sm md:text-base !gap-1 mr-3"
                    style="tetriary"
                >
                    <IoChevronBack />
                    {t('back')}
                </Button>
            )}
            {children}
        </h1>
    )
}

export default Title
