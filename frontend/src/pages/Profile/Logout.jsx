import { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { Form, Button } from '../../components'
import AuthContext from '../../contexts/AuthContext'

const Logout = () => {
    const { t } = useTranslation()
    const { logoutUser } = useContext(AuthContext)

    return (
        <div className="grid md:grid-cols-[2fr_3fr] gap-10">
            <div>
                <p className="font-bold text-3xl">{t('logout_head')}</p>
                <p className="text-gray-600 dark:text-gray-400 pt-3">
                    {t('logout_desc')}
                </p>
            </div>
            <Form className="!gap-7 md:!gap-10 max-w-xl" onSubmit={logoutUser}>
                <Button style="destructive" type="submit">
                    {t('logout')}
                </Button>
            </Form>
        </div>
    )
}

export default Logout
