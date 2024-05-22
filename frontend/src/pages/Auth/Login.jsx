import React, { useContext } from 'react'
import { Button, Divider, Form, Input } from '../../components/index.js'
import { useTranslation } from 'react-i18next'
import { IoLogoGoogle, IoLogoApple, IoLogoGithub } from 'react-icons/io5'
import useInput from '../../hooks/useInput.js'
import AuthContext from '../../contexts/AuthContext.jsx'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import SocialLogin from './SocialLogin.jsx'

const Login = () => {
    const { t } = useTranslation()
    const email = useInput('')
    const password = useInput('')
    const { loginUser } = useContext(AuthContext)
    const [searchParams, _] = useSearchParams()

    return (
        <div className="flex flex-col items-center mt-5">
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
