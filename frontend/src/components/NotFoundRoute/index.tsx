import { Button } from '../index'
import { IoArrowBack } from 'react-icons/io5'
import notFound from '../../assets/images/not-found.svg'
import React from 'react'
import { useTranslation } from 'react-i18next'

const NotFoundRoute = () => {
    const { t } = useTranslation()

    return (
        <div className="grow flex items-center justify-center">
            <div className="flex gap-32 items-center max-w-5xl">
                <div className="grid gap-3 h-fit">
                    <h1 className="text-5xl font-bold">{t('not_found')}</h1>
                    <p className="text-2xl text-gray-600">
                        {t('not_found_desc')}
                    </p>
                    <div className="flex gap-5 mt-5 items-center">
                        <Button
                            style="primary"
                            to="/"
                            className="font-semibold"
                        >
                            <IoArrowBack />
                            {t('to_main')}
                        </Button>
                        <Button
                            style="secondary"
                            className="px-5 py-2"
                            action={() => window.location.reload()}
                        >
                            {t('refresh')}
                        </Button>
                    </div>
                </div>
                <img src={notFound} />
            </div>
        </div>
    )
}

export default NotFoundRoute
