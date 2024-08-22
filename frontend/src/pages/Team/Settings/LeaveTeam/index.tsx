import { PasswordSubmit, SettingsSection } from '../../../../components'
import { useTranslation } from 'react-i18next'
import { useLeaveTeam } from '../../../../api/team'
import React, { useContext } from 'react'
import TeamContext, { ITeamContext } from '../../../../contexts/TeamContext'

const LeaveTeam = (): React.ReactElement => {
    const { team, setTeam } = useContext(TeamContext) as ITeamContext
    const { mutate: leaveTeam, isPending } = useLeaveTeam()
    const { t } = useTranslation()

    return (
        <SettingsSection
            title={t('leave_team_head')}
            description={t('leave_team_desc')}
        >
            <PasswordSubmit
                submitData={{ id: team!.id }}
                submitFn={leaveTeam}
                isLoading={isPending}
                actionText={t('leave_team')}
                options={{ onSuccess: () => setTeam(null) }}
            />
        </SettingsSection>
    )
}

export default LeaveTeam
