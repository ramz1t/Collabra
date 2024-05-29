import { SettingsSection } from '../../../../components/index.js'
import { useTranslation } from 'react-i18next'
import MembersList from './MembersList.jsx'

const MembersManagement = () => {
    const { t } = useTranslation()

    return (
        <SettingsSection
            title={t('manage_members_head')}
            description={t('manage_members_desc')}
        >
            <MembersList />
        </SettingsSection>
    )
}

export default MembersManagement
