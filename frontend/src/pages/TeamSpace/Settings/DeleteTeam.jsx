import { useTranslation } from 'react-i18next'
import { Button, Input, SettingsSection } from '../../../components/index.js'
import useInput from '../../../hooks/useInput.js'
import { useParams } from 'react-router-dom'
import { useDeleteTeam } from '../../../api/team.js'

const DeleteTeam = () => {
    const { t } = useTranslation()
    const password = useInput()
    const { teamSlug } = useParams()
    const { mutate: deleteTeam } = useDeleteTeam()

    return (
        <SettingsSection
            title={t('delete_team_head')}
            description={t('delete_team_desc')}
        >
            <div className="flex gap-5">
                <Input
                    instance={password}
                    hint={t('delete_team_pass')}
                    type="password"
                />
                <Button
                    disabled={!password.value}
                    style="destructive"
                    className="!min-h-10 mt-1"
                    action={() =>
                        deleteTeam({ id: teamSlug, password: password.value })
                    }
                >
                    {t('delete_team')}
                </Button>
            </div>
        </SettingsSection>
    )
}

export default DeleteTeam
