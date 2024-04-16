import {
    Button,
    Form,
    ImageEditor,
    Input,
    SettingsSection,
    TeamImage,
} from '../../../components/index.js'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { useTeam, useUpdateTeam } from '../../../api/team.js'
import { useContext, useEffect, useState } from 'react'
import { objectsDifference } from '../../../utils/index.jsx'
import useInput from '../../../hooks/useInput.js'
import TextField from '../../../components/TextField/index.jsx'
import TeamContext from '../../../contexts/TeamContext.jsx'

const GeneralInfo = () => {
    const { t } = useTranslation()
    const { teamSlug } = useParams()
    const { team: contextTeam } = useContext(TeamContext)
    const [hasChanges, setHasChanges] = useState(false)
    const name = useInput('', { isEmpty: false })
    const description = useInput('')
    const { data: team, isLoading } = useTeam(teamSlug)
    const {
        mutate: updateTeam,
        mutateAsync: updateTeamAsync,
        isPending: mutationLoading,
    } = useUpdateTeam(teamSlug, contextTeam.id)

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
            {!isLoading && (
                <div className="flex flex-col gap-10">
                    <ImageEditor
                        initialImageComponent={
                            <TeamImage
                                team={team}
                                size="settings"
                                className="rounded-xl"
                            />
                        }
                        initialImageExists={team?.image !== null}
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
