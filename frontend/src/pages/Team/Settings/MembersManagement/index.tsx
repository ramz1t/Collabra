import { SettingsSection } from '../../../../components'
import { useTranslation } from 'react-i18next'
import MembersList from './MembersList'
import React from 'react'

const MembersManagement = (): React.ReactElement => {
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
