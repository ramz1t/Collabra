import { useTranslation } from 'react-i18next'
import { PasswordSubmit, SettingsSection } from '../../../../components'
import { useDeleteTeam } from '../../../../api/team'
import React, { useContext } from 'react'
import TeamContext, { ITeamContext } from '../../../../contexts/TeamContext'

const DeleteTeam = (): React.ReactElement => {
    const { t } = useTranslation()
    const { team, setTeam } = useContext(TeamContext) as ITeamContext
    const { mutate: deleteTeam, isPending } = useDeleteTeam()

    return (
        <SettingsSection
            title={t('delete_team_head')}
            description={t('delete_team_desc')}
        >
            <PasswordSubmit
                submitData={{ id: team!.id }}
                options={{ onSuccess: () => setTeam(null) }}
                isLoading={isPending}
                submitFn={deleteTeam}
                actionText={t('delete_team')}
            />
        </SettingsSection>
    )
}

export default DeleteTeam
