import React, { useContext } from 'react'
import { Button, Form, Input } from '../../components/index'
import { useTranslation } from 'react-i18next'
import useInput from '../../hooks/useInput'
import AuthContext, { IAuthContext } from '../../contexts/AuthContext'
import { Link, useSearchParams } from 'react-router-dom'
import SocialLogin from './SocialLogin'
import { Helmet } from 'react-helmet-async'

const Login = (): React.ReactElement => {
    const { t } = useTranslation()
    const email = useInput('')
    const password = useInput('')
    const { loginUser } = useContext(AuthContext) as IAuthContext
    const [searchParams, _] = useSearchParams()

    return (
        <div className="flex flex-col items-center mt-5 p-5">
            <Helmet>
                <title>{t('title_login')} | Collabra</title>
            </Helmet>
            <Form
                className="w-full md:max-w-96 mt-10 md:mt-20"
                onSubmit={() => {
                    loginUser({
                        email: email.value,
                        password: password.value,
                        redirectFrom: searchParams.get('redirectFrom'),
                    })
                }}
            >
                <div>
                    <p className="font-bold text-2xl text-gray-900 dark:text-gray-100">
                        {t('login_header')}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm pt-2">
                        {t('not_member')}{' '}
                        <Link
                            to="/register"
                            className="text-accent dark:text-accent-dark font-semibold hover:underline pl-1"
                        >
                            {t('register_link')}
                        </Link>
                    </p>
                </div>
                <Input
                    title={t('email')}
                    instance={email}
                    type="email"
                    autoRef
                />
                <Input
                    title={t('password')}
                    instance={password}
                    type="password"
                />
                <Button style="primary" type="submit" w_full className="my-3">
                    {t('login')}
                </Button>
                <SocialLogin />
            </Form>
        </div>
    )
}

export default Login
