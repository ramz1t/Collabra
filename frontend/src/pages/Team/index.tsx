import React, { useContext, useEffect } from 'react'
import { Routes, useParams, Route } from 'react-router-dom'
import TeamContext, { ITeamContext } from '../../contexts/TeamContext'
import Dashboard from './Dashboard'
import TeamSettings from './Settings'
import Tasks from './Tasks'
import { useTeam } from '../../api/team'
import LoadingState from '../../components/LoadingState'
import { Helmet } from 'react-helmet-async'
import Threads from './Threads'
import Notes from './Notes'

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
                <Route path="threads" element={<Threads />} />
                <Route path="notes" element={<Notes />} />
            </Routes>
        </div>
    )
}

export default TeamSpace
