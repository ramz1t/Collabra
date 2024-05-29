import React from 'react'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import TeamStats from './TeamStats.jsx'
import { TeamImage } from '../../components/index.js'
import useScreenSize from '../../hooks/useScreenSize.js'
import cn from 'classnames'

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

const TeamCard = ({ team, isList }) => {
    const { t } = useTranslation()
    const { isTablet } = useScreenSize()
    return (
        <li
            className={
                isList &&
                'md:odd:bg-gray-100 md:odd:dark:bg-slate-800 md:hover:bg-gray-200 md:hover:dark:bg-slate-700 md:rounded-lg'
            }
        >
            <NavLink
                to={team.slug}
                className={cn(
                    isTablet && isList
                        ? 'w-full px-4 py-3'
                        : 'rounded-lg max-md:bg-gray-50 group-card hover:md:bg-gray-100 dark:hover:md:bg-slate-800 p-5',
                    'group-card h-fit overflow-hidden dark:border-gray-700 hover:!border-accent hover:dark:!border-accent-dark transition-all duration-75 flex items-center gap-7'
                )}
            >
                {isTablet && !isList && <TeamImage team={team} size="list" />}
                <div
                    className={
                        isTablet &&
                        isList &&
                        'grid md:grid-cols-[1fr_2fr] xl:grid-cols-[1fr_1fr] gap-10 w-full items-center'
                    }
                >
                    <p
                        className={cn(
                            isTablet && isList ? 'text-xl' : ' text-2xl',
                            'font-bold line-clamp-1'
                        )}
                    >
                        {team.title}
                    </p>
                    <TeamStats
                        team={{ ...team, members: membersMock }}
                        isList={isList}
                    />
                </div>
            </NavLink>
        </li>
    )
}

export default TeamCard
