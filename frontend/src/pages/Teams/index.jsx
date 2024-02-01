import React from 'react'
import { Routes, Route, NavLink } from 'react-router-dom'
import TeamsList from './TeamsList'
import Title from '../../components/ui/Title'
import { useTranslation } from 'react-i18next'
import TeamSpace from '../TeamsSpace'

const Teams = () => {
    const { t } = useTranslation()

    return (
        <Routes>
            <Route
                index
                element={
                    <>
                        <Title>{t('teams')}</Title>
                        <TeamsList />
                    </>
                }
            />
            <Route path="/:teamId/*" element={<TeamSpace />} />
        </Routes>
    )
}

export default Teams
