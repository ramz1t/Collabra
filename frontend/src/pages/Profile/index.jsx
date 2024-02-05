import React from 'react'
import { Title } from '../../components'
import { useTranslation } from 'react-i18next'

const Profile = () => {
    const { t } = useTranslation()
    return (
        <div>
            <Title>{t('profile')}</Title>
        </div>
    )
}

export default Profile
