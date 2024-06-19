import React from 'react'
import { Routes, Route } from 'react-router-dom'
import TeamsList from './TeamsList'
import TeamSpace from '../Team'
import CreateTeam from './CreateTeam'

const Teams = (): React.ReactElement => {
    return (
        <Routes>
            <Route index element={<TeamsList />} />
            <Route path="/:teamSlug/*" element={<TeamSpace />} />
            <Route path="/create" element={<CreateTeam />} />
        </Routes>
    )
}

export default Teams
