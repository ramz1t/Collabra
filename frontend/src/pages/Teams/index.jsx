import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import TeamsList from './TeamsList'
import { Button, Title } from '../../components'
import { useTranslation } from 'react-i18next'
import TeamSpace from '../TeamSpace'
import CreateTeam from './CreateTeam.jsx'
import { IoDuplicateOutline } from 'react-icons/io5'

const Teams = () => {
    const { t } = useTranslation()

    return (
        <Routes>
            <Route
                index
                element={
                    <div>
                        {/*<Title position="left">{t('teams')}</Title>*/}

                        <Button to="create" style="primary" className="mt-5">
                            <IoDuplicateOutline />
                            {t('create_team')}
                        </Button>

                        <TeamsList />
                    </div>
                }
            />
            <Route path="/:teamId/*" element={<TeamSpace />} />
            <Route path="/create" element={<CreateTeam />} />
        </Routes>
    )
}

export default Teams
