import { SettingsContainer } from '../../../components'
import PersonalInfo from './PersonalInfo'
import DeleteProfile from './DeleteProfile'
import ChangePassword from './ChangePassword'
import Logout from './Logout'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import React from 'react'

const UserSettings = (): React.ReactElement => {
    const { t } = useTranslation()
    return (
        <SettingsContainer>
            <Helmet>
                <title>{t('title_profile_settings')} | Collabra</title>
            </Helmet>
            <Logout />
            <PersonalInfo />
            <ChangePassword />
            <DeleteProfile />
        </SettingsContainer>
    )
}

export default UserSettings
