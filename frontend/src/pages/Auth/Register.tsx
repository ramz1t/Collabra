import React, { useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Form, Button, Input } from '../../components/index'
import { Link } from 'react-router-dom'
import useInput from '../../hooks/useInput'
import AuthContext, { IAuthContext } from '../../contexts/AuthContext'
import SocialLogin from './SocialLogin'
import { Helmet } from 'react-helmet-async'

const Register = (): React.ReactElement => {
    const { t } = useTranslation()
    const email = useInput<string>('')
    const password = useInput<string>('')
    const firstName = useInput<string>('')
    const lastName = useInput<string>('')
    const [error, setError] = useState<string>()
    const { registerUser } = useContext(AuthContext) as IAuthContext

    return (
        <div className="flex flex-col items-center mt-5 p-5">
            <Helmet>
                <title>{t('title_register')} - Collabra</title>
            </Helmet>
            <Form
                className="w-full md:max-w-96 mt-10 md:mt-20"
                onSubmit={() => {
                    registerUser(
                        {
                            first_name: firstName.value,
                            last_name: lastName.value,
                            email: email.value,
                            password: password.value,
                        },
                        setError
                    )
                }}
            >
                <div>
                    <p className="font-bold text-2xl text-gray-900 dark:text-gray-100">
                        {t('register_link')}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm pt-2">
                        {t('login_text')}{' '}
                        <Link
                            to="/login"
                            className="text-accent dark:text-accent-dark font-semibold hover:underline pl-1"
                        >
                            {t('login')}
                        </Link>
                    </p>
                </div>
                <Input title={t('first_name')} instance={firstName} autoRef />
                <Input title={t('last_name')} instance={lastName} />
                <Input title={t('email')} instance={email} type="email" />
                <Input
                    title={t('password')}
                    instance={password}
                    type="password"
                />
                <Button
                    style="primary"
                    type="submit"
                    w_full
                    disabled={[
                        firstName.value,
                        lastName.value,
                        email.value,
                        password.value,
                    ].includes('')}
                    className="my-3"
                >
                    {t('register')}
                </Button>
                <SocialLogin />
            </Form>
        </div>
    )
}

export default Register
