import React from 'react'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { IoArrowForward } from 'react-icons/io5'
import TeamStats from './TeamStats.jsx'
import { TeamImage } from '../../components/index.js'

const TeamCard = ({ team }) => {
    const { t } = useTranslation()
    return (
        <li>
            <NavLink
                to={team.slug}
                className="rounded-lg hover:shadow-sm hover:shadow-accent/30 h-fit overflow-hidden border dark:border-gray-700 hover:!border-accent hover:dark:!border-accent-dark transition-all duration-75 flex items-center gap-5 p-7"
            >
                <TeamImage team={team} />
                <div className="p-3">
                    <p className="text-2xl font-bold line-clamp-1">
                        {team.title}
                    </p>
                    {/*<TeamStats team={team} />*/}
                </div>
            </NavLink>
        </li>
    )
}

export default TeamCard
