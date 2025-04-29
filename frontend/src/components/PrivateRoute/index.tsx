import React, { useContext } from 'react'
import { Outlet } from 'react-router-dom'
import AuthContext, { IAuthContext } from '../../contexts/AuthContext.js'
import { useTranslation } from 'react-i18next'
import { Button } from '../index'
import { IoArrowBack } from 'react-icons/io5'
import noAccess from '../../assets/images/no-access.svg'

const PrivateRoute = ({ children }: { children?: JSX.Element[] }) => {
    const { user } = useContext(AuthContext) as IAuthContext
    const { t } = useTranslation()

    return (
        <>
            {user ? (
                children ? (
                    children
                ) : (
                    <Outlet />
                )
            ) : (
                <div className="grow flex items-center justify-center">
                    <div className="flex gap-32 items-center max-w-5xl">
                        <div className="grid gap-3 h-fit">
                            <h1 className="text-5xl font-bold">
                                {t('no_access')}
                            </h1>
                            <p className="text-2xl text-gray-600 dark:text-gray-400">
                                {t('login_to_access')}
                            </p>
                            <div className="flex gap-5 mt-5">
                                <Button
                                    style="secondary"
                                    to="/"
                                    className="font-semibold"
                                >
                                    <IoArrowBack />
                                    {t('to_main')}
                                </Button>
                                <Button
                                    to={`/login?redirectFrom=${window.location.pathname}`}
                                    style="primary"
                                >
                                    {t('login')}
                                </Button>
                            </div>
                        </div>
                        <img src={noAccess} />
                    </div>
                </div>
            )}
        </>
    )
}

export default PrivateRoute
