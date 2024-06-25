import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import AuthContext, { IAuthContext } from '../../contexts/AuthContext.js'
import { Button } from '../../components'
import { IoArrowForward } from 'react-icons/io5'

const Hero = (): React.ReactElement => {
    const { t } = useTranslation()
    const { user } = useContext(AuthContext) as IAuthContext

    return (
        <div className="relative isolate md:pt-7 lg:px-8">
            <div className="mx-auto max-w-2xl py-14 sm:py-48 lg:py-56">
                <div className="text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-200 sm:text-6xl">
                        {t('hero_title')}
                    </h1>
                    <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-200">
                        Anim aute id magna aliqua ad ad non deserunt sunt. Qui
                        irure qui lorem cupidatat commodo. Elit sunt amet fugiat
                        veniam occaecat fugiat aliqua.
                    </p>
                    <div className="mt-10 max-md:flex-col gap-y-6 flex items-center justify-center gap-x-6">
                        <Button
                            to={user ? '/teams' : '/login'}
                            style="primary"
                            className="text-sm"
                        >
                            {user ? t('open_teams') : t('get_started')}
                        </Button>
                        <Button
                            to="https://github.com/alexzawadsky/Collabra"
                            className="font-semibold text-sm text-gray-600 dark:text-gray-400"
                            target="_blank"
                        >
                            {t('learn_on_gh')} <IoArrowForward />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero
