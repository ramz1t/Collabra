import useLocalStorage from '../../hooks/useLocalStorage'
import { useTranslation } from 'react-i18next'
import { Button } from '../index'
import cookie from '../../assets/images/cookie-icon.svg'
import React from 'react'

const CookiesModal = (): React.ReactElement | undefined => {
    const [isAccepted, setIsAccepted] = useLocalStorage<boolean>(
        'cookiesAccepted',
        false
    )
    const [cookiesSettingSaved, setCookiesSettingSaved] =
        useLocalStorage<boolean>('cookiesSettingSaved', false)
    const { t } = useTranslation()
    if (isAccepted || cookiesSettingSaved) return
    return (
        <div className="bg-white dark:bg-gray-900 py-2 px-3 rounded-md shadow-md flex flex-col md:flex-row gap-3 items-end md:items-center border dark:border-slate-600">
            <div className="flex gap-3 items-center">
                <img
                    alt="cookie image"
                    src={cookie}
                    className="h-7 pl-2 dark:brightness-125"
                />
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
                    style="tertiary"
                >
                    {t('decline')}
                </Button>
            </div>
        </div>
    )
}

export default CookiesModal
