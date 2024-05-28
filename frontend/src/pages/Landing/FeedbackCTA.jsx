import { useTranslation } from 'react-i18next'
import { IoArrowForwardOutline } from 'react-icons/io5'

const FeedbackCTA = () => {
    const { t } = useTranslation()
    return (
        <div className="flex items-start md:items-center gap-5 justify-between py-20 md:py-32 flex-col md:flex-row">
            <div className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
                <p>{t('feedback_1')}</p>
                <p>{t('feedback_2')}</p>
            </div>
            <a
                href="#"
                className="rounded-md bg-accent dark:bg-accent-dark px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-accent/90 transition-colors duration-75 dark:hover:bg-accent-dark/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 flex gap-3 items-center"
            >
                {t('send')}
                <IoArrowForwardOutline />
            </a>
        </div>
    )
}

export default FeedbackCTA
