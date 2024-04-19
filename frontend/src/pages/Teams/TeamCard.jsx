import React from 'react'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import TeamStats from './TeamStats.jsx'
import { TeamImage } from '../../components/index.js'
import useScreenSize from '../../hooks/useScreenSize.js'

const membersMock = [
    {
        avatar: 'http://localhost:5173/images/timur.jpg',
        generated_avatar: {
            first_color: 'a18cd1',
            second_color: 'fbc2eb',
        },
        first_name: 'Leonid',
        last_name: 'Prokopev',
    },
    {
        // avatar: 'http://localhost:5173/images/alex.jpg',
        generated_avatar: {
            first_color: 'ff9a9e',
            second_color: 'fecfef',
        },
        first_name: 'Alexey',
        last_name: 'Zavadsky',
    },
    {
        // avatar: 'http://localhost:5173/images/leonid.jpg',
        generated_avatar: {
            first_color: 'f6d365',
            second_color: 'fda085',
        },
        first_name: 'Timur',
        last_name: 'Ramazanov',
    },
]

const TeamCard = ({ team }) => {
    const { t } = useTranslation()
    const { isTablet } = useScreenSize()
    return (
        <li>
            <NavLink
                to={team.slug}
                className="rounded-lg max-md:bg-gray-50 group-card hover:md:bg-gray-100 h-fit overflow-hidden dark:border-gray-700 hover:!border-accent hover:dark:!border-accent-dark transition-all duration-75 flex items-center gap-7 p-5"
            >
                {isTablet && <TeamImage team={team} size="list" />}
                <div className="">
                    <p className="text-2xl font-bold line-clamp-1">
                        {team.title}
                    </p>
                    <TeamStats team={{ ...team, members: membersMock }} />
                </div>
            </NavLink>
        </li>
    )
}

export default TeamCard
