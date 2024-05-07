import useLocalStorage from '../../hooks/useLocalStorage.js'
import { useTranslation } from 'react-i18next'
import { Button } from '../index.js'
import { useState } from 'react'
import cookie from '../../assets/images/cookie-icon.svg'

const CookiesModal = () => {
    const [isAccepted, setIsAccepted] = useLocalStorage(
        'cookiesAccepted',
        false
    )
    const [isClosed, setIsClosed] = useState(false)
    const { t } = useTranslation()
    if (isAccepted || isClosed) return
    return (
        <div className="bg-white dark:bg-slate-800 fixed right-2 bottom-2 py-2 px-3 rounded-md shadow-md flex gap-3 items-center border dark:border-slate-600">
            <img src={cookie} className="h-7 pl-2 dark:brightness-125" />
            <p className="font-semibold px-2">{t('cookies_banner')}</p>
            <Button action={() => setIsAccepted(true)} style="primary">
                {t('accept')}
            </Button>
            <Button action={() => setIsClosed(true)} style="tetriary">
                {t('decline')}
            </Button>
        </div>
    )
}

export default CookiesModal
