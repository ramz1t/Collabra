import { SettingsContainer } from '../../../components/index.js'
import PersonalInfo from './PersonalInfo.jsx'
import DeleteProfile from './DeleteProfile.jsx'
import ChangePassword from './ChangePassword.jsx'
import Logout from './Logout.jsx'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'

const UserSettings = () => {
    const { t } = useTranslation()
    return (
        <SettingsContainer>
            <Helmet>
                <title>{t('title_profile_settings')} - Collabra</title>
            </Helmet>
            <Logout />
            <PersonalInfo />
            <ChangePassword />
            <DeleteProfile />
        </SettingsContainer>
    )
}

export default UserSettings
