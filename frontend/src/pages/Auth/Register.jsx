import React, { useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Form, Title, Divider, Button, Input } from '../../components/index.js'
import {
    IoLogoApple,
    IoLogoGoogle,
    IoLogoGithub,
    IoLogIn,
} from 'react-icons/io5'
import { Link } from 'react-router-dom'
import useInput from '../../hooks/useInput.js'
import AuthContext from '../../contexts/AuthContext.jsx'

const Register = () => {
    const { t } = useTranslation()
    const email = useInput('')
    const password = useInput('')
    const firstName = useInput('')
    const lastName = useInput('')
    const [error, setError] = useState(null)
    const { registerUser } = useContext(AuthContext)

    return (
        <div className="flex flex-col items-center mt-5">
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
                {error && JSON.stringify(error)}
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

export default Register
