import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import AuthContext, { IAuthContext } from '../../contexts/AuthContext.js'
import { BackgroundGradient } from '../../components/index'

const Hero = (): React.ReactElement => {
    const { t } = useTranslation()
    const { user } = useContext(AuthContext) as IAuthContext

    return (
        <div>
            <div className="relative isolate md:pt-7 lg:px-8">
                <BackgroundGradient />
                <div className="mx-auto max-w-2xl py-14 sm:py-48 lg:py-56">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-200 sm:text-6xl">
                            {t('hero_title')}
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-200">
                            Anim aute id magna aliqua ad ad non deserunt sunt.
                            Qui irure qui lorem cupidatat commodo. Elit sunt
                            amet fugiat veniam occaecat fugiat aliqua.
                        </p>
                        <div className="mt-10 max-md:flex-col gap-y-6 flex items-center justify-center gap-x-6">
                            <Link
                                to={user ? '/teams' : '/login'}
                                className="rounded-md bg-accent dark:bg-accent-dark px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-accent/90 transition-colors duration-75 dark:hover:bg-accent-dark/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                {user ? t('open_teams') : t('get_started')}
                            </Link>
                            <Link
                                to="https://github.com/alexzawadsky/Collabra"
                                className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-200 hover:opacity-70 transition-all duration-75"
                                target="_blank"
                            >
                                {t('learn_on_gh')}{' '}
                                <span aria-hidden="true">→</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero
