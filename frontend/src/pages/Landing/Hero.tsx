import React, { useCallback, useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'
import AuthContext, { IAuthContext } from '../../contexts/AuthContext.js'
import { Button, DialogWindow } from '../../components'
import { IoArrowForward } from 'react-icons/io5'
import { PiBinocularsBold } from 'react-icons/pi'

const Hero = (): React.ReactElement => {
    const { t } = useTranslation()
    const { user, loginUser } = useContext(AuthContext) as IAuthContext
    const [demoDialogOpen, setDemoDialogOpen] = useState(false)

    const startDemo = useCallback(() => {
        loginUser({
            email: 'demo@collabra.com',
            password: '12345678',
        })
    }, [loginUser])

    return (
        <div className="relative isolate md:pt-7 lg:px-8">
            <div className="mx-auto max-w-2xl py-14 sm:py-48 lg:py-56 lg:pt-48">
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
                        {user ? (
                            <Button
                                to="/teams"
                                style="primary"
                                className="text-sm"
                            >
                                {t('open_teams')}
                            </Button>
                        ) : (
                            <Button
                                action={() => setDemoDialogOpen(true)}
                                style="primary"
                                className="text-sm"
                            >
                                <PiBinocularsBold />
                                {t('demo_mode')}
                            </Button>
                        )}
                        <DialogWindow
                            isOpen={demoDialogOpen}
                            close={() => setDemoDialogOpen(false)}
                            icon={<PiBinocularsBold />}
                            title={t('demo_mode')}
                            successButtonText={t('start')}
                            successButtonStyle="primary"
                            onSuccess={startDemo}
                        >
                            {t('demo_mode_desc')}
                        </DialogWindow>
                        <Button
                            to="https://github.com/ramz1t/Collabra"
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
