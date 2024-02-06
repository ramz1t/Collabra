import React, { useContext } from 'react'
import { Button, Title } from '../../components'
import { useTranslation } from 'react-i18next'
import AuthContext from '../../contexts/AuthContext'

const Profile = () => {
    const { t } = useTranslation()
    const { logoutUser } = useContext(AuthContext)
    return (
        <div>
            <Title>{t('profile')}</Title>
            <Button style="primary" action={logoutUser}>
                {t('logout')}
            </Button>
        </div>
    )
}

export default Profile
