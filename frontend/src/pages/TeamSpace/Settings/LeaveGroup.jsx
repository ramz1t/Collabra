import { Button, Input, SettingsSection } from '../../../components/index.js'
import { useTranslation } from 'react-i18next'
import useInput from '../../../hooks/useInput.js'
import { UserRole } from '../../../hooks/useIsAllowed.js'
import { useLeaveTeam } from '../../../api/team.js'
import { useContext } from 'react'
import TeamContext from '../../../contexts/TeamContext.jsx'

const LeaveGroup = () => {
    const { t } = useTranslation()
    const password = useInput('')
    const { team } = useContext(TeamContext)
    const { mutate: leaveTeam } = useLeaveTeam()

    return (
        <SettingsSection
            title={t('leave_team_head')}
            description={t('leave_team_desc')}
            allowedRoles={[UserRole.Member, UserRole.Admin]}
        >
            <div className="flex gap-5">
                <Input
                    instance={password}
                    hint={t('pass_to_submit', {
                        action: t('leave_team').toLowerCase(),
                    })}
                    type="password"
                />
                <Button
                    style="destructive"
                    disabled={!password.value}
                    action={() =>
                        leaveTeam({ id: team.id, password: password.value })
                    }
                >
                    {t('leave_team')}
                </Button>
            </div>
        </SettingsSection>
    )
}

export default LeaveGroup
