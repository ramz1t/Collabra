import React, { useContext, useEffect } from 'react'
import { Routes, useParams, Route } from 'react-router-dom'
import TeamContext from '../../contexts/TeamContext'
import Dashboard from './Dashboard'
import Settings from './Settings'
import Tasks from './Tasks'
import Files from './Files'
import Chats from './Chats'
import Calendar from './Calendar'

const TeamSpace = () => {
    const { teamId } = useParams()
    const { setTeam } = useContext(TeamContext)

    useEffect(() => {
        setTeam({ name: `Team Name ${teamId}`, id: teamId, color: '#c20000' })
    }, [])

    return (
        <Routes>
            <Route index element={<Dashboard />} />
            <Route path="settings" element={<Settings />} />
            <Route path="tasks" element={<Tasks />} />
            <Route path="files" element={<Files />} />
            <Route path="chats" element={<Chats />} />
            <Route path="calendar" element={<Calendar />} />
        </Routes>
    )
}

export default TeamSpace
