import React from 'react'
import { useTranslation } from 'react-i18next'
import useInput from '../../hooks/useInput'
import { Form, Input, Button } from '../../components'

const ChangePassword = () => {
    const { t } = useTranslation()
    const oldPass = useInput()
    const newPass = useInput()

    return (
        <div className="grid md:grid-cols-[2fr_3fr] gap-10">
            <div>
                <p className="font-bold text-3xl">{t('change_pass_head')}</p>
                <p className="text-gray-600 dark:text-gray-400 pt-3">
                    {t('change_pass_desc')}
                </p>
            </div>
            <Form className="!gap-7 md:!gap-10 max-w-xl">
                <Input
                    title={t('old_pass')}
                    instance={oldPass}
                    type="password"
                />
                <Input
                    title={t('new_pass')}
                    instance={newPass}
                    type="password"
                />
                <Button style="primary" action="submit">
                    {t('change')}
                </Button>
            </Form>
        </div>
    )
}

export default ChangePassword
