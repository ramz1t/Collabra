import React, { useContext, useState } from 'react'
import { Dropdown, Title, DropdownItem } from '../../components'
import { useTranslation } from 'react-i18next'
import ThemeContext from '../../contexts/ThemeContext'
import ThemePicker from './ThemePicker'

const Settings = () => {
    const { t } = useTranslation()
    const { isDark } = useContext(ThemeContext)

    return (
        <div className="container mx-auto">
            <Title>{t('settings')}</Title>
            <div>
                {t('theme')}
                <ThemePicker />
            </div>
        </div>
    )
}

export default Settings
