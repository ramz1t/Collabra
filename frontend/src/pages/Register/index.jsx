import React from 'react'
import { useTranslation } from 'react-i18next'
import { Form, Title } from '../../components'

const Register = () => {
    const { t } = useTranslation()

    return (
        <div className="w-full mt-5">
            <h1 className="font-extrabold text-5xl text-center mt-7">
                {t('register_header')}
            </h1>
            <Form></Form>
        </div>
    )
}

export default Register
