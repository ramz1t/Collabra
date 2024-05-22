import React, { useContext, useEffect } from 'react'
import { Routes, useParams, Route } from 'react-router-dom'
import TeamContext from '../../contexts/TeamContext'
import Dashboard from './Dashboard'
import TeamSettings from './Settings'
import Tasks from './Tasks'
import Files from './Files'
import Chats from './Chats'
import Calendar from './Calendar'
import { useTeam } from '../../api/team.js'
import LoadingState from '../../components/LoadingState/index.jsx'

const TeamSpace = () => {
    const { teamSlug } = useParams()
    const { team, setTeam } = useContext(TeamContext)
    const { data: teamData, isLoading, error } = useTeam(teamSlug)

    useEffect(() => {
        if (teamData) setTeam(teamData)
    }, [teamData])

    if (isLoading || !team) return <LoadingState.TeamSpace />
    if (error) return 'error'

    return (
        <div className="grow flex flex-col">
            <Routes>
                <Route index element={<Dashboard />} />
                <Route path="settings" element={<TeamSettings />} />
                <Route path="tasks" element={<Tasks />} />
                <Route path="files" element={<Files />} />
                <Route path="chats" element={<Chats />} />
                <Route path="calendar" element={<Calendar />} />
            </Routes>
        </div>
    )
}

export default TeamSpace
