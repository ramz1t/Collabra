import React from 'react'
import { Title } from '../../components'
import { useTranslation } from 'react-i18next'

const Settings = () => {
    const { t } = useTranslation()
    return (
        <div className="container mx-auto">
            <Title>{t('settings')}</Title>
            list of settings
        </div>
    )
}

export default Settings
