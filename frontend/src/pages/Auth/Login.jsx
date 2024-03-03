import React, { useContext } from 'react'
import { Button, Divider, Form, Input } from '../../components/index.js'
import { useTranslation } from 'react-i18next'
import {
    IoLogoGoogle,
    IoLogoApple,
    IoLogoGithub,
    IoPersonAdd,
} from 'react-icons/io5'
import useInput from '../../hooks/useInput.js'
import loginImg from '../../assets/images/login.jpg'
import AuthContext from '../../contexts/AuthContext.jsx'
import { Link, useParams } from 'react-router-dom'
import logo from '../../assets/images/logo.png'

const Login = () => {
    const { t } = useTranslation()
    const email = useInput('')
    const password = useInput('')
    const { loginUser } = useContext(AuthContext)
    const { redirectFrom } = useParams()

    return (
        <div className="flex flex-col items-center mt-5">
            <Form
                className="w-full md:max-w-96 mt-10 md:mt-20"
                onSubmit={() => {
                    loginUser({
                        email: email.value,
                        password: password.value,
                        redirectFrom,
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
                <div className="flex items-center gap-3 text-accent/50 dark:text-accent-dark/75 font-extralight">
                    <Divider horizontal />
                    {t('or').toUpperCase()}
                    <Divider horizontal />
                </div>
                <div className="grid grid-cols-[1fr_1fr] gap-3">
                    <Button
                        type="button"
                        w_full
                        className="!border hover:bg-accent/5 dark:hover:bt-accent-dark/10 rounded-md min-h-10"
                    >
                        <IoLogoApple />
                        Apple
                    </Button>
                    <Button
                        type="button"
                        w_full
                        className="!border hover:bg-accent/5 dark:hover:bt-accent-dark/10 rounded-md min-h-10"
                    >
                        <IoLogoGithub />
                        GitHub
                    </Button>
                    <Button
                        type="button"
                        w_full
                        className="!border hover:bg-accent/5 dark:hover:bt-accent-dark/10 rounded-md min-h-10"
                    >
                        <IoLogoGoogle />
                        Google
                    </Button>
                </div>
            </Form>
        </div>
    )
}

export default Login
