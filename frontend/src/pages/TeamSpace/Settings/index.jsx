import React from 'react'
import { useTranslation } from 'react-i18next'
import { Title } from '../../../components'

const Settings = () => {
    const { t } = useTranslation()
    return (
        <div>
            <Title>{t('team_settings', { name: 'Team Name' })}</Title>
        </div>
    )
}

export default Settings
