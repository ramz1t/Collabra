import React, { useEffect } from 'react'
import TeamCard from './TeamCard'
import { Button, Input } from '../../components/index.js'
import { IoDuplicateOutline } from 'react-icons/io5'
import { useTranslation } from 'react-i18next'
import useInput from '../../hooks/useInput.js'
import { useTeams } from '../../api/team.js'

const TeamsList = () => {
    const { t } = useTranslation()
    const search = useInput(null)
    const { data: teams } = useTeams(search.value)

    useEffect(() => {
        if (search.value === '') search.setValue(null)
    }, [search.value])

    return (
        <div className="pt-5">
            <div className="flex items-center gap-5">
                <Button to="create" style="primary">
                    <IoDuplicateOutline />
                    {t('create_team')}
                </Button>
                <Input
                    instance={search}
                    placeholder={t('search_team')}
                    className="px-3"
                />
                {search.value !== null && (
                    <Button style="tetriary" action={() => search.setValue('')}>
                        {t('cancel')}
                    </Button>
                )}
            </div>

            {teams && (
                <ul className="grid gap-5 md:grid-cols-2 xl:grid-cols-2 pt-5 pr-5">
                    {teams.map((team, key) => (
                        <TeamCard key={key} team={team} />
                    ))}
                </ul>
            )}
        </div>
    )
}

export default TeamsList
