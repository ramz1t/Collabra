import useInput from '../../hooks/useInput'
import { BackButton, Button, Form, Input, TeamImage } from '../../components'
import { useTranslation } from 'react-i18next'
import { useCreateTeam } from '../../api/team'
import React, { memo } from 'react'

const CreateTeam = (): React.ReactElement => {
    const { t } = useTranslation()
    return (
        <div className="container mx-auto grid md:grid-cols-2 place-items-center my-auto max-md:pt-3 gap-10">
            <div className="w-fit max-md:w-full">
                <BackButton text={t('teams')} />
                <CreateTeamForm />
            </div>
            <img src={'/images/team_ill.png'} />
        </div>
    )
}

const CreateTeamForm = () => {
    const { t } = useTranslation()
    const { mutate: createTeam, isPending, error } = useCreateTeam()
    const name = useInput('')

    return (
        <Form
            className="flex flex-col md:flex-row gap-5 p-5 border dark:border-slate-700 !rounded-2xl max-w-2xl bg-white dark:bg-gray-900 shadow-sm mt-2"
            onSubmit={() =>
                createTeam({
                    title: name.value,
                })
            }
        >
            <TeamImage
                team={{
                    title: name.value,
                }}
                size="grid"
            />
            <div className="flex flex-col justify-between gap-3">
                <Input
                    instance={name}
                    title={t('team_name')}
                    must
                    autoRef
                    errors={error?.response?.data?.title}
                />
                <Button
                    style="primary"
                    type="submit"
                    disabled={name.value.trim() === ''}
                    isLoading={isPending}
                    className="mt-3 ml-auto"
                >
                    {t('create_team')}
                </Button>
            </div>
        </Form>
    )
}

export default memo(CreateTeam)
