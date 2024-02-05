import React, { useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Form, Title, Divider, Button, Input } from '../../components'
import {
    IoLogoApple,
    IoLogoGoogle,
    IoLogoGithub,
    IoLogIn,
} from 'react-icons/io5'
import { Link } from 'react-router-dom'
import useInput from '../../hooks/useInput'
import AuthContext from '../../contexts/AuthContext'

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
            <h1 className="font-extrabold text-5xl text-center mt-7">
                {t('register_header')}
            </h1>
            <Form
                className="w-full md:max-w-96 mt-20"
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
                <Input title={t('first_name')} instance={firstName} />
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
                >
                    {t('register')}
                </Button>
                {error && JSON.stringify(error)}
                <div className="flex items-center gap-3 text-accent/50 dark:text-accent-dark/75 font-extralight">
                    <Divider horizontal />
                    OR
                    <Divider horizontal />
                </div>
                <div className="flex justify-between gap-3">
                    <Button style="secondary" type="button">
                        <IoLogoApple />
                    </Button>
                    <Button style="secondary" type="button">
                        <IoLogoGithub />
                    </Button>
                    <Button style="secondary" type="button">
                        <IoLogoGoogle />
                    </Button>
                    <Link
                        className="flex text-accent dark:text-accent-dark items-center border-2 border-accent dark:border-accent-dark gap-3 rounded-md px-3 hover:opacity-75 duration-75 font-bold"
                        to="/login"
                    >
                        <IoLogIn />
                        {t('login')}
                    </Link>
                </div>
            </Form>
        </div>
    )
}

export default Register
