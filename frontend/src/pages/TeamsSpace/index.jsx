import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import TeamContext from '../../contexts/TeamContext'

const TeamSpace = () => {
    const { teamId } = useParams()
    const { setTeam } = useContext(TeamContext)

    useEffect(() => {
        setTeam({ name: `Team Name ${teamId}`, id: teamId, color: '#FF00FF' })
    }, [])

    return (
        <div>
            <div className="md:flex justify-between items-baseline gap-3">
                <h1 className="font-bold text-xl">Good Morning, Timur</h1>
                <h2 className="text-slate-500">1 Feb. - 15:03</h2>
            </div>
            team {teamId}
        </div>
    )
}

export default TeamSpace
