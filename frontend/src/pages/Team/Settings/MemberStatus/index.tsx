import { SettingsSection } from '../../../../components'
import { useTranslation } from 'react-i18next'
import { memo, useContext } from 'react'
import TeamContext, { ITeamContext } from '../../../../contexts/TeamContext'
import { IoInformationCircleOutline } from 'react-icons/io5'

const MemberStatus = () => {
    const { t } = useTranslation()
    const { team } = useContext(TeamContext) as ITeamContext
    return (
        <SettingsSection
            title={t('member_status')}
            description={t('member_status_hint')}
        >
            {t('status')}: {team?.member_status ?? `[${t('no_status')}]`}
            <p className="flex items-center gap-1.5 pt-3 text-sm text-gray-600 font-semibold">
                <IoInformationCircleOutline />
                {t('contact_admin_to_change', {
                    subject: t('your_member_status'),
                })}
            </p>
        </SettingsSection>
    )
}

export default memo(MemberStatus)
