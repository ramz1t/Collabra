import React from 'react'
import { NavLink } from 'react-router-dom'
import TeamCard from './TeamCard/'

const TeamsList = () => {
    return (
        <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array(10)
                .fill(0)
                .map((el, key) => (
                    <TeamCard key={key} />
                ))}
        </ul>
    )
}

export default TeamsList
