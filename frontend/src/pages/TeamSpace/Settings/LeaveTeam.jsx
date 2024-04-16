import {
    Button,
    Form,
    Input,
    SettingsSection,
} from '../../../components/index.js'
import { useTranslation } from 'react-i18next'
import useInput from '../../../hooks/useInput.js'
import { useLeaveTeam } from '../../../api/team.js'
import { useContext } from 'react'
import TeamContext from '../../../contexts/TeamContext.jsx'

const LeaveTeam = () => {
    const { t } = useTranslation()
    const password = useInput('')
    const { team } = useContext(TeamContext)
    const { mutate: leaveTeam, isPending } = useLeaveTeam()

    return (
        <SettingsSection
            title={t('leave_team_head')}
            description={t('leave_team_desc')}
        >
            <Form
                onSubmit={() =>
                    leaveTeam({ id: team.id, password: password.value })
                }
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
                        type="submit"
                        isLoading={isPending}
                    >
                        {t('leave_team')}
                    </Button>
                </div>
            </Form>
        </SettingsSection>
    )
}

export default LeaveTeam
