import React, { useContext, useEffect } from 'react'
import { Routes, useParams, Route } from 'react-router-dom'
import TeamContext, { ITeamContext } from '../../contexts/TeamContext.js'
import Dashboard from './Dashboard/index.js'
import TeamSettings from './Settings/index.js'
import Tasks from './Tasks'
import Files from './Files/index.js'
import Chats from './Chats/index.js'
import Calendar from './Calendar/index.js'
import { useTeam } from '../../api/team'
import LoadingState from '../../components/LoadingState'
import { Helmet } from 'react-helmet-async'

const TeamSpace = () => {
    const { teamSlug } = useParams()
    const { team, setTeam } = useContext(TeamContext) as ITeamContext
    const { data: teamData, isLoading, error } = useTeam(teamSlug!)

    useEffect(() => {
        if (teamData) setTeam(teamData)
    }, [teamData])

    if (isLoading || !team) return <LoadingState.TeamSpace />
    if (error) return 'error'
    if (!teamData) return 'failed to load team'

    return (
        <div className="grow flex flex-col">
            <Helmet>
                <title>{teamData.title} - Collabra</title>
            </Helmet>
            <Routes>
                <Route index element={<Dashboard />} />
                <Route path="settings" element={<TeamSettings />} />
                <Route path="tasks/*" element={<Tasks />} />
                <Route path="files" element={<Files />} />
                <Route path="chats" element={<Chats />} />
                <Route path="calendar" element={<Calendar />} />
            </Routes>
        </div>
    )
}

export default TeamSpace
