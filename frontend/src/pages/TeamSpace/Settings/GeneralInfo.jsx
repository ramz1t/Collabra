import { SettingsSection } from '../../../components/index.js'
import { useTranslation } from 'react-i18next'
import { UserRole } from '../../../hooks/useIsAllowed.js'

const GeneralInfo = () => {
    const { t } = useTranslation()
    return (
        <SettingsSection
            title={t('general_info_head')}
            description={t('general_info_desc')}
            allowedRoles={[UserRole.Admin, UserRole.Owner]}
        >
            general info
        </SettingsSection>
    )
}

export default GeneralInfo
