import React from 'react'
import { NavLink } from 'react-router-dom'

const TeamCard = ({ team }) => {
    return (
        <div>
            <p>Team Name {team.id}</p>
            <NavLink to={`${team.id}`}>Open Space</NavLink>
        </div>
    )
}

export default TeamCard
