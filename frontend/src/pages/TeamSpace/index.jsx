import React, { useContext, useEffect } from 'react'
import { Routes, useParams, Route } from 'react-router-dom'
import TeamContext from '../../contexts/TeamContext'
import Dashboard from './Dashboard'
import Settings from './Settings'
import Tasks from './Tasks'
import Files from './Files'
import Chats from './Chats'
import Calendar from './Calendar'
import { useTeam } from '../../api/team.js'

const TeamSpace = () => {
    const { teamSlug } = useParams()
    const { team, setTeam } = useContext(TeamContext)
    const { data: teamData } = useTeam(teamSlug)

    useEffect(() => {
        if (teamData) setTeam(teamData)
    }, [teamData])

    return (
        <div className="grow flex flex-col">
            {team ? (
                <Routes>
                    <Route index element={<Dashboard />} />
                    <Route path="settings" element={<Settings />} />
                    <Route path="tasks" element={<Tasks />} />
                    <Route path="files" element={<Files />} />
                    <Route path="chats" element={<Chats />} />
                    <Route path="calendar" element={<Calendar />} />
                </Routes>
            ) : (
                'team space is loading'
            )}
        </div>
    )
}

export default TeamSpace
