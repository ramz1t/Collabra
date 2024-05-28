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
    const [cookiesSettingSaved, setCookiesSettingSaved] = useLocalStorage(
        'cookiesSettingSaved',
        false
    )
    const { t } = useTranslation()
    if (isAccepted || cookiesSettingSaved) return
    return (
        <div className="bg-white dark:bg-gray-900 py-2 px-3 rounded-md shadow-md flex flex-col md:flex-row gap-3 items-end md:items-center border dark:border-slate-600">
            <div className="flex gap-3 items-center">
                <img src={cookie} className="h-7 pl-2 dark:brightness-125" />
                <p className="font-semibold px-2">{t('cookies_banner')}</p>
            </div>
            <div className="flex gap-3 items-center">
                <Button
                    action={() => {
                        setIsAccepted(true)
                        setCookiesSettingSaved(true)
                    }}
                    style="primary"
                >
                    {t('accept')}
                </Button>
                <Button
                    action={() => setCookiesSettingSaved(true)}
                    style="tetriary"
                >
                    {t('decline')}
                </Button>
            </div>
        </div>
    )
}

export default CookiesModal
