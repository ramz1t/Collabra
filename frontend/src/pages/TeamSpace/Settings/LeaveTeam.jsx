import { PasswordSubmit, SettingsSection } from '../../../components/index.js'
import { useTranslation } from 'react-i18next'
import { useLeaveTeam } from '../../../api/team.js'
import { useContext } from 'react'
import TeamContext from '../../../contexts/TeamContext.jsx'

const LeaveTeam = () => {
    const { team, setTeam } = useContext(TeamContext)
    const { mutate: leaveTeam, isPending } = useLeaveTeam()
    const { t } = useTranslation()

    return (
        <SettingsSection
            title={t('leave_team_head')}
            description={t('leave_team_desc')}
        >
            <PasswordSubmit
                submitData={{ id: team.id }}
                submitFn={leaveTeam}
                isLoading={isPending}
                actionText={t('leave_team')}
                options={{ onSuccess: () => setTeam(null) }}
            />
        </SettingsSection>
    )
}

export default LeaveTeam
