import React, { useContext } from 'react'
import { Button, Divider, Form, Input } from '../../components'
import { useTranslation } from 'react-i18next'
import {
    IoLogoGoogle,
    IoLogoApple,
    IoLogoGithub,
    IoPersonAdd,
} from 'react-icons/io5'
import useInput from '../../hooks/useInput'
import loginImg from '../../assets/images/login.jpg'
import AuthContext from '../../contexts/AuthContext'
import { Link, useParams } from 'react-router-dom'

const Login = () => {
    const { t } = useTranslation()
    const email = useInput('')
    const password = useInput('')
    const { loginUser } = useContext(AuthContext)
    const { redirectFrom } = useParams()

    return (
        <div className="grid md:grid-cols-[1fr_2fr] lg:grid-cols-[1fr] justify-items-center content-center mt-5 gap-7">
            <h1 className="col-span-2 text-5xl mt-7 font-extrabold">
                {t('login_header')}
            </h1>
            {/* <div class="grid-item lg:col-span-1 flex items-center justify-center">
                <img src={loginImg} />
            </div> */}

            <Form
                className="w-full md:max-w-96 mt-20"
                onSubmit={() => {
                    loginUser({
                        email: email.value,
                        password: password.value,
                        redirectFrom,
                    })
                }}
            >
                <Input title={t('email')} instance={email} />
                <Input
                    title={t('password')}
                    instance={password}
                    type="password"
                />
                <Button style="primary" type="submit" w_full>
                    {t('login')}
                </Button>
                <div className="flex items-center gap-3 text-accent/50 dark:text-accent-dark/75 font-extralight">
                    <Divider horizontal />
                    OR
                    <Divider horizontal />
                </div>
                <div className="flex justify-between gap-3">
                    <Button style="secondary">
                        <IoLogoApple />
                    </Button>
                    <Button style="secondary">
                        <IoLogoGithub />
                    </Button>
                    <Button style="secondary">
                        <IoLogoGoogle />
                    </Button>
                    <Link
                        className="flex text-accent dark:text-accent-dark items-center border-2 border-accent dark:border-accent-dark gap-3 rounded-md px-3 hover:opacity-75 duration-75 font-bold"
                        to="/register"
                    >
                        <IoPersonAdd />
                        {t('register')}
                    </Link>
                </div>
            </Form>
        </div>
    )
}

export default Login
