import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import TeamsList from './TeamsList'
import { Button, Title } from '../../components'
import { useTranslation } from 'react-i18next'
import TeamSpace from '../Team'
import CreateTeam from './CreateTeam.jsx'
import { IoDuplicateOutline } from 'react-icons/io5'

const Teams = () => {
    const { t } = useTranslation()

    return (
        <Routes>
            <Route index element={<TeamsList />} />
            <Route path="/:teamSlug/*" element={<TeamSpace />} />
            <Route path="/create" element={<CreateTeam />} />
        </Routes>
    )
}

export default Teams
