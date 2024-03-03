import React from 'react'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { IoArrowForward } from 'react-icons/io5'
import TeamStats from './TeamStats.jsx'

const TeamCard = ({ team }) => {
    const { t } = useTranslation()
    return (
        <li style={{ '--team-color': team.color }}>
            <NavLink
                to={team.slug}
                className="rounded-lg hover:shadow-sm hover:shadow-accent/30 h-fit overflow-hidden border dark:border-gray-700 hover:!border-accent hover:dark:!border-accent-dark transition-all duration-75 grid grid-cols-[100px_1fr] gap-3"
            >
                {team.image ? (
                    <div
                        className="bg-cover bg-center"
                        style={{ backgroundImage: `url(${team.image})` }}
                    ></div>
                ) : (
                    <p className="font-extrabold flex items-center justify-center text-3xl bg-[--team-color]">
                        {team.name[0]}
                    </p>
                )}
                <div className="p-3">
                    <p className="text-lg font-bold line-clamp-1">
                        {team.name}
                    </p>
                    <TeamStats team={team} />
                </div>
            </NavLink>
        </li>
    )
}

export default TeamCard
