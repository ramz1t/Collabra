import { IoChevronBackOutline } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useMemo } from 'react'

const BackButton = () => {
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
            className="text-lg flex items-center gap-1.5 hover:text-accent dark:hover:text-accent-dark w-fit"
        >
            <IoChevronBackOutline />
            {t('back')}
        </Link>
    )
}

export default BackButton
