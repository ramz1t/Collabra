import React, { useContext } from 'react'
import { Outlet } from 'react-router-dom'
import AuthContext, { IAuthContext } from '../../contexts/AuthContext.js'
import { useTranslation } from 'react-i18next'
import { Button, RichHeader } from '../index'
import { IoDocumentLockOutline } from 'react-icons/io5'

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
                    <RichHeader
                        icon={<IoDocumentLockOutline />}
                        title={t('no_access')}
                        description={t('login_to_access')}
                        actions={
                            <Button
                                to={`/login?redirectFrom=${window.location.pathname}`}
                                style="primary"
                            >
                                {t('login')}
                            </Button>
                        }
                    />
                </div>
            )}
        </>
    )
}

export default PrivateRoute
