import { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { Form, Button, SettingsSection } from '../../../components/index.js'
import AuthContext from '../../../contexts/AuthContext.jsx'

const Logout = () => {
    const { t } = useTranslation()
    const { logoutUser } = useContext(AuthContext)

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
