import React, { useContext } from 'react'
import { Button, Divider, Form, Input } from '../../components'
import { useTranslation } from 'react-i18next'
import { IoLogoGoogle, IoLogoApple, IoLogoGithub } from 'react-icons/io5'
import useInput from '../../hooks/useInput'
import loginImg from '../../assets/images/login.jpg'
import AuthContext from '../../contexts/AuthContext'
import { useParams } from 'react-router-dom'

const Login = () => {
    const { t } = useTranslation()
    const email = useInput('')
    const password = useInput('')
    const { loginUser } = useContext(AuthContext)
    const { redirectFrom } = useParams()

    return (
        <div className="grid md:grid-cols-[1fr_2fr] lg:grid-cols-[1fr_1fr] justify-items-center content-center mt-5 gap-7">
            <h1 className="col-span-2 text-5xl mt-7 font-extrabold">
                {t('login_header')}
            </h1>
            <div class="grid-item lg:col-span-1 flex items-center justify-center">
                <img src={loginImg} />
            </div>
            <div className="w-full md:w-2/3 lg:w-2/3 my-auto">
                <Form
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
                    <div className="flex items-center gap-3 text-accent-main/30 font-extralight">
                        <Divider horizontal />
                        OR
                        <Divider horizontal />
                    </div>
                    <div className="flex justify-evenly gap-3 md:gap-7">
                        <Button style="secondary">
                            <IoLogoApple />
                        </Button>
                        <Button style="secondary">
                            <IoLogoGithub />
                        </Button>
                        <Button style="secondary">
                            <IoLogoGoogle />
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default Login
