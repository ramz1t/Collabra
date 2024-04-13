import { useTranslation } from 'react-i18next'
import { Button, Input, SettingsSection } from '../../../components/index.js'
import useInput from '../../../hooks/useInput.js'
import { useParams } from 'react-router-dom'
import { useDeleteTeam } from '../../../api/team.js'
import { useContext } from 'react'
import TeamContext from '../../../contexts/TeamContext.jsx'

const DeleteTeam = () => {
    const { t } = useTranslation()
    const password = useInput()
    const { teamSlug } = useParams()
    const { setTeam } = useContext(TeamContext)
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
                    className="!min-h-10"
                    action={() =>
                        deleteTeam(
                            { id: teamSlug, password: password.value },
                            { onSuccess: () => setTeam(null) }
                        )
                    }
                >
                    {t('delete_team')}
                </Button>
            </div>
        </SettingsSection>
    )
}

export default DeleteTeam
