import {
    Button,
    Form,
    ImageEditor,
    Input,
    SettingsSection,
    TeamImage,
    TextField,
} from '../../../components'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { useTeam, useUpdateTeam } from '../../../api/team'
import React, { useContext, useEffect, useState } from 'react'
import { objectsDifference } from '../../../utils'
import useInput from '../../../hooks/useInput'
import TeamContext, { ITeamContext } from '../../../contexts/TeamContext'

const GeneralInfo = (): React.ReactElement => {
    const { t } = useTranslation()
    const { teamSlug } = useParams()
    const { team: contextTeam } = useContext(TeamContext) as ITeamContext
    const [hasChanges, setHasChanges] = useState<boolean>(false)
    const name = useInput<string>('', { isEmpty: false })
    const description = useInput<string>('')
    const { data: team, isLoading } = useTeam(teamSlug!)
    const {
        mutate: updateTeam,
        mutateAsync: updateTeamAsync,
        isPending: mutationLoading,
    } = useUpdateTeam(contextTeam!.id)

    const formData = {
        title: name.value,
        description: description.value,
    }

    useEffect(() => {
        if (!team) return
        name.setValue(team?.title)
        description.setValue(team?.description)
    }, [team])

    useEffect(() => {
        setHasChanges(
            Object.keys(objectsDifference(team, formData)).length !== 0
        )
    }, [formData])

    return (
        <SettingsSection
            title={t('general_info_head')}
            description={t('general_info_desc')}
        >
            {!isLoading && team && (
                <div className="flex flex-col gap-10">
                    <ImageEditor
                        initialImageComponent={
                            <TeamImage
                                team={team}
                                size="settings"
                                className="rounded-xl"
                            />
                        }
                        initialImageExists={team.image !== null}
                        onSaveField="image"
                        onSave={updateTeamAsync}
                    />
                    <Form
                        className="!gap-7 md:!gap-10"
                        disabled={
                            !hasChanges ||
                            [name].some((field) => !field.allValid)
                        }
                        onSubmit={() => {
                            updateTeam(objectsDifference(team, formData))
                        }}
                    >
                        <Input instance={name} title={t('team_name')} must />
                        <TextField
                            instance={description}
                            title={t('description')}
                            minHeight={120}
                        />
                        <Button
                            isLoading={mutationLoading}
                            style="primary"
                            type="submit"
                        >
                            {t('save')}
                        </Button>
                    </Form>
                </div>
            )}
        </SettingsSection>
    )
}

export default GeneralInfo
