import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { Form, Button, SettingsSection } from '../../../components'
import AuthContext, { IAuthContext } from '../../../contexts/AuthContext'

const Logout = (): React.ReactElement => {
    const { t } = useTranslation()
    const { logoutUser } = useContext(AuthContext) as IAuthContext

    return (
        <SettingsSection
            title={t('logout_head')}
            description={t('logout_desc')}
        >
            <Form className="!gap-7 md:!gap-10 max-w-xl" onSubmit={logoutUser}>
                <Button style="destructive" type="submit">
                    {t('logout')}
                </Button>
            </Form>
        </SettingsSection>
    )
}

export default Logout
