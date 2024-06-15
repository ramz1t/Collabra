import { IoChevronBackOutline } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import React, { useMemo } from 'react'
import cn from 'classnames'

interface BackButtonProps {
    text?: string
    className?: string
}

const BackButton = ({
    text,
    className,
}: BackButtonProps): React.ReactElement => {
    const { t } = useTranslation()
    const to = useMemo(
        () =>
            window.location.pathname.substring(
                0,
                window.location.pathname.lastIndexOf('/')
            ),
        [window.location.pathname]
    )
    return (
        <Link
            to={to}
            className={cn(
                'text-lg flex items-center gap-1.5 hover:text-accent dark:hover:text-accent-dark w-fit',
                className
            )}
        >
            <IoChevronBackOutline />
            {text ? text : t('back')}
        </Link>
    )
}

export default BackButton
