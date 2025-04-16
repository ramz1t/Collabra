import { IoChevronBackOutline } from 'react-icons/io5'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import React, { memo } from 'react'
import cn from 'classnames'

interface BackButtonProps {
    text?: string
    className?: string
}

const BackButton: React.FC<BackButtonProps> = ({ text, className }) => {
    const { t } = useTranslation()
    const location = useLocation()

    const to =
        location.pathname.substring(0, location.pathname.lastIndexOf('/')) ||
        '/'

    return (
        <Link
            to={to}
            className={cn(
                'text-lg flex items-center gap-1.5 hover:text-accent dark:hover:text-accent-dark w-fit',
                className
            )}
        >
            <IoChevronBackOutline />
            {text ?? t('back')}
        </Link>
    )
}

export default memo(BackButton)
