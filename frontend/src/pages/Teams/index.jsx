import React from 'react'
import { Routes, Route } from 'react-router-dom'
import TeamsList from './TeamsList'
import { Title } from '../../components'
import { useTranslation } from 'react-i18next'
import TeamSpace from '../TeamSpace'

const Teams = () => {
    const { t } = useTranslation()

    return (
        <Routes>
            <Route
                index
                element={
                    <div className="container mx-auto">
                        <Title>{t('teams')}</Title>
                        <TeamsList />
                    </div>
                }
            />
            <Route path="/:teamId/*" element={<TeamSpace />} />
        </Routes>
    )
}

export default Teams
